import React from "react";
import classes from "./Button.module.css";

const Button = ({ type, style, text, onClickHandler, width }) => {
  onClickHandler = onClickHandler || function (event) {};
  return (
    <button
      type={type}
      onClick={onClickHandler}
      className={`${classes.button} ${classes[style]}`}
      style={width ? { width: width } : {}}
    >
      {text}
    </button>
  );
};

export default Button;
