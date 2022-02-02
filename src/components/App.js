import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/userState/userSlice";
import { cartActions } from "../store/cartState/cartSlice";
import Container from "./ui/Container/Container";
import ProductsPage from "../pages/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import SingleProductPage from "../pages/SingleProductPage" ;
import Header from "./Header/Header";
import Loader from "./ui/Loader/Loader";

import SignupPage from "../pages/SignupPage";
import OrderPage from "../pages/OrderPage";
import CartPage from "../pages/CartPage";
import AdminPages from "../pages/AdminPages/AdminPages";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  useEffect(() => {
    dispatch(userActions.checkUserLocalStorage());
    dispatch(cartActions.retrieveFromLocal());
  }, [dispatch]);

  return (
    <Container>
      <div className="App">
        <Loader />
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          {userId && <Route path="/orders/:orderId" element={<OrderPage />} />}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/singleProductPage" element={<SingleProductPage />} />
          {isAdmin && <Route path="/admin/*" element={<AdminPages />} />}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
