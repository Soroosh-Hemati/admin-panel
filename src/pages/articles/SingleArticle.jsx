import { Box, Button, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import httpService from "../../services/http"


function SingleArticle() {
    const [articleTitle, setArticleTitle] = useState('')
    const [articleContent, setArticleContent] = useState('')
    const [articleImage, setArticleImage] = useState(null)
    const [hasError, setHasError] = useState(false);
    const { articleID } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSingleArticle = async () => {
            const { data } = await httpService.getSingleArticle(articleID)
            console.log(data.data);
            if (data.data) {
                setArticleTitle(data.data.title)
                setArticleImage(data.data.image)
                setArticleContent(data.data.content)
            }
        }
        fetchSingleArticle()
    }, [])

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
            const { data } = await httpService.editArticle(articleID, formData)
            console.log(data);
            toast.success(data.data[0].message);
            navigate('/app/articles')
        } catch (error) {
            toast.error(error.response.data.messages[0].message);
        }
    }


    return (
        <Box>
            <Typography variant="h6" color="secondary">ویرایش دسته بندی</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                <InputSecondary placeholder='نام دسته بندی' value={articleTitle} type='text' onChange={(e) => setArticleTitle(e.target.value)} hasError={hasError} multiline={false} />
                <InputFile helperText='عکس دسته بندی را وارد کنید' type='file' onChange={handleFilechange} hasError={hasError} />
                <InputSecondary placeholder='توضیحات' value={articleContent} type='text' onChange={(e) => setArticleContent(e.target.value)} hasError={hasError} multiline={false} />
                <Button variant='contained' type='submit'>ویرایش مقاله</Button>
            </Box>
        </Box>
    )
}

export default SingleArticle