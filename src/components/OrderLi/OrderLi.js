import React from "react";
import { Link } from "react-router-dom";
import classes from "./OrderLi.module.css";

const OrderLi = ({ order }) => {
  const date = new Date(order.created_at);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div>
      <Link to={`/orders/${order.id}`}>
        <span>Order ID: {order.id} | </span>
      </Link>
      <span>Order Sum: {order.orderSum} | </span>
      <span>Order Date: {dateStr} | </span>
      <span>Order Complete Status: {order.isComplete ? "YES" : "NO"}</span>
    </div>
  );
};

export default OrderLi;
