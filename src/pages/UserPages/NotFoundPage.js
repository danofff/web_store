import React from "react";
import classes from "./NotFoundPage.module.css";

const NotFoundPage = (props) => {
  return (
    <div className={classes.not_exist}>
      <h1>404</h1>
      <p>Sorry but page does not exist</p>
    </div>
  );
};

export default NotFoundPage;
