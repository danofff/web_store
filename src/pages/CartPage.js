import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { cartActions } from "../store/cartState/cartSlice";
import { addOrder } from "../api/cartApi";
import CartItem from "../components/CartItem/CartItem";
import Button from "../components/ui/Button/Button";

import classes from "./CartPage.module.css";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const onClearHandler = (event) => {
    dispatch(cartActions.clearCart());
  };

  const onBackHandler = (event) => {
    navigate(-1);
  };

  const onOrderHandler = async (event) => {
    if (cartData.quantityTotal > 0) {
      navigate("/cart/confirm");
    } else {
      //show error like "you can't order an empty cart"
    }
  };
  return (
    <section className={classes.main}>
      <h1 className="title">Cart</h1>
      <Button style="plain" type="button" onClickHandler={onBackHandler}>
        &#8592; back
      </Button>
      {cartData.cart.length > 0 ? (
        <div className={classes.cart_container}>
          {cartData.cart.map((prod) => {
            return <CartItem key={prod.productId} product={prod} />;
          })}
        </div>
      ) : (
        <h2 className={classes.nothing_yet}>Cart is empty</h2>
      )}
      <div className={classes.total}>
        TOTAL:{" $"}
        {Math.round(
          cartData.cart.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0) * 100
        ) / 100}
      </div>
      <div className={classes.actions}>
        <Button
          type="button"
          style="outlined"
          onClickHandler={onClearHandler}
          width="100px"
        >
          Clear
        </Button>
        <div className={classes.last_btn}>
          <Button
            type={"button"}
            isDisabled={cartData.quantityTotal === 0}
            style={cartData.quantityTotal > 0 ? "plain" : "disabled"}
            onClickHandler={onOrderHandler}
            width="100px"
          >
            CONFIRM
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
