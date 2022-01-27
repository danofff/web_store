import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm/LoginForm";
import SignupForm from "./SingupForm/SignupForm";

import { userActions } from "../store/userState/userSlice";

import Container from "./ui/Container";
import CategoriesPage from "../pages/CategoriesPage";
import ProductsPage from "../pages/ProductsPage";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.checkUserLocalStorage());
  }, []);

  return (
    <Container>
      <div className="App">
        {/* <LoginForm />
        {/* <SignupForm /> */}
        {/* <CategoriesPage />  */}
        <ProductsPage/>
      </div>
    </Container>
  );
};

export default App;
