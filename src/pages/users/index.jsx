import { Box, Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function UsersPage() {
  return (
    <><Box>
      <Typography variant="h6" color="secondary">لیست کاربران</Typography>
      <Toolbar>
        <Box flexGrow={1}></Box>
        <Button component={Link} to='addNewUser' variant="contained">ایجاد کاربر جدید</Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>نام و نام خانوادگی</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>ایمیل</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>نقش</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ ایجاد</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>عملیات</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

    </Box>
    </>
  )
}

export default UsersPage