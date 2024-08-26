import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import httpService from "../../services/http"
import ModalPrimary from "../../components/ModalPrimary";
import { toast } from "react-toastify";


function CategoriesPage() {
  const [categories, setCategotries] = useState([]);
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleOpen = (category) => {
    setSelectedCategory(category)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedCategory(null)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await httpService.getAllCategories();
      setCategotries(data.data)
    }
    fetchCategories();
  }, [])

  const handleDeleteCategory = async () => {
    if (selectedCategory) {
      try {
        const { data } = await httpService.deleteCategory(selectedCategory.id);
        console.log('Category deleted:', data);
        handleClose();
        setCategotries((prevCategories) =>
          prevCategories.filter(category => category.id !== selectedCategory.id)
        );
      } catch (error) {
        toast.error(error.response.data.messages[0].message);
        setOpen(false)
      }
    } else {
      toast.error('دسته بندی ای برای حذف انتخاب نشده است');
    }
  }
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };


  return <Box>
    <Typography variant="h6" color="secondary">لیست دسته بندی ها</Typography>
    <Toolbar>
      <Box flexGrow={1}></Box>
      <Button component={Link} to='addNewCategory' variant="contained">ایجاد دسته بندی جدید</Button>
    </Toolbar>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '650px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>نام</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>توضیحات</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>تصویر</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ ایجاد</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ بروزرسانی</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return <TableRow key={category.id}>
              <TableCell align="right">{category.name}</TableCell>
              <TableCell align="right">{truncateText(category.description, 20)}</TableCell>
              <TableCell align="right">{<img style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }} src={`${category.url}`} />}</TableCell>
              <TableCell align="right">{new Date(category.createdAt).toLocaleDateString('fa')}</TableCell>
              <TableCell align="right">{new Date(category.updatedAt).toLocaleDateString('fa')}</TableCell>
              <TableCell align="center">{<Toolbar>
                <Button component={Link} to={`/app/categories/${category.id}`} variant="contained" color="success" sx={{ marginLeft: '1rem' }}>ویرایش</Button>
                <Button variant="contained" color="error" onClick={() => handleOpen(category)}>حذف</Button>
              </Toolbar>}
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalPrimary open={open} onClose={handleClose} handleClose={handleClose} handleDelete={handleDeleteCategory} />
  </Box>



}

export default CategoriesPage