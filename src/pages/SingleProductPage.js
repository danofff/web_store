import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import {
  getProductsAct,
  getReviewsByProductIdAct,
} from "../store/dataState/dataActions";
import ProductPage from "../components/SingleProductPage/ProductPage";
import ProductReviews from "../components/SingleProductPage/ProductReview";
import classes from "./SingleProductPage.module.css";

const SingleProductPage = (props) => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductsAct());
    dispatch(getReviewsByProductIdAct(productId));
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <div>
          <ProductPage productId={productId} />
        </div>
        <div>
          <ProductReviews productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
