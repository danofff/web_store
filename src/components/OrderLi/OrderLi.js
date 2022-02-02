import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./OrderLi.module.css";

const OrderLi = ({ order }) => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
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
    <tr>
      <td>
        <Link to={`/${isAdmin ? "admin/" : ""}orders/${order.id}`}>
          Order ID: {order.id}
        </Link>
      </td>
      <td>{dateStr}</td>
      <td>{order.isComplete ? "YES" : "NO"}</td>
      <td>{order.orderSum}</td>
    </tr>
  );
};

export default OrderLi;
