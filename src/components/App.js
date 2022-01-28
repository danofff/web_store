import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../store/userState/userSlice";
import Container from "./ui/Container";
import CategoriesPage from "../pages/CategoriesPage";
import ProductsPage from "../pages/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";

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
        <Routes>
          <Route path="/" element={<Navigate replace to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          {user.isAdmin && (
            <Route path="/categories" element={<CategoriesPage />} />
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
