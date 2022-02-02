import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsAct } from "../store/dataSlice/dataActions";
import ProductPage from "../components/SingleProductPage/ProductPage";
import ReviewPage from "../components/SingleProductPage/ProductReview";
import { useSelector } from "react-redux";

const SingleProductPage = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const reviews = useSelector((state) => state.data.reviews);
  

  useEffect(() => {
    dispatch(getProductsAct());
  }, []);

  return (
    <div>
        <div>
      <ProductPage></ProductPage>
        </div>
        <div>
      {/* <ReviewPage></ReviewPage> */}
        </div>
    </div>
  );
};

export default SingleProductPage;
