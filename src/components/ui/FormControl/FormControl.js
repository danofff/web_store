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
}) => {
  const isError = formik.touched[name] && formik.errors[name];
  const isValid = formik.touched[name] && !formik.errors[name];
  return (
    <div className={classes.form_control}>
      <label
        htmlFor={name}
        className={`${classes.label} ${isError ? classes.error_label : ""}`}
      >
        {`${label}${isRequired ? "*" : ""}`}
      </label>
      <input
        className={`${classes.input} ${isError ? classes.error_input : ""} ${
          isValid ? classes.success_input : ""
        }`}
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values[name]}
        placeholder=" "
      />
      {isError ? (
        <p className={classes.error_message}>{formik.errors[name]}</p>
      ) : null}
    </div>
  );
};

export default FormControl;
