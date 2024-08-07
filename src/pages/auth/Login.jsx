import React, { useEffect } from 'react'
//MUI neccessary imports
import Input from '../../components/Input';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Cookies from 'js-cookie';


import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import httpService from '../../services/http';
import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify';

const initialValues = {
    email: "",
    password: ""
}

const validationSchema = Yup.object({
    email: Yup.string().email('فرمت ایمیل اشتباه می باشد').required('لطفا ایمیل خود را وارد کنید'),
    password: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
})

const LoginPage = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        onSubmit: async values => {
            try {
                const response = await httpService.login(values)
                const { data } = response.data
                const responseStatus = response.status
                console.log(response);
                if (data && responseStatus == 200) {
                    console.log(data);
                    const userToken = data?.accessToken
                    Cookies.set('token', userToken)
                    console.log(data);
                    navigate('home')
                    toast.success(data.message)
                }
            } catch (error) {
                toast.error('ایمیل یا رمز عبور اشتباه می باشد')
            }
        },
        validationSchema,
    })

    return (
        <Container maxWidth={false} sx={{ backgroundColor: '#F1F1F1', width: '100%' }}>
            <Box height={'100vh'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Paper sx={{ width: '400px', height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} elevation={3}>
                    <img src='/assets/logo/IranSigLOGO.svg' width={'100px'} height={'100px'} alt="Logo" />
                    <Typography
                        sx={{ marginTop: '2rem' }}
                        textAlign={'center'}>برای ورود ایمیل و رمز عبور خود را وارد نمایید:
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '1rem'
                    }}>
                        <Input
                            name='email'
                            value={formik.email}
                            placeholder={formik.errors.email && formik.touched.email ? formik.errors.email : 'ایمیل'}
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            hasError={formik.errors.email && formik.touched.email}
                        >
                        </Input>
                        <Input
                            name='password'
                            value={formik.password}
                            placeholder={formik.errors.password && formik.touched.password ? formik.errors.password : 'رمز عبور'}
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            hasError={formik.errors.password && formik.touched.pass}
                        >
                        </Input>
                        <Button variant='contained' type='submit'>ورود</Button>
                    </Box>
                </Paper>
            </Box>
        </Container>

    )
}

export default LoginPage