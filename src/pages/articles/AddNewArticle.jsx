import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import httpService from "../../services/http"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


function AddNewArticle() {
  const [article, setArticle] = useState({
    title: '',
    content: '',
    image: null
  })
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleFilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticle(prevArticle => ({
        ...prevArticle,
        image: file,
      }))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!article.title || !article.content || !article.image) {
      setHasError(true)
      toast.error('فیلد موردنظر را تکمیل کنید')
      return
    }
    setHasError(false)
    //form data
    const formData = new FormData();
    formData.append('userId', '4')
    formData.append('title', article.title);
    formData.append('content', article.content);
    formData.append('file', article.image);

    try {
      const { data } = await httpService.addNewArticle(formData)
      setArticle({
        title: '',
        content: '',
        image: null
      })
      // console.log(data);
      toast.success(data.data[0].message);
      navigate('/app/articles')
    } catch (error) {
      // console.error('Error:', error.response ? error.response.data : error.message);
      toast.error(error.response.data.messages[0].message);
    }
  }
  return (
    <Box>
      <Typography variant="h6" color="secondary">اضافه کردن مقاله</Typography>
      <Box component='form'
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
        <InputSecondary
          placeholder='نام مقاله'
          value={article.title} type='text'
          onChange={(e) =>
            setArticle(prevArticle => ({
              ...prevArticle,
              title: e.target.value
            }))}
          hasError={hasError}
          multiline={false}
          name=''
        />
        <InputFile
          helperText='عکس مقاله را وارد کنید'
          type='file'
          onChange={handleFilechange}
          hasError={hasError} />
        <InputSecondary
          placeholder='محتوای مقاله'
          value={article.content}
          type='text'
          onChange={(e) =>
            setArticle(prevArticle => ({
              ...prevArticle,
              content: e.target.value
            }))}
          hasError={hasError}
          multiline={true}
          name=''
        />
        <Button variant="contained" type="submit">ایجاد مقاله</Button>
      </Box>
    </Box>
  )
}

export default AddNewArticle