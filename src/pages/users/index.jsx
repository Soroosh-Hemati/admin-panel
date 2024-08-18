import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import httpService from "../../services/http";
import ModalPrimary from "../../components/ModalPrimary";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null)
  const [open, setOpen] = useState(false)

  const handleOpen = (user) => {
    setSelectedUser(user)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
  }
  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        const { data } = await httpService.deleteUser(selectedUser.id);
        toast.success(data.data[0].message);
        console.log('Category deleted:', data.data[0]);
        handleClose();
        setUsers((prevUsers) =>
          prevUsers.filter(user => user.id !== selectedUser.id)
        );
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    } else {
      console.error('No category selected for deletion');
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await httpService.getAllUsers();
      setUsers(data.data)
    }
    fetchUsers();
  }, [])


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
              <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              users.map((user) => {
                return <TableRow key={user.id}>
                  <TableCell align="right">{user.fullName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{`${user.isAdmin ? 'مدیر' : 'نویسنده'}`}</TableCell>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="center">{<Toolbar>
                    <Button component={Link} to={`/app/users/${user.id}`} variant="contained" color="success" sx={{ marginLeft: '1rem' }}>ویرایش</Button>
                    <Button variant="contained" color="error" onClick={() => handleOpen(user)}>حذف</Button>
                  </Toolbar>}
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ModalPrimary open={open} onClose={handleClose} handleClose={handleClose} handleDelete={handleDeleteUser} />
    </Box>
    </>
  )
}

export default UsersPage