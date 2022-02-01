import React from "react";
import { useSelector } from "react-redux";
import classes from "./Loader.module.css";

const Loader = (props) => {
  const isActive = useSelector((state) => state.ui.loaderIsActive);
  return (
    <div className={`${classes.path}`}>
      <span
        className={`${classes.running} ${isActive ? classes.active : ""}`}
      ></span>
    </div>
  );
};

export default Loader;
