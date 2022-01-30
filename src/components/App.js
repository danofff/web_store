import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/userState/userSlice";
import Container from "./ui/Container/Container";
import ProductsPage from "../pages/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";

import Header from "./Header/Header";

import SignupPage from "../pages/SignupPage";
import OrderPage from "../pages/OrderPage";
import AdminPages from "../pages/AdminPages/AdminPages";


import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(userActions.checkUserLocalStorage());
  }, [dispatch]);

  return (
    <Container>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          {user && <Route path="/orders/:orderId" element={<OrderPage />} />}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {user.isAdmin && <Route path="/admin/*" element={<AdminPages />} />}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
