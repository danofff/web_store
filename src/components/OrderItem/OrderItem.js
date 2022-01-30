import React from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../ui/Button/Button";

import classes from "./OrderItem.module.css";

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const orderDate = new Date(order.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div className={classes.container}>
      <h2>
        <span>Order # {order.id}</span> <span>{orderDate}</span>
        <span>{order.isComplete ? "Completed" : "In Progress"}</span>
      </h2>
      <div className={classes.products}>
        {order.products.map((product) => {
          return (
            <div className={classes.product} key={product.id}>
              <div className={classes.product_img}>
                <img src={product.imageURL} alt={product.title} />
              </div>
              <div className={classes.product_info}>
                <h3 className={`${classes.product_title}`}>
                  <Link to={`/products/${product.productId}`}>
                    {product.title}
                  </Link>
                </h3>
                <div className={classes.product_table}>
                  <div className={`${classes.product_col}`}>
                    <span>Price</span>
                    <span>${product.price}</span>
                  </div>
                  <div className={`${classes.product_col}`}>
                    <span>Quantity </span> <span>{product.quantity}</span>
                  </div>
                  <div className={`${classes.product_col}`}>
                    <span>Product Total</span> <span>${product.sum}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.order_total}>TOTAL: ${order.orderSum}</div>
      <Button
        type="button"
        style="plain"
        text="&#8592; back"
        onClickHandler={(e) => {
          navigate(-1);
        }}
      />
    </div>
  );
};

export default OrderItem;
