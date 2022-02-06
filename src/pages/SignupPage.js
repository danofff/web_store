import React from "react";

import SignupForm from "../components/SignupForm/SignupForm";

import classes from "./SignupPage.module.css";

const SignupPage = (props) => {
  return (
    <div className={classes.main}>
      <h1 className="title">Sign up</h1>
      <div className={classes.form_container}>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
