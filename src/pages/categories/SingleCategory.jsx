import { Box, Button, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import httpService from "../../services/http"
import { toast } from "react-toastify"


function SingleCategory() {
    const [editedCategory, setEditedCategory] = useState(null)
    const { categoryID } = useParams()
    const [categoryTitle, setCategoryTitle] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)
    const [categoryDesc, setCategoryDesc] = useState('')
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchSingleCategory = async () => {
            const { data } = await httpService.getSingleCategory(categoryID)
            console.log(data.data);
            if (data.data) {
                setEditedCategory(data.data)
                setCategoryTitle(data.data.name)
                setCategoryImage(data.data.image)
                setCategoryDesc(data.data.description)
            }
        }
        fetchSingleCategory()
    }, [])

    const handleFilechange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategoryImage(file)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryTitle || !categoryDesc || !categoryImage) {
            setHasError(true)
            toast.error('فیلد موردنظر را تکمیل کنید')
            return
        }
        setHasError(false)
        //form data
        const formData = new FormData();
        formData.append('name', categoryTitle);
        formData.append('description', categoryDesc);
        formData.append('file', categoryImage);

        try {
            const { data } = await httpService.editCategory(categoryID, formData)
            console.log(data);
            toast.success(data.data[0].message);
        } catch (error) {
            toast.error(error.response.data.messages[0].message);
        }
    }

    return (
        <Box>
            <Typography variant="h6" color="secondary">ویرایش دسته بندی</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                <InputSecondary placeholder='نام دسته بندی' value={categoryTitle} type='text' onChange={(e) => setCategoryTitle(e.target.value)} hasError={hasError} />
                <InputFile helperText='عکس دسته بندی را وارد کنید' type='file' onChange={handleFilechange} hasError={hasError} />
                <InputSecondary placeholder='توضیحات' value={categoryDesc} type='text' onChange={(e) => setCategoryDesc(e.target.value)} hasError={hasError} />
                <Button variant='contained' type='submit'>ویرایش دسته بندی</Button>
            </Box>
        </Box>
    )
}

export default SingleCategory