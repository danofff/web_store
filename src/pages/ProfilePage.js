import React from "react";
import ProfileChangePassword from "../components/ProfileChangePassword/ProfileChangePassword";

import classes from "./ProfilePage.module.css";

const ProfilePage = (props) => (
  <section className={classes.profile_main}>
    {/* /Profile change password/ */}
    <ProfileChangePassword />
    {/* Profile change user data */}

    {/* Profile user Reviews */}
  </section>
);

export default ProfilePage;
