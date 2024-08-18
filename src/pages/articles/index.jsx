import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import httpService from '../../services/http';
import ModalPrimary from '../../components/ModalPrimary';


function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [open, setOpen] = useState(false)

  const handleOpen = (article) => {
    setSelectedArticle(article)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setSelectedArticle(null)
  }
  const handleDeleteArticle = async () => {
    if (selectedArticle) {
      try {
        const res = await httpService.deleteArticle(selectedArticle.id);
        console.log('Category deleted:', res);
        handleClose();
        setArticles((setArticles) =>
          setArticles.filter(articles => articles.id !== selectedArticle.id)
        );
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    } else {
      console.error('No category selected for deletion');
    }
  }

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await httpService.getAllArticles();
      // console.log(data);
      setArticles(data.data)
    }
    fetchArticles();
  }, [])

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <><Box>
      <Typography variant="h6" color="secondary">لیست مقالات</Typography>
      <Toolbar>
        <Box flexGrow={1}></Box>
        <Button component={Link} to='addNewArticle' variant="contained">ایجاد مقاله جدید</Button>
      </Toolbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>عنوان مقاله</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>نویسنده</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تعداد بازدید</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تصویر</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>محتوا</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ ایجاد</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>تاریخ بروزرسانی</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              articles.map((article) => {
                return <TableRow key={article.id}>
                  <TableCell align="right">{article.title}</TableCell>
                  <TableCell align="right">{article.user.fullName}</TableCell>
                  <TableCell align="center">{String(article.numViews)}</TableCell>
                  <TableCell align="right">
                    {<img style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #ddd' }} src={`${article.url}`} />}
                  </TableCell>
                  <TableCell align="right">{truncateText(article.content, 5)}</TableCell>
                  <TableCell align="right">{new Date(article.createdAt).toLocaleDateString('fa')}</TableCell>
                  <TableCell align="right">{new Date(article.updatedAt).toLocaleDateString('fa')}</TableCell>
                  <TableCell align="center">{<Toolbar>
                    <Button component={Link} to={`/app/articles/${article.id}`} variant="contained" color="success" sx={{ marginLeft: '1rem' }}>ویرایش</Button>
                    <Button variant="contained" color="error" onClick={() => handleOpen(article)}>حذف</Button>
                  </Toolbar>}
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ModalPrimary open={open} onClose={handleClose} handleClose={handleClose} handleDelete={handleDeleteArticle} />
    </Box>
    </>
  )
}

export default ArticlesPage