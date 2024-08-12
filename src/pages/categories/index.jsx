import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function CategoriesPage() {

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
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>عملیات</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  </Box>



}

export default CategoriesPage