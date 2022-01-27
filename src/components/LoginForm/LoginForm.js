import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormControl from "../ui/FormControl/FormControl";
import { loginUserAct } from "../../store/userState/userActions";

import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(),
      password: Yup.string().min(8),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    // login.onSubmit();
    console.log(login.values);
    dispatch(loginUserAct(login.values.email, login.values.password));
  };
  return (
    <form onSubmit={onFormSubmit}>
      <FormControl
        name="email"
        type="email"
        handleChange={login.handleChange}
        handleBlur={login.handleBlur}
        formik={login}
      />
      <FormControl
        name="password"
        type="password"
        handleChange={login.handleChange}
        handleBlur={login.handleBlur}
        formik={login}
      />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
