import React from "react";

import classes from "./ProfileFormsWrapper.module.css";

const ProfileFormsWrapper = ({ titleText, children }) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{titleText}</h1>
      {children}
    </div>
  );
};

export default ProfileFormsWrapper;
