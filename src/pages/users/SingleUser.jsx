import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputSecondary from '../../components/InputSecondary'
import SelectRole from '../../components/SelectRole'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import httpService from '../../services/http'
import { Flag } from '@mui/icons-material'
import { toast } from 'react-toastify'

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
    const [hasError, setHasError] = useState(false);
    const [user, setUser] = useState({
        id: null,
        fullName: '',
        email: '',
        image: null,
        url: null,
        isAdmin: false,
    })

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await httpService.getSingleUser(userID)
            console.log(data);
            setUser(data.data)

        }
        fetchUser()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.fullName || !user.email) {
            setHasError(true)
            toast.error('فیلد موردنظر را تکمیل کنید')
            return
        }
        setHasError(false)
        try {
            const { data } = await httpService.editUser(userID, user)
            console.log(data);
            toast.success(data.message);
            navigate('/app/users')
        } catch (error) {
            toast.error(error.response.data.messages[0].message);
        }
    }

    return (
        <Box>
            <Typography variant="h6" color="secondary">ویرایش کاربر</Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
                <InputSecondary
                    placeholder={'نام و نام خانوادگی'}
                    name="fullName"
                    value={user.fullName}
                    type='text'
                    multiline={false}
                    onChange={(e) =>
                        setUser(prevUser => ({
                            ...prevUser,
                            fullName: e.target.value
                        }))}
                    hasError={hasError}
                />
                <InputSecondary
                    placeholder={'ایمیل'}
                    name="email"
                    value={user.email}
                    type='text'
                    multiline={false}
                    onChange={(e) =>
                        setUser(prevUser => ({
                            ...prevUser,
                            email: e.target.value
                        }))}
                    hasError={hasError}
                />
                {/* <InputSecondary
                    placeholder={'گذرواژه'}
                    name="password"
                    value={password}
                    type='text'
                    multiline={false}
                    onChange={(e) => setPassword(e.target.value)}
                    hasError={hasError}
                />
                <InputSecondary
                    placeholder={'تکرار گذرواژه'}
                    name="confPassword"
                    value={confPassword}
                    type='text'
                    multiline={false}
                    onChange={(e) => setConfPassword(e.target.value)}
                    hasError={hasError}
                /> */}
                <SelectRole
                    name='isAdmin'
                    value={user.isAdmin}
                    onChange={(e) =>
                        setUser(prevUser => ({
                            ...prevUser,
                            isAdmin: e.target.value
                        }))}
                />
                <Button variant="contained" type="submit">ویرایش کاربر</Button>
            </Box>
        </Box>
    )
}

export default SingleUser