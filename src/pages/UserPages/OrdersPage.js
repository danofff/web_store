import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderLi from "../../components/OrderLi/OrderLi";

import { getOrderByUserIdAct } from "../../store/dataState/dataActions";
import classes from "./OrdersPage.module.css";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrderByUserIdAct(user.token, user.userId));
  }, [dispatch]);

  return (
    <section className={classes.main}>
      <h1 className="title">Orders</h1>
      {orders.length > 0 ? (
        <div className={classes.container}>
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
      ) : (
        <h2 className={classes.nothing_yet}>No orders found</h2>
      )}
    </section>
  );
};

export default OrdersPage;
