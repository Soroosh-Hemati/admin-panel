import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InputSecondary from '../../components/InputSecondary';
import DropboxPrimary from '../../components/DropboxPrimary';
import InputFile from '../../components/InputFile';
import { useEffect, useState } from 'react';
import httpService from '../../services/http';
import { toast } from 'react-toastify';

const Product = () => {
    const { productID } = useParams();
    const [productTitle, setProductTitle] = useState('')
    const [productImage, setProductImage] = useState(null)
    const [productDesc, setProductDesc] = useState('')
    const [categories, setCategotries] = useState([]);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = useState(0)

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await httpService.getAllCategories();
            setCategotries(data.data)
        }
        const fetchSingleProduct = async () => {
            const { data } = await httpService.getSingleProduct(productID);
            if (data.data) {
                setProductTitle(data.data.title)
                // setSelectedCategoryId(data.data.catId)
                setProductDesc(data.data.description)
                setProductImage(data.data.image)
            }
        }
        fetchCategories();
        fetchSingleProduct()
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
            const { data } = await httpService.editProduct(productID, formData)
            setProductTitle('')
            setProductImage(null)
            setProductDesc('')
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
        <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
            <InputSecondary placeholder='نام محصول' value={productTitle} type='text' onChange={(e) => setProductTitle(e.target.value)} hasError={hasError} multiline={false} />
            <DropboxPrimary categories={categories} onValueChange={handleCategoryChange} />
            <InputFile helperText='عکس محصول را وارد کنید' type='file' onChange={handleFilechange} hasError={hasError} />
            <InputSecondary placeholder='توضیحات' value={productDesc} type='text' onChange={(e) => setProductDesc(e.target.value)} hasError={hasError} multiline={false} />
            <Button variant='contained' type='submit'>ویرایش دسته بندی</Button>
        </Box>
    )
}

export default Product