import React from "react";
import classes from "./FormControl.module.css";

const FormControl = ({
  handleChange,
  handleBlur,
  type,
  formik,
  name,
  label,
  isRequired,
  min = 1,
  max = 100000,
  step = 1,
  autocomplete = "off",
}) => {
  const isError = formik.touched[name] && formik.errors[name];

  let input;
  if (type === "number") {
    input = (
      <input
        className={`${classes.input} ${isError ? classes.error_input : ""}`}
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values[name]}
        min={min}
        max={max}
        step={step}
      />
    );
  } else if (type === "textarea") {
    input = (
      <textarea
        className={`${classes.input} ${isError ? classes.error_input : ""}`}
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values[name]}
        rows={4}
      />
    );
  } else {
    input = (
      <input
        className={`${classes.input} ${isError ? classes.error_input : ""}`}
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values[name]}
        placeholder={label}
        autoComplete={autocomplete}
      />
    );
  }
  return (
    <div
      className={`${classes.form_control} ${
        type === "textarea" ? classes.textarea : ""
      }`}
    >
      <label
        htmlFor={name}
        className={`${classes.label} ${isError ? classes.error_label : ""}`}
      >
        {`${label}${isRequired ? "*" : ""}`}
      </label>
      {input}
      {isError ? (
        <p className={classes.error_message}>{formik.errors[name]}</p>
      ) : null}
    </div>
  );
};

export default FormControl;
