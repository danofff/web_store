import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { dataActions } from "../../store/dataState/dataSlice";
import ReviewItem from "../ReviewItem/ReviewItem";
import { getReviewsByUserIdAct } from "../../store/dataState/dataActions";

import classes from "./ProfileReviews.module.css";

const ProfileReviews = (props) => {
  const reviews = useSelector((state) => state.data.reviews);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataActions.setAllReviews([]));
    if (token) {
      dispatch(getReviewsByUserIdAct(token));
    }
  }, [token]);

  return (
    <section className={classes.main}>
      <h2>All reviews</h2>
      {reviews.map((review) => {
        return <ReviewItem review={review} key={`review${review.id}`} />;
      })}
    </section>
  );
};

export default ProfileReviews;
