import React from "react";

import ProductForm from "../../components/ProductForm/ProductForm";

import classes from "./AddProductPage.module.css";

const AddProductPage = (props) => {
  return (
    <div className={classes.container}>
      <h1 className="title">Add Product</h1>
      <ProductForm />
    </div>
  );
};

export default AddProductPage;
