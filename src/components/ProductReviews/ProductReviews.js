import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormControl from "../ui/FormControl/FormControl";
import Button from "../ui/Button/Button";
import StarRating from "../ui/StarRating/StarRating";
import ReviewItem from "../ReviewItem/ReviewItem";
import { addReviewAct } from "../../store/dataState/dataActions";

import classes from "./ProductReviews.module.css";

const ReviewPage = ({ productId }) => {
  const reviews = useSelector((state) => state.data.reviews);
  const { userId, token, email } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [isAddReviewFormActive, setIsAddReviewFormActive] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      reviewText: "",
    },
    validationSchema: Yup.object({
      reviewText: Yup.string()
        .min(12, "Review text must be at least 12 characters long")
        .required("Review text is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(
        addReviewAct(
          token,
          productId,
          values.reviewText,
          rating,
          email.split("@")[0]
        )
      );
      resetForm();
      setIsAddReviewFormActive(false);
      setRating(0);
    },
  });

  const onAddReviewClickHandler = (event) => {
    setIsAddReviewFormActive((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      {userId && (
        <div className={classes.container}>
          <Button
            style="plain"
            type="button"
            size="medium"
            onClickHandler={onAddReviewClickHandler}
            width="110px"
          >
            {isAddReviewFormActive ? "Close Form" : "Add Review"}
          </Button>
          <form
            onSubmit={formik.handleSubmit}
            className={isAddReviewFormActive ? classes.active : ""}
          >
            <FormControl
              type="textarea"
              label="Review Text"
              name="reviewText"
              isRequired={true}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              formik={formik}
            />
            <div className={classes.starRating}>
              <StarRating
                rating={rating}
                disabled={false}
                handleOutRate={(rating) => {
                  setRating(rating);
                }}
              />
            </div>
            <Button type="submit" style="plain">
              Send review
            </Button>
          </form>
        </div>
      )}
      {reviews.map((review) => {
        return <ReviewItem review={review} key={`review${review.id}`} />;
      })}
    </React.Fragment>
  );
};

export default ReviewPage;
