import React, { useState, useEffect } from "react";
import classes from "./StarRating.module.css";

const StarRating = ({
  rating = 0,
  disabled = true,
  handleOutler = () => {},
}) => {
  const [innerRate, setInnerRate] = useState(Math.round(rating * 10) / 10);
  const ratingArr = [0, 0, 0, 0, 0];

  const handleStarClick = (event) => {
    if (!disabled) {
      const parsedRate = parseInt(event.target.parentNode.dataset.value);
      const newRate = isNaN(parsedRate) ? innerRate : parsedRate;
      rating = setInnerRate(newRate);
      handleOutler(newRate);
    }
  };

  useEffect(() => {
    setInnerRate(+rating);
  }, [rating]);

  return (
    <div className={classes.rating}>
      <span
        className={classes.rate_zero}
        data-value={0}
        onClick={handleStarClick}
      >
        <i className="far fa-star"></i>
      </span>
      {ratingArr.map((el, idx) => {
        return (
          <span
            key={`rate${idx}`}
            className={classes.rate}
            data-value={idx + 1}
            onClick={handleStarClick}
          >
            <i
              className={`${idx + 1 <= innerRate ? "fas" : "far"} fa-star`}
            ></i>
          </span>
        );
      })}
      <span className={classes.rating_digit}>{innerRate.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;
