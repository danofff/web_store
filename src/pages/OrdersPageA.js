import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderLi from "../components/OrderLi/OrderLi";

import { getAllOrdersAct } from "../store/dataSlice/dataActions";
import classes from "./OrdersPage.module.css";

const OrdersPage = (props) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    dispatch(getAllOrdersAct(token));
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <h1>All users orders</h1>
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              <OrderLi order={order} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersPage;
