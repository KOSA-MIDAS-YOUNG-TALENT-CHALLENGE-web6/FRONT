import React, { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { motion } from "framer-motion";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { Navigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import Swal from 'sweetalert2'

//애니메이션 설정
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

function LoginComponents({ setAuth }) {
  //라우트
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //비밀번호 보이기
  const [showPassword, setShowPassword] = useState(false);

  //폼 스키마
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("이메일을 입력해 주세요")
      .required("이메일이 필요합니다."),
    password: Yup.string().required("비밀번호가 필요합니다."),
  });

  //폼 정보
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateonSchema: LoginSchema,
    onSubmit: (e, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false)
      }, 1000);
        axios.post('http://52.79.125.202:8881/user/login', e)
          .then((res) => {
            console.log(res)
            if(res.status == 200) {
              Swal.fire(
                '로그인 되었습니다.',
                '',
                'success'
              )
              localStorage.setItem('token', res.data.access_token)
              navigate("/home", { replace: true });
            }
          })
          .catch((err) => {
            console.log(err.request.status)
            if(err.request.status == 404) {
              Swal.fire(
                '존재하지 않은 이메일입니다.',
                '다시 한번 이메일을 확인해주세요.',
                'error'
              )
            } else if (err.request.status == 409){
              Swal.fire(
                '비밀번호가 틀렸습니다.',
                '다시 한번 비밀번호를 확인해주세요.',
                'error'
              )
            }
          })
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} method="post">
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email Adress"
              {...getFieldProps("email")}
              errer={touched.email && errors.email ? 1 : 0}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              errer={touched.password && errors.password ? 1 : 0}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {isSubmitting ? "loading..." : "Login"}
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default LoginComponents;
