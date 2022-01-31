import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoriesPage from "./CategoriesPage";
import OrdersPage from "./OrdersPageA";
import OrderPageA from "./OrderPageA";
import AddProductPage from "./AddProductPage";

const AdminPages = (props) => {
  return (
    <Routes>
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:orderId" element={<OrderPageA />} />
      <Route path="/products/add" element={<AddProductPage />} />
    </Routes>
  );
};

export default AdminPages;