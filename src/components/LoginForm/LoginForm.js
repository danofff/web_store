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
      email: Yup.string().email(),
      password: Yup.string().min(8),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const isSuccess = await dispatch(
      loginUserAct(login.values.email, login.values.password)
    );
    if (isSuccess) {
      navigate("/products");
    } else {
      login.setValues({ email: "", password: "" });
    }
  };
  return (
    <form onSubmit={onFormSubmit}>
      <FormControl
        name="email"
        label="Email"
        type="email"
        handleChange={login.handleChange}
        handleBlur={login.handleBlur}
        formik={login}
      />
      <FormControl
        name="password"
        label="Password"
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
