import React from "react";
import classes from "./FormControl.module.css";

const FormControl = ({ handleChange, handleBlur, type, formik, name }) => {
  return (
    <div className={classes.form_control}>
      <label htmlFor={name} className={classes.label}>
        {name}
      </label>
      <input
        className={classes.input}
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={formik.values[name]}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <p className={classes.error}>{formik.errors[name]}</p>
      ) : null}
    </div>
  );
};

export default FormControl;
