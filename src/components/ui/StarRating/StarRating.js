import React, { useState } from "react";
import { editProductAct } from "../../../store/dataSlice/dataActions";
import classes from "./StarRating.module.css";

const StarRating = ({ rating = 0, disabled = true }) => {
  const [innerRate, setInnerRate] = useState(Math.round(rating));
  const ratingArr = [0, 0, 0, 0, 0];

  const handleStarClick = (event) => {
    if (!disabled) {
      const parsedRate = parseInt(event.target.parentNode.dataset.value);
      const newRate = isNaN(parsedRate) ? innerRate : parsedRate;
      rating = setInnerRate(newRate);
    }
  };
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
