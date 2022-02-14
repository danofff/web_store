import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//state
import { userActions } from "../store/userState/userSlice";
import { cartActions } from "../store/cartState/cartSlice";

//ui components
import Container from "./ui/Container/Container";
import Header from "./Header/Header";
import Loader from "./ui/Loader/Loader";
import Snackbar from "./ui/Snackbar/Snackbar";

//pages
import LoginPage from "../pages/UserPages/LoginPage";
import SingleProductPage from "../pages/UserPages/SingleProductPage";
import ProductsPage from "../pages/UserPages/ProductsPage";
import NotFoundPage from "../pages/UserPages/NotFoundPage";
import SignupPage from "../pages/UserPages/SignupPage";
import OrdersPage from "../pages/UserPages/OrdersPage";
import OrderPage from "../pages/UserPages/OrderPage";
import CartPage from "../pages/UserPages/CartPage";
import ConfirmOrderPage from "../pages/UserPages/ConfirmOrderPage";
import ProfilePage from "../pages/UserPages/ProfilePage";
import AdminPages from "../pages/AdminPages/AdminPages";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
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
          {userId && <Route path="/profile" element={<ProfilePage />} />}
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          {userId && <Route path="/orders" element={<OrdersPage />} />}
          {userId && <Route path="/orders/:orderId" element={<OrderPage />} />}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/confirm" element={<ConfirmOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {isAdmin && <Route path="/admin/*" element={<AdminPages />} />}
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Snackbar />
    </Container>
  );
};

export default App;
