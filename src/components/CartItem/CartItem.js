import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cartState/cartSlice";
import StyledInput from "../ui/StyledInput/StyledInput";
import Button from "../ui/Button/Button";

import classes from "./CartItem.module.css";

const CartItem = ({ product }) => {
  const [quantityInput, setQuantityInput] = useState(product.quantity);
  const dispatch = useDispatch();

  const onQuantityChange = (event) => {
    const newQuantity = event.target.value;
    //check if quantity > then prev quantity addProduct
    //else subtract product
    if (newQuantity > quantityInput) {
      //check if we have enogh products left
      if (newQuantity > product.maxQuantity) {
        //handle not enought error
      } else {
        dispatch(
          cartActions.addProduct({
            productId: product.productId,
            price: product.price,
          })
        );
        setQuantityInput(event.target.value);
      }
      return;
    } else {
      dispatch(cartActions.subtractProduct(product.productId));
      setQuantityInput(event.target.value);
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
        <span className={classes.item_title}>{product.title}</span>
        <span className={classes.item_price}> {`\$${product.price}`}</span>
        <span className={classes.item_quantity}>
          <StyledInput
            type="number"
            name="quantity"
            value={quantityInput}
            setValue={onQuantityChange}
          />
        </span>
        <span>${(product.price * quantityInput).toFixed(2)}</span>
      </div>

      <Button type="button" style="plain" onClickHandler={onDeleteHandler}>
        &#x2715;
      </Button>
    </div>
  );
};

export default CartItem;
