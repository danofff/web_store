import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { getUserByIdAct } from "../store/userState/userActions";
import Button from "../components/ui/Button/Button";

import classes from "./ConfirmOrderPage.module.css";

const ConfirmOrderPage = (props) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userId) {
      dispatch(getUserByIdAct(user.token, user.userId));
    }
  }, [dispatch, user.userId]);

  const onToCartHandler = (event) => {
    navigate("/cart");
  };

  const formik = useFormik({
    initialValues: {},
  });

  return (
    <div>
      <h1 className="title">Confirm order</h1>
      <Button type="button" style="plain" onClickHandler={onToCartHandler}>
        Cart
      </Button>
      <form></form>
    </div>
  );
};

export default ConfirmOrderPage;
