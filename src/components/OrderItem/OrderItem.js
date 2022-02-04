import React from "react";
import { useNavigate, Link } from "react-router-dom";
import OrderProduct from "../OrderProduct/OrderProduct";

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
          return <OrderProduct product={product} key={product.id} />;
        })}
      </div>
      <div className={classes.order_total}>TOTAL: ${order.orderSum}</div>
      {/* navigate back or to /admin/orders, /orders */}
      <Button
        type="button"
        style="plain"
        onClickHandler={(e) => {
          navigate(-1);
        }}
      >
        &#8592; back
      </Button>
    </div>
  );
};

export default OrderItem;
