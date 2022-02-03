import React from "react";
import classes from "./StyledInput.module.css";

const StyledInput = ({
  value,
  setValue,
  type,
  name,
  placeholder,
  min = 0,
  max = 1000,
  step = 1,
}) => {
  let inputContent;

  if (type === "text") {
    inputContent = (
      <input
        type={type}
        value={value}
        name={name}
        onChange={setValue}
        placeholder={placeholder}
        className={classes.input}
      />
    );
  } else if (type === "number") {
    inputContent = (
      <input
        type={type}
        value={value}
        name={name}
        onChange={setValue}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={classes.input}
      />
    );
  }
  return <React.Fragment>{inputContent}</React.Fragment>;
};

export default StyledInput;
