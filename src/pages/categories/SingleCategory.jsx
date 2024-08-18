import { Box, Button, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import httpService from "../../services/http"
import { toast } from "react-toastify"


function SingleCategory() {
    const { categoryID } = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState({
        id: null,
        name: '',
        description: '',
        image: null,
        url: '',
        createdAt: '',
        updatedAt: ''
    })
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchSingleCategory = async () => {
            const { data } = await httpService.getSingleCategory(categoryID)
            console.log(data.data);
            if (data.data) {
                setCategory(data.data)
            }
        }
        fetchSingleCategory()
    }, [])

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
        if (!category.name || !category.description || !category.image) {
            setHasError(true)
            toast.error('فیلد موردنظر را تکمیل کنید')
            return
        }
        setHasError(false)
        //form data
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        formData.append('file', category.image);

        try {
            const { data } = await httpService.editCategory(categoryID, formData)
            console.log(data);
            toast.success(data.data[0].message);
            navigate('/app/categories')
        } catch (error) {
            toast.error(error.response.data.messages[0].message);
        }
    }

    return (
        <Box>
            <Typography variant="h6" color="secondary">ویرایش دسته بندی</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                <InputSecondary
                    placeholder='نام دسته بندی'
                    value={category.name}
                    type='text'
                    onChange={(e) => setCategory(prevCategory => ({
                        ...prevCategory,
                        name: e.target.value
                    }))}
                    hasError={hasError}
                    multiline={false} />
                <InputFile
                    helperText='عکس دسته بندی را وارد کنید'
                    type='file'
                    onChange={handleFilechange}
                    hasError={hasError} />
                <InputSecondary
                    placeholder='توضیحات'
                    value={category.description}
                    type='text'
                    onChange={(e) => setCategory(prevCategory => ({
                        ...prevCategory,
                        description: e.target.value
                    }))}
                    hasError={hasError}
                    multiline={false} />
                <Button variant='contained' type='submit'>ویرایش دسته بندی</Button>
            </Box>
        </Box>
    )
}

export default SingleCategory