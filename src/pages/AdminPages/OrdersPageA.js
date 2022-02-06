import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderLi from "../../components/OrderLi/OrderLi";
import { getAllOrdersAct } from "../../store/dataState/dataActions";
import StyledSelect from "../../components/ui/StyledSelect/StyledSelect";

import classes from "./OrdersPageA.module.css";

const selectOptions = [
  { value: "all", name: "All Orders" },
  { value: "completed", name: "Completed Orders" },
  { value: "noncompleted", name: "Noncompleted Orders" },
];

const OrdersPage = ({ mode = "user" }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.data.orders);
  const token = useSelector((state) => state.user.token);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectOption, setSelectOption] = useState("all");
  useEffect(() => {
    if (mode === "user") {
    } else {
      dispatch(getAllOrdersAct(token));
    }
  }, [dispatch]);

  useEffect(() => {
    filterOrders(selectOption);
  }, [orders]);

  const filterOrders = (option) => {
    let selectedOrders;
    switch (option) {
      case "completed":
        selectedOrders = orders.filter((order) => order.isComplete);
        break;
      case "noncompleted":
        selectedOrders = orders.filter((order) => !order.isComplete);
        break;
      default:
        selectedOrders = orders;
    }
    setFilteredOrders(selectedOrders);
  };

  const onSelectChange = (event) => {
    setSelectOption(event.target.value);
    filterOrders(event.target.value);
  };

  return (
    <div className={classes.main}>
      <h1 className="title">
        {mode === "user" ? "Orders" : "All Users Orders"}
      </h1>
      <div className={classes.select_cont}>
        <StyledSelect
          options={selectOptions}
          label="Filter Orders:"
          onChange={onSelectChange}
        />
      </div>
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
            {filteredOrders.map((order) => {
              return <OrderLi order={order} key={order.id} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
