import React from "react";
import StarRating from "../ui/StarRating/StarRating";
import classes from "./ReviewItem.module.css";

const ReviewItem = ({ review }) => {
  return (
    <div>
      <div className={classes.date}>{review.updated_at}</div>
      <div className={classes.starRating}>
        <StarRating rating={review.starRating} />
      </div>
      <p className={classes.text}>{review.reviewText}</p>
      <p>{review.username}</p>
    </div>
  );
};

export default ReviewItem;
