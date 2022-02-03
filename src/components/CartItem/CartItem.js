import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { cartActions } from "../../store/cartState/cartSlice";
import StyledInput from "../ui/StyledInput/StyledInput";
import Button from "../ui/Button/Button";

import classes from "./CartItem.module.css";

const CartItem = ({ product }) => {
  const [quantityInput, setQuantityInput] = useState(product.quantity);
  const dispatch = useDispatch();

  const onQuantityChange = (event) => {
    const newQuantity = +event.target.value;

    if (newQuantity === 0) {
      dispatch(cartActions.deleteProduct(product.productId));
      return;
    }
    //check if quantity > then prev quantity addProduct
    //check if we have enought products left
    if (newQuantity > product.maxQuantity) {
      //handle not enought error
    } else {
      dispatch(
        cartActions.changeProduct({
          product: {
            productId: product.productId,
            price: product.price,
          },
          newQuantity: newQuantity,
          mode: "input",
        })
      );
      setQuantityInput(newQuantity);
    }
  };

  const onDeleteHandler = (event) => {
    dispatch(cartActions.deleteProduct(product.productId));
  };
  return (
    <div className={classes.cart_item}>
      <div className={classes.grid}>
        <span>Title</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Summ</span>
        <span className={classes.item_title}>
          <Link to={`/products/${product.productId}`}>{product.title}</Link>
        </span>
        <span className={classes.item_price}> {`\$${product.price}`}</span>
        <span className={classes.item_quantity}>
          <StyledInput
            type="number"
            name="quantity"
            value={quantityInput}
            setValue={onQuantityChange}
            min="1"
            max={product.maxQuantity}
            step="1"
          />
        </span>
        <span>${(product.price * quantityInput).toFixed(2)}</span>
      </div>

      <Button
        type="button"
        style="plain"
        onClickHandler={onDeleteHandler}
        width="36px"
      >
        &#x2715;
      </Button>
    </div>
  );
};

export default CartItem;
