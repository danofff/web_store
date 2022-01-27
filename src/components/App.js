import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./LoginForm/LoginForm";

import { userActions } from "../store/userState/userSlice";

import Container from "./ui/Container";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.checkUserLocalStorage());
  }, []);
  return (
    <Container>
      <div className="App">
        <LoginForm />
      </div>
    </Container>
  );
};

export default App;
