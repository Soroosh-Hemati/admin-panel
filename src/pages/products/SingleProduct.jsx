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
    const navigate = useNavigate();
    const [categories, setCategotries] = useState([]);
    const [product, setProduct] = useState({
        id: null,
        userId: null,
        catId: null,
        title: '',
        image: '',
        url: '',
        content: '',
        createdAt: '',
        updatedAt: '',
        categoryId: null,
        category: {
            name: ''
        }
    })
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data } = await httpService.getAllCategories();
            setCategotries(data.data)
        }
        const fetchSingleProduct = async () => {
            const { data } = await httpService.getSingleProduct(productID);
            if (data.data) {
                setProduct(data.data)
            }
        }
        fetchCategories();
        fetchSingleProduct()
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
        if (!product.title || !product.content || !product.image || !product.catId) {
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
        formData.append('catId', product.catId)
        formData.append('file', product.image);

        try {
            const { data } = await httpService.editProduct(productID, formData)
            setProduct({
                id: null,
                userId: null,
                catId: null,
                title: '',
                image: '',
                url: '',
                content: '',
                createdAt: '',
                updatedAt: '',
                categoryId: null,
                category: {
                    name: ''
                }
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
        setProduct(prevCategory => ({
            ...prevCategory,
            catId: categoryId
        }))
        console.log("Selected Category ID:", categoryId);
    }


    return (
        <Box
            component='form'
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
                onChange={(e) => setProduct(prevProduct => ({
                    ...prevProduct,
                    title: e.target.value
                }))}
                hasError={hasError}
                multiline={false} />
            <DropboxPrimary
                value={product.catId}
                categories={categories}
                onValueChange={handleCategoryChange} />
            <InputFile
                helperText='عکس محصول را وارد کنید'
                type='file'
                onChange={handleFilechange}
                hasError={hasError} />
            <img style={{
                width: '150px',
                height: '100px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid #ddd'
            }}
                src={`${product.url}`} />
            <InputSecondary
                placeholder='توضیحات'
                value={product.content}
                type='text'
                onChange={(e) => setProduct(prevProduct => ({
                    ...prevProduct,
                    content: e.target.value
                }))}
                hasError={hasError}
                multiline={false} />
            <Button variant='contained' type='submit'>ویرایش دسته بندی</Button>
        </Box>
    )
}

export default Product