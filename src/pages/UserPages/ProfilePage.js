import React from "react";
import { useSelector } from "react-redux";

import ProfileChangePassword from "../../components/ProfileChangePassword/ProfileChangePassword";
import ProfileChangeAddress from "../../components/ProfileChangeAddress/ProfileChangeAddress";
import ProfileReviews from "../../components/ProfileReviews/ProfileReviews";

import classes from "./ProfilePage.module.css";

const ProfilePage = (props) => {
  const { email } = useSelector((state) => state.user);
  return (
    <section className={classes.profile_main}>
      <h1 className="title">-{email.split("@")[0]}'s- Profile</h1>
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
