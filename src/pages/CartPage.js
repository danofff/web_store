import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cartActions } from "../store/cartState/cartSlice";
import CartItem from "../components/CartItem/CartItem";
import Button from "../components/ui/Button/Button";

import classes from "./CartPage.module.css";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  const onClearHandler = (event) => {
    dispatch(cartActions.clearCart());
  };

  const onBackHandler = (event) => {
    navigate(-1);
  };
  return (
    <section className={classes.main}>
      <h1 className="title">Cart</h1>
      <Button
        style="plain"
        text="&#8592; back"
        type="button"
        onClickHandler={onBackHandler}
      />
      {cart.length > 0 ? (
        <div className={classes.cart_container}>
          {cart.map((prod) => {
            return <CartItem key={prod.id} product={prod} />;
          })}
        </div>
      ) : (
        <h2 className={classes.nothing_yet}>Cart is empty</h2>
      )}
      <div className={classes.total}>
        TOTAL:{" $"}
        {Math.round(
          cart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0) * 100
        ) / 100}
      </div>
      <div className={classes.actions}>
        <Button
          type="button"
          style="outlined"
          text="Clear"
          onClickHandler={onClearHandler}
        />
        <div className={classes.last_btn}>
          <Button type="button" style="plain" text="Order" />
        </div>
      </div>
    </section>
  );
};

export default CartPage;
