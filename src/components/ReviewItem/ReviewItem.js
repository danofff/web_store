import React from "react";
import StarRating from "../ui/StarRating/StarRating";
import classes from "./ReviewItem.module.css";
import { useSelector } from "react-redux";

const ReviewItem = ({ review }) => {
  const date = new Date(review.updated_at);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.date}>{dateStr}</div>
        <div className={classes.starRating}>
          <StarRating rating={review.starRating} />
        </div>
        <p className={classes.text}>{review.reviewText}</p>
        <p className={classes.username}>@{review.username}</p>
        <div className={classes.user} ></div>
      </div>
    </div>
  );
};

export default ReviewItem;
