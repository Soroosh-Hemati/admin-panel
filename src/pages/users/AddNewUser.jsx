import { Box, Button, Typography } from "@mui/material"
import InputSecondary from "../../components/InputSecondary"
import { useFormik } from "formik"
import * as Yup from 'yup'
import SelectRole from "../../components/SelectRole"
import httpService from "../../services/http"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confPassword: '',
  isAdmin: 0,
}

const validationSchema = Yup.object({
  fullName: Yup.string().required('نام و نام خانوادگی را وارد کنید'),
  email: Yup.string().email('فرمت ایمیل اشتباه می باشد').required('لطفا ایمیل خود را وارد کنید'),
  password: Yup.string().required('لطفا رمز عبور خود را وارد کنید').min(6, "رمز عبور باید حداقل 8 کاراکتر باشد").matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
    "رمز عبور باید حداقل شامل یک حرف بزرگ، یک عدد و یک کاراکتر خاص باشد"
  ),
  confPassword: Yup.string().oneOf([Yup.ref('password'), null], "گذر واژه و تکرار گذرواژه باید یکی باشد")
})

function AddNewUser() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      console.log(values);
      try {
        const res = await httpService.addNewUser(values);
        console.log(res);
        toast.success(res.data.data.message);
        navigate('/app/users')
      } catch (error) {
        toast.error(error.response.data.messages[0].message);
      }
    },
    validationSchema
  })


  return (
    <Box>
      <Typography variant="h6" color="secondary">ایجاد کاربر</Typography>
      <Box component='form' onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: "center" }}>
        <InputSecondary
          placeholder={formik.errors.fullName && formik.touched.fullName ? formik.errors.fullName : 'نام و نام خانوادگی'}
          name="fullName"
          value={formik.values.fullName}
          type='text'
          multiline={false}
          onChange={formik.handleChange}
          hasError={formik.errors.fullName && formik.touched.fullName}
        />
        <InputSecondary
          placeholder={formik.errors.email && formik.touched.email ? formik.errors.email : 'ایمیل'}
          name="email"
          value={formik.values.email}
          type='text'
          multiline={false}
          onChange={formik.handleChange}
          hasError={formik.errors.email && formik.touched.email}
        />
        <InputSecondary
          placeholder={formik.errors.password && formik.touched.password ? formik.errors.password : 'گذرواژه'}
          name="password"
          value={formik.values.password}
          type='text'
          multiline={false}
          onChange={formik.handleChange}
          hasError={formik.errors.password && formik.touched.password}
        />
        <InputSecondary
          placeholder={formik.errors.confPassword && formik.touched.confPassword ? formik.errors.confPassword : 'تکرار گذرواژه'}
          name="confPassword"
          value={formik.values.confPassword}
          type='text'
          multiline={false}
          onChange={formik.handleChange}
          hasError={formik.errors.confPassword && formik.touched.confPassword}
        />
        <SelectRole
          name='isAdmin'
          value={formik.values.isAdmin}
          onChange={formik.handleChange}
        />
        <Button variant="contained" type="submit">ایجاد کاربر</Button>
      </Box>
    </Box>
  )
}

export default AddNewUser