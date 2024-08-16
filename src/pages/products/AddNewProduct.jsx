import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import { useEffect, useState } from "react"
import httpService from "../../services/http"
import DropboxPrimary from "../../components/DropboxPrimary"
import { toast } from "react-toastify"


function AddNewProduct() {
  const [productTitle, setProductTitle] = useState('')
  const [productImage, setProductImage] = useState(null)
  const [productDesc, setProductDesc] = useState('')
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
      setProductImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productTitle || !productDesc || !productImage || !selectedCategoryId) {
      setHasError(true)
      toast.error('فیلد موردنظر را تکمیل کنید')
      return
    }
    setHasError(false)
    //form data
    const formData = new FormData();
    formData.append('title', productTitle);
    formData.append('content', productDesc);
    formData.append('userId', '4')
    formData.append('catId', selectedCategoryId)
    formData.append('file', productImage);

    try {
      const { data } = await httpService.addNewProduct(formData)
      setProductTitle('')
      setProductImage(null)
      setProductDesc('')
      // console.log(data);
      toast.success(data.data[0].message);
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
      <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
        <InputSecondary placeholder='نام محصول' value={productTitle} type='text' onChange={(e) => setProductTitle(e.target.value)} hasError={hasError} multiline={false} />
        <DropboxPrimary categories={categories} onValueChange={handleCategoryChange} />
        <InputFile helperText='عکس محصول را وارد کنید' type='file' onChange={handleFilechange} hasError={hasError} />
        <InputSecondary placeholder='توضیحات' value={productDesc} type='text' onChange={(e) => setProductDesc(e.target.value)} hasError={hasError} multiline={false} />
        <Button variant='contained' type='submit'>ایجاد دسته بندی</Button>
      </Box>
    </Box>
  )
}

export default AddNewProduct