import classes from "./ProductReview.module.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ReviewItem from "../ReviewItem/ReviewItem";

const ReviewPage = () => {
  const reviews = useSelector((state) => state.data.reviews);

  console.log(reviews);

  return (
    <React.Fragment>
      {reviews.map((review) => {
        return <ReviewItem review={review} key={`review${review.id}`} />;
      })}
    </React.Fragment>
  );
};

export default ReviewPage;
