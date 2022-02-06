import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { editOrderAct } from "../../store/dataState/dataActions";

import Button from "../ui/Button/Button";

import classes from "./OrderLi.module.css";

const OrderLi = ({ order }) => {
  const { isAdmin, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const date = new Date(order.created_at);
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const onEditHandler = (event) => {
    //dispatch order edit
    dispatch(editOrderAct(token, order.id, !order.isComplete));
  };

  return (
    <tr>
      <td>
        <Link to={`/${isAdmin ? "admin/" : ""}orders/${order.id}`}>
          Order ID: {order.id}
        </Link>
      </td>
      <td>{dateStr}</td>
      <td>
        <div className={classes.status}>
          <span>{order.isComplete ? "YES" : "NO"}</span>
          {isAdmin && (
            <Button
              type="button"
              style="outlined"
              size="small"
              onClickHandler={onEditHandler}
            >
              {order.isComplete ? "✕" : "✔"}
            </Button>
          )}
        </div>
      </td>
      <td>{order.deliveryAddress}</td>
      <td>{order.phone}</td>
      <td>{order.email}</td>
      <td>{`\$${(+order.orderSum).toFixed(2)}`}</td>
    </tr>
  );
};

export default OrderLi;
