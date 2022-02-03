import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderLi from "../../components/OrderLi/OrderLi";

import { getAllOrdersAct } from "../../store/dataSlice/dataActions";
import classes from "./OrdersPageA.module.css";

const OrdersPage = ({ mode = "user" }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    if (mode === "user") {
    } else {
      dispatch(getAllOrdersAct(token));
    }
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <h1 className="title">
        {mode === "user" ? "Orders" : "All Users Orders"}
      </h1>
      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Complete</th>
            <th>Delivery Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return <OrderLi order={order} key={order.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
