import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import {
  getProductsAct,
  getReviewsByProductIdAct,
} from "../../store/dataState/dataActions";
import ProductPage from "../../components/ProductInfo/ProductInfo";
import ProductReviews from "../../components/ProductReviews/ProductReviews";
import classes from "./SingleProductPage.module.css";

const SingleProductPage = (props) => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductsAct());
    dispatch(getReviewsByProductIdAct(productId));
  }, []);

  return (
    <div className={classes.container}>
      <div>
        <ProductPage productId={productId} />
      </div>
      <div>
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
};

export default SingleProductPage;
