import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getProductsAct,
  getReviewsByProductIdAct,
} from "../store/dataSlice/dataActions";
import { useParams } from "react-router";

import ProductPage from "../components/SingleProductPage/ProductPage";
import ProductReviews from "../components/SingleProductPage/ProductReview";
import { useSelector } from "react-redux";

const SingleProductPage = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const reviews = useSelector((state) => state.data.reviews);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductsAct());
    dispatch(getReviewsByProductIdAct(productId));
  }, []);

  return (
    <div>
      <div>
        <ProductPage productId={productId} />
      </div>
      <div>
        <ProductReviews />
      </div>
    </div>
  );
};

export default SingleProductPage;
