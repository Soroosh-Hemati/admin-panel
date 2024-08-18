import { Box, Button, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import { useEffect, useState } from "react"
import InputFile from "../../components/InputFile"
import { toast } from "react-toastify"
import httpService from "../../services/http"
import { useNavigate } from "react-router-dom"

function AddNewCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    title: '',
    desc: '',
    file: null
  })
  const [hasError, setHasError] = useState(false);

  const handleFilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory(prevCategory => ({
        ...prevCategory,
        file
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.title || !category.desc || !category.file) {
      setHasError(true)
      toast.error('فیلد موردنظر را تکمیل کنید')
      return
    }
    setHasError(false)
    //form data
    const formData = new FormData();
    formData.append('name', category.title);
    formData.append('description', category.desc);
    formData.append('file', category.file);

    try {
      const { data } = await httpService.addNewCategory(formData)
      setCategory({
        title: '',
        desc: '',
        file: null
      })
      // console.log(data);
      toast.success(data.data[0].message);
      navigate('/app/categories')
    } catch (error) {
      // console.error('Error:', error.response ? error.response.data : error.message);
      toast.error(error.response.data.messages[0].message);
    }
  }


  return <Box>
    <Typography variant="h6" color="secondary">ایجاد دسته بندی</Typography>
    <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
      <InputSecondary
        placeholder='نام دسته بندی'
        value={category.title} type='text'
        onChange={(e) => setCategory(prevCategory => ({
          ...prevCategory,
          title: e.target.value
        }))}
        hasError={hasError}
        multiline={false}
        name='' />
      <InputFile
        helperText='عکس دسته بندی را وارد کنید'
        type='file'
        onChange={handleFilechange}
        hasError={hasError} />
      <InputSecondary
        placeholder='توضیحات'
        value={category.desc}
        type='text'
        onChange={(e) => setCategory(prevCategory => ({
          ...prevCategory,
          desc: e.target.value
        }))}
        hasError={hasError}
        multiline={false}
        name='' />
      <Button variant='contained' type='submit'>ایجاد دسته بندی</Button>
    </Box>
  </Box>
}

export default AddNewCategory