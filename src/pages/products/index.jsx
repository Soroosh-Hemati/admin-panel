import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import httpService from '../../services/http';
import ModalPrimary from '../../components/ModalPrimary';
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleOpen = (product) => {
    setSelectedProduct(product)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  const handleDeleteproduct = async () => {
    if (selectedProduct) {
      try {
        const res = await httpService.deleteProduct(selectedProduct.id);
        console.log('Category deleted:', res);
        handleClose();
        setProducts((prevProducts) =>
          prevProducts.filter(products => products.id !== selectedProduct.id)
        );
      } catch (error) {
        toast.error(error.response.data.messages[0].message);
        setOpen(false)
      }
    } else {
      toast.error('دسته بندی ای برای حذف انتخاب نشده است');
    }
  }


  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await httpService.getAllProducts();
      // console.log(data);
      setProducts(data.data)
    }
    fetchProducts();
  }, [])

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <><Box>
      <Typography variant="h6" color="secondary">لیست محصولات</Typography>
      <Toolbar>
        <Box flexGrow={1}></Box>
        <Button component={Link} to='/app/products/addNewProduct' variant="contained">ایجاد محصول جدید</Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>عنوان محصول</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>دسته بندی</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>نویسنده</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>توضیحات</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تصویر</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ ایجاد</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ بروزرسانی</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              products.map((product) => {
                return <TableRow key={product.id}>
                  <TableCell align="right">{product.title}</TableCell>
                  <TableCell align="right">{product.category.name}</TableCell>
                  <TableCell align="right">{product.user.fullName}</TableCell>
                  <TableCell align="right">{truncateText(product.content, 20)}</TableCell>
                  <TableCell align="right">{<img style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }} src={`${product.url}`} />}</TableCell>
                  <TableCell align="right">{new Date(product.createdAt).toLocaleDateString('fa')}</TableCell>
                  <TableCell align="right">{new Date(product.updatedAt).toLocaleDateString('fa')}</TableCell>
                  <TableCell align="center">{<Toolbar>
                    <Button component={Link} to={`/app/products/${product.id}`} variant="contained" color="success" sx={{ marginLeft: '1rem' }}>ویرایش</Button>
                    <Button variant="contained" color="error" onClick={() => handleOpen(product)}>حذف</Button>
                  </Toolbar>}
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ModalPrimary open={open} onClose={handleClose} handleClose={handleClose} handleDelete={handleDeleteproduct} />
    </Box>
    </>
  )
}

export default ProductsPage