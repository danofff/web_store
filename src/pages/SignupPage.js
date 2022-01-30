import React from "react";

import SignupForm from "../components/SingupForm/SignupForm";

import classes from "./SignupPage.module.css";

const SignupPage = (props) => {
  return (
    <div>
      <h1 className="title">Sign up</h1>
      <div className={classes.form_container}>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
