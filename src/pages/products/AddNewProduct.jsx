import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import { useEffect, useState } from "react"
import httpService from "../../services/http"
import DropboxPrimary from "../../components/DropboxPrimary"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


function AddNewProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    content: '',
    image: null
  })
  const [categories, setCategotries] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await httpService.getAllCategories();
      // console.log(data);
      setCategotries(data.data)
    }
    fetchCategories();
  }, [])

  const handleFilechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prevProduct => ({
        ...prevProduct,
        image: file,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title || !product.content || !product.image || !selectedCategoryId) {
      setHasError(true)
      toast.error('فیلد موردنظر را تکمیل کنید')
      return
    }
    setHasError(false)
    //form data
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('content', product.content);
    formData.append('userId', '4')
    formData.append('catId', selectedCategoryId)
    formData.append('file', product.image);

    try {
      const { data } = await httpService.addNewProduct(formData)
      setProduct({
        title: '',
        content: '',
        image: null
      })
      // console.log(data);
      toast.success(data.data[0].message);
      navigate('/app/products')
    } catch (error) {
      // console.error('Error:', error.response ? error.response.data : error.message);
      toast.error(error.response.data.messages[0].message);
    }
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId)
    console.log("Selected Category ID:", categoryId);
  }

  return (
    <Box>
      <Typography variant="h6" color="secondary">اضافه کردن محصول</Typography>
      <Box component='form'
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: "center"
        }}>
        <InputSecondary
          placeholder='نام محصول'
          value={product.title}
          type='text'
          onChange={(e) =>
            setProduct(prevProduct => ({
              ...prevProduct,
              title: e.target.value
            }))}
          hasError={hasError}
          multiline={false}
          name='' />
        <DropboxPrimary
          categories={categories}
          onValueChange={handleCategoryChange} />
        <InputFile
          helperText='عکس محصول را وارد کنید'
          type='file'
          onChange={handleFilechange}
          hasError={hasError} />
        <InputSecondary
          placeholder='توضیحات'
          value={product.content}
          type='text'
          onChange={(e) =>
            setProduct(prevProduct => ({
              ...prevProduct,
              content: e.target.value
            }))}
          hasError={hasError}
          multiline={false}
          name='' />
        <Button variant='contained' type='submit'>ایجاد دسته بندی</Button>
      </Box>
    </Box>
  )
}

export default AddNewProduct