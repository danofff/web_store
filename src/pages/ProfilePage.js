import React from "react";

import ProfileChangePassword from "../components/ProfileChangePassword/ProfileChangePassword";
import ProfileChangeAddress from "../components/ProfileChangeAddress/ProfileChangeAddress";
import { useSelector } from "react-redux";

import classes from "./ProfilePage.module.css";
import ProfileReviews from "../components/ProfileReviews/ProfileReviews";

const ProfilePage = (props) => {
  const { email } = useSelector((state) => state.user);
  return (
    <section className={classes.profile_main}>
      <h1 className="title">-{email.split("@")[0]}'s- Pofile</h1>
      <div className={classes.edit_data}>
        {/* /Profile change password/ */}
        <ProfileChangePassword />
        {/* Profile change user data */}
        <ProfileChangeAddress />
      </div>
      {/* Profile user Reviews */}
      <ProfileReviews />
    </section>
  );
};

export default ProfilePage;
