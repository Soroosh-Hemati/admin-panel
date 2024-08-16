import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import httpService from "../../services/http"
import { toast } from "react-toastify"


function AddNewArticle() {
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [articleImage, setArticleImage] = useState(null)
  const [hasError, setHasError] = useState(false);

  const handleFilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArticleImage(file)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleTitle || !articleContent || !articleImage) {
      setHasError(true)
      toast.error('فیلد موردنظر را تکمیل کنید')
      return
    }
    setHasError(false)
    //form data
    const formData = new FormData();
    formData.append('userId', '4')
    formData.append('title', articleTitle);
    formData.append('content', articleContent);
    formData.append('file', articleImage);

    try {
      const { data } = await httpService.addNewArticle(formData)
      setArticleTitle('')
      setArticleImage(null)
      setArticleContent('')
      // console.log(data);
      toast.success(data.data[0].message);
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
          value={articleTitle} type='text'
          onChange={(e) => setArticleTitle(e.target.value)}
          hasError={hasError}
          multiline={false} />
        <InputFile
          helperText='عکس مقاله را وارد کنید'
          type='file'
          onChange={handleFilechange}
          hasError={hasError} />
        <InputSecondary
          placeholder='محتوای مقاله'
          value={articleContent}
          type='text'
          onChange={(e) => setArticleContent(e.target.value)}
          hasError={hasError}
          multiline={true} />
        <Button variant="contained" type="submit">ایجاد مقاله</Button>
      </Box>
    </Box>
  )
}

export default AddNewArticle