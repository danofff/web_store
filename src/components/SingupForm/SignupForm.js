import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { registerUserAct } from "../../store/userState/userActions";
import FormControl from "../ui/FormControl/FormControl";

import classes from "./SignupForm.module.css";
import { registerUser } from "../../api/userApi";

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
      email: Yup.string().email(),
      password: Yup.string().min(
        8,
        "Password must be at least 8 characters long"
      ),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref("password")],
        "Passwords must match"
      ),
      address: Yup.string(),
      zip: Yup.string(/[0-9]/gi, "Zip code could only contain numbers").length(
        5,
        "Zip code must be 5 digits long"
      ),
    }),
  });

  const onFormSubmit = (event) => {
    event.preventDefault();
    const { email, password, address, zip } = signup.values;
    dispatch(registerUserAct(email, password, address, zip));
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormControl
        name="email"
        label="Email"
        type="email"
        value={signup.values.email}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <FormControl
        name="password"
        label="Password"
        type="password"
        value={signup.values.password}
        handleChange={signup.handleChange}
        handleBlur={signup.handleBlur}
        formik={signup}
      />
      <FormControl
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
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
      <button>Register</button>
    </form>
  );
};

export default SignupForm;
