import React from "react";
import { Link } from "react-router-dom";
import classes from "./OrderProduct.module.css";

const OrderProduct = ({ product }) => {
  return (
    <div className={classes.product}>
      <div className={classes.product_img}>
        <img src={product.imageURL} alt={product.title} />
      </div>
      <div className={classes.product_info}>
        <h3 className={`${classes.product_title}`}>
          <Link to={`/products/${product.productId}`}>{product.title}</Link>
        </h3>
        <div className={classes.product_table}>
          <div className={`${classes.product_col}`}>
            <span>Price</span>
            <span>{`\$${product.price}`}</span>
          </div>
          <div className={`${classes.product_col}`}>
            <span>Quantity </span> <span>{product.quantity}</span>
          </div>
          <div className={`${classes.product_col}`}>
            <span>Product Total</span>{" "}
            <span>{`\$${(Math.round(product.sum * 100) / 100).toFixed(
              2
            )}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
