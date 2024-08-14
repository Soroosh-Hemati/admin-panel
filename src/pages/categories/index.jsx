import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import httpService from "../../services/http"


function CategoriesPage() {
  const [categories, setCategotries] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await httpService.getAllCategories();
      setCategotries(data.data)
    }
    fetchCategories();
  }, [])

  console.log(categories);

  return <Box>
    <Typography variant="h6" color="secondary">لیست دسته بندی ها</Typography>
    <Toolbar>
      <Box flexGrow={1}></Box>
      <Button component={Link} to='addNewCategory' variant="contained">ایجاد دسته بندی جدید</Button>
    </Toolbar>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
              <TableCell align="right">{category.description}</TableCell>
              <TableCell align="right">{<img style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }} src={`${category.url}`} />}</TableCell>
              <TableCell align="right">{new Date(category.createdAt).toLocaleDateString('fa')}</TableCell>
              <TableCell align="right">{new Date(category.updatedAt).toLocaleDateString('fa')}</TableCell>
              <TableCell align="center">{<Toolbar>
                <Button variant="contained" color="success" sx={{ marginLeft: '1rem' }}>ویرایش</Button>
                <Button variant="contained" color="error">حذف</Button>
              </Toolbar>}
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>



}

export default CategoriesPage