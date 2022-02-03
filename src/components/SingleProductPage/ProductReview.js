import classes from "./ProductReview.module.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const ReviewPage = () => {
  const [review, setReview] = useState(null);
  const { productId } = useParams();
  const reviews = useSelector((state) => state.data.reviews);

  useEffect(() => {
    const rev = reviews.find((rev) => rev.id === productId);
    console.log(rev);
    if (rev) {
      setReview(rev);
    }
  }, [reviews]);

  return (
    <React.Fragment>
      {review ? (
        <div>
          <h4 className={classes.title}>Reviews</h4>
          <div className={classes.description}>
            <p className={classes.reviewStarRating}>{review.starRating}</p>
            <div className={classes.reviewDescription}>
              <p className={classes.userId}>{review.userId}</p>
              <p className={classes.reviewStarRating}>{review.starRating}</p>
              <p className={classes.description}>{review.reviewText}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading Reviews...</p>
      )}
    </ React.Fragment>
  );
};

export default ReviewPage;
