import React from "react";
import { Link } from "react-router-dom";

import StarRating from "../ui/StarRating/StarRating";

import classes from "./ReviewItem.module.css";

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
        <div className={classes.date_user}>
          <p className={classes.username}>@{review.username}</p>
          <div className={classes.date}>{dateStr}</div>
        </div>
        {review.productTitle && (
          <div className={classes.prod_title}>
            <Link to={`/products/${review.productId}`}>
              {review.productTitle}
            </Link>
          </div>
        )}
        <div className={classes.starRating}>
          <StarRating rating={review.starRating} />
        </div>
        <p className={classes.text}>{review.reviewText}</p>
        <div className={classes.user}></div>
      </div>
    </div>
  );
};

export default ReviewItem;
