import React from "react";
import classes from "./StyledSelect.module.css";

const StyledSelect = ({ options = [], label, name, value, onChange }) => {
  return (
    <div className={classes.select_control}>
      <label className={classes.label} htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        className={classes.select}
        value={value}
        onChange={onChange}
      >
        {options.map((option, idx) => {
          if (idx === 0) {
            return (
              <option value={option.value} key={option.value}>
                {option.name}
              </option>
            );
          }
          return (
            <option value={option.value} key={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default StyledSelect;
