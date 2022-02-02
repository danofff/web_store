import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOrderById } from "../api/dataApi";
import OrderItem from "../components/OrderItem/OrderItem";
import classes from "./OrderPage.module.css";

const OrderPage = (props) => {
  const orderId = useParams().orderId;
  const token = useSelector((state) => state.user.token);
  const [order, setOrder] = useState();
  useEffect(() => {
    if (token) {
      getOrderById(token, orderId)
        .then((order) => {
          setOrder(order.order);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);
  return <div>{order ? <OrderItem order={order} /> : <p>Loading...</p>}</div>;
};

export default OrderPage;
