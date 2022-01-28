import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { registerUserAct } from "../../store/userState/userActions";
import FormControl from "../ui/FormControl/FormControl";

import classes from "./SignupForm.module.css";

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const signup = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      fullname: "",
      address: "",
      zip: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required field"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is requried field"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required field"),
      address: Yup.string(),
      zip: Yup.string().matches(
        /^\d{5}(-\d{4})?$/,
        "Zip code could contain only digits. Use XXXXX or XXXXX-XX pattern"
      ),
    }),
    onSubmit: (values) => {
      const { email, password, address, zip } = values;
      dispatch(registerUserAct(email, password, address, zip));
    },
  });

  return (
    <form onSubmit={signup.handleSubmit}>
      <FormControl
        name="email"
        label="Email"
        type="email"
        isRequired={true}
        value={signup.values.email}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <FormControl
        name="password"
        label="Password"
        type="password"
        isRequired={true}
        value={signup.values.password}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <FormControl
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
        isRequired={true}
        value={signup.values["passwordConfirmation"]}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <FormControl
        name="address"
        label="Address"
        type="address"
        value={signup.values.address}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <FormControl
        name="zip"
        label="ZIP"
        type="zip"
        value={signup.values.zip}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default SignupForm;