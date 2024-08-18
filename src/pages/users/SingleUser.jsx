import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputSecondary from '../../components/InputSecondary'
import SelectRole from '../../components/SelectRole'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import httpService from '../../services/http'
import { Flag } from '@mui/icons-material'

const validationSchema = Yup.object({
    fullName: Yup.string().required('نام و نام خانوادگی را وارد کنید'),
    email: Yup.string().email('فرمت ایمیل اشتباه می باشد').required('لطفا ایمیل خود را وارد کنید'),
    password: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(6, "رمز عبور باید حداقل 8 کاراکتر باشد").matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
        "رمز عبور باید حداقل شامل یک حرف بزرگ، یک عدد و یک کاراکتر خاص باشد"
    ),
    confPassword: Yup.string().oneOf([Yup.ref('password'), null], "گذر واژه و تکرار گذرواژه باید یکی باشد")
})

function SingleUser() {
    const navigate = useNavigate()
    const { userID } = useParams();
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(0)

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await httpService.getSingleUser(userID)
            console.log(data);
            setFullName(data.data.fullName)
            setEmail(data.data.email)
            // setPassword(data.data.password)
            // setConfPassword(data.data.confPassword)
            setIsAdmin(data.data.isAdmin)
        }
        fetchUser()
    }, [])

    const handleSubmit = () => {

    }

    return (
        <Box>
            <Typography variant="h6" color="secondary">ویرایش کاربر</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                <InputSecondary
                    placeholder={'نام و نام خانوادگی'}
                    name="fullName"
                    value={fullName}
                    type='text'
                    multiline={false}
                    onChange={(e) => setFullName(e.target.value)}
                    hasError={false}
                />
                <InputSecondary
                    placeholder={'ایمیل'}
                    name="email"
                    value={email}
                    type='text'
                    multiline={false}
                    onChange={(e) => setEmail(e.target.value)}
                    hasError={false}
                />
                {/* <InputSecondary
                    placeholder={'گذرواژه'}
                    name="password"
                    value={password}
                    type='text'
                    multiline={false}
                    onChange={(e) => setPassword(e.target.value)}
                    hasError={false}
                />
                <InputSecondary
                    placeholder={'تکرار گذرواژه'}
                    name="confPassword"
                    value={confPassword}
                    type='text'
                    multiline={false}
                    onChange={(e) => setConfPassword(e.target.value)}
                    hasError={false}
                /> */}
                <SelectRole
                    name='isAdmin'
                    value={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.value)}
                />
                <Button variant="contained" type="submit">ویرایش کاربر</Button>
            </Box>
        </Box>
    )
}

export default SingleUser