import React from "react";
import classes from "./StyledInput.module.css";

const StyledInput = ({ value, setValue, type, name, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={setValue}
      placeholder={placeholder}
      className={classes.input}
    />
  );
};

export default StyledInput;
