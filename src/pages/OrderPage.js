import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getOrderById } from "../api/dataApi";
import classes from "./OrderPage.module.css";

const OrderPage = (props) => {
  const orderId = useParams().orderId;
  const token = useSelector((state) => state.user.token);
  const [order, setOrder] = useState();
  useEffect(() => {
    if (token) {
      getOrderById(token, orderId)
        .then((order) => {
          setOrder(order);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);
  return <div></div>;
};

export default OrderPage;
