import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getOrderById } from "../../api/dataApi";
import OrderItem from "../../components/OrderItem/OrderItem";
import classes from "./OrderPageA.module.css";

const OrderPageA = (props) => {
  const orderId = useParams().orderId;
  const [order, setOrder] = useState(null);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    getOrderById(token, orderId)
      .then((result) => {
        setOrder(result.order);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>{order ? <OrderItem order={order} /> : <p>Loading...</p>}</div>;
};

export default OrderPageA;
