import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={classes.main}>
      <h1 className="title">Login</h1>
      <div className={classes.form_container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
