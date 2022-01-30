import React from "react";
import classes from "./Button.module.css";

const Button = ({ type, style, text, onClickHandler }) => {
  onClickHandler = onClickHandler || function (event) {};
  return (
    <button
      type={type}
      onClick={onClickHandler}
      className={`${classes.button} ${classes[style]}`}
    >
      {text}
    </button>
  );
};

export default Button;
