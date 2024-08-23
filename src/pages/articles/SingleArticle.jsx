import { Box, Button, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import InputFile from "../../components/InputFile"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import httpService from "../../services/http"


function SingleArticle() {
    const navigate = useNavigate()
    const [hasError, setHasError] = useState(false);
    const { articleID } = useParams()
    const [article, setArticle] = useState({
        id: null,
        userId: null,
        title: '',
        image: '',
        url: '',
        content: '',
        numViews: null,
        createdAt: '',
        updatedAt: '',
    })

    useEffect(() => {
        const fetchSingleArticle = async () => {
            const { data } = await httpService.getSingleArticle(articleID)
            console.log(data.data);
            if (data.data) {
                setArticle(data.data)
            }
        }
        fetchSingleArticle()
    }, [])

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
                    placeholder='نام دسته بندی'
                    value={article.title}
                    type='text'
                    onChange={(e) =>
                        setArticle(prevArticle => ({
                            ...prevArticle,
                            title: e.target.value
                        }))}
                    hasError={hasError}
                    multiline={false} />
                <InputFile
                    helperText='عکس دسته بندی را وارد کنید'
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
                    src={`${article.url}`} />
                <InputSecondary
                    placeholder='توضیحات'
                    value={article.content}
                    type='text'
                    onChange={(e) =>
                        setArticle(prevArticle => ({
                            ...prevArticle,
                            content: e.target.value
                        }))}
                    hasError={hasError}
                    multiline={false} />
                <Button variant='contained' type='submit'>ویرایش مقاله</Button>
            </Box>
        </Box>
    )
}

export default SingleArticle