import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

import CategoriesPage from "./CategoriesPage";
import OrdersPage from "./OrdersPageA";
import OrderPageA from "./OrderPageA";
import AddProductPage from "./AddProductPage";
import EditProductPage from "./EditProductPage";
import NotFoundPage from "../UserPages/NotFoundPage";

import classes from "./AdminPages.module.css";

const AdminPages = (props) => {
  return (
    <section className={classes.admin_main}>
      <h1 className="title">Admin</h1>
      <nav className={classes.admin_nav}>
        <ul>
          <li>
            <NavLink to="/admin/orders">All orders</NavLink>
          </li>
          <li>
            <NavLink to="/admin/products/add">Add Product</NavLink>
          </li>
          <li>
            <NavLink to="/admin/categories">Categories</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate replace to="/admin/orders" />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/orders" element={<OrdersPage mode="admin" />} />
        <Route path="/orders/:orderId" element={<OrderPageA />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/edit/:productId" element={<EditProductPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </section>
  );
};

export default AdminPages;
