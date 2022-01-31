import React from "react";
import { useParams } from "react-router-dom";

import ProductForm from "../../components/ProductForm/ProductForm";
import classes from "./AddProductPage.module.css";

const EditProductPage = (props) => {
  const productId = useParams().productId;
  return (
    <div className={classes.container}>
      <h1 className="title">Edit Product</h1>
      <ProductForm mode="edit" productId={productId} />
    </div>
  );
};

export default EditProductPage;
