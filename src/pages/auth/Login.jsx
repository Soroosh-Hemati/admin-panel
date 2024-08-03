import React, { useEffect, useState } from 'react'
//MUI neccessary imports
import Input from '../../components/Input';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';

const initialValues = {
    email: "",
    pass: ""
}
const onSubmit = (values) => {
    console.log(values);
}
const validationSchema = Yup.object({
    email: Yup.string().email('فرمت ایمیل اشتباه می باشد').required('لطفا ایمیل خود را وارد کنید'),
    pass: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(8,"رمز عبور باید حداقل 8 کاراکتر باشد")
})

const LoginPage = () => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    })

    useEffect(()=>{
        async function getAllUsers(){
            const users = await axios.get('http://localhost:8008/api/users')
            console.log(users.data);
        }
        getAllUsers()

    },[])

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
                            name='pass'
                            value={formik.pass}
                            placeholder={formik.errors.pass && formik.touched.pass ? formik.errors.pass : 'رمز عبور'}
                            type='text'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            hasError={formik.errors.pass && formik.touched.pass}
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