import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormControl from "../ui/FormControl/FormControl";
import { loginUserAct } from "../../store/userState/userActions";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email must be a valid email")
        .required("Emails field is required"),
      password: Yup.string()
        .min(8, "Password must me at least 8 characters")
        .required("Password field is required"),
    }),
    onSubmit: async (values) => {
      const isSuccess = await dispatch(
        loginUserAct(login.values.email, login.values.password)
      );
      if (isSuccess) {
        navigate("/products");
      } else {
        login.setValues({ email: "", password: "" });
      }
    },
  });

  return (
    <form onSubmit={login.handleSubmit}>
      <FormControl
        name="email"
        label="Email"
        type="email"
        isRequired={true}
        handleChange={login.handleChange}
        handleBlur={login.handleBlur}
        formik={login}
      />
      <FormControl
        name="password"
        label="Password"
        type="password"
        isRequired={true}
        handleChange={login.handleChange}
        handleBlur={login.handleBlur}
        formik={login}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
