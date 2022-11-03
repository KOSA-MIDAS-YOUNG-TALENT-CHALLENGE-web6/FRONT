import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import CustomAxios from "../../lib/customAxios";

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

function SignUpComponents({ setAuth }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (e, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
      axios
        .post("http://52.79.125.202:8881/user", e)
        .then((res) => {
          if (res.status === 201) {
            Swal.fire(
              "회원가입에 성공하셨습니다.",
              "다시 로그인 해주시길 바랍니다.",
              "success"
            );
            navigate("/login", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err.request.status);
          if (err.request.status === 400) {
            Swal.fire(
              "비밀번호 안전하게 입력해주세요",
              "귀찮아하지 말고 안전하게 입력해주세요",
              "error"
            );
          } else if (err.request.status === 409) {
            Swal.fire(
              "이미 가입된 이메일이 있습니다.",
              "다른 이메일로 가입해주세요.",
              "error"
            );
          }
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit} method="post">
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              {...getFieldProps("email")}
              error={touched.email && errors.email ? true : false}
              helperText={touched.email && errors.email}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="name"
              label="Name"
              {...getFieldProps("name")}
              error={touched.name && errors.name ? true : false}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.password && errors.password ? true : false}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Signup"}
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

export default SignUpComponents;
