import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../ui/Button/Button";

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
      <td className={classes.status}>
        <span>{order.isComplete ? "YES" : "NO"}</span>
        {isAdmin && (
          <Button type="button" style="outlined" size="small">
            {order.isComplete ? "✕" : "✔"}
          </Button>
        )}
      </td>
      <td>{order.deliveryAddress}</td>
      <td>{order.phone}</td>
      <td>{order.email}</td>
      <td>{`\$${(+order.orderSum).toFixed(2)}`}</td>
    </tr>
  );
};

export default OrderLi;
