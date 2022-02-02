import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantityTotal: 0,
  },
  reducers: {
    retrieveFromLocal(state, action) {
      const cartLocal = localStorage.getItem("cart");
      if (cartLocal) {
        const cartParsed = JSON.parse(cartLocal);
        state.cart = cartParsed.cart;
        state.quantityTotal = cartParsed.quantityTotal;
      }
    },
    addProduct(state, action) {
      const addedProduct = action.payload;

      const cartCopy = current(state.cart).slice();
      const prodIdx = cartCopy.findIndex((prod) => {
        return prod.productId === addedProduct.productId;
      });
      if (prodIdx !== -1) {
        let editedProd = {};
        Object.assign(editedProd, cartCopy[prodIdx]);
        editedProd.quantity = editedProd.quantity + 1;
        cartCopy.splice(prodIdx, 1, editedProd);
        state.cart = cartCopy;
      } else {
        cartCopy.push({ ...addedProduct, quantity: 1 });
      }
      const newQuantity = state.quantityTotal + 1;
      state.quantityTotal = newQuantity;
      state.cart = cartCopy;
      localStorage.removeItem("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart: cartCopy, quantityTotal: newQuantity })
      );
    },
    deleteProduct(state, action) {
      const delProdId = action.payload;
      const cartCopy = current(state.cart).slice();
      const prodIdx = cartCopy.findIndex(
        (prod) => prod.productId === delProdId
      );
      if (prodIdx !== -1) {
        const newQuantity = state.quantityTotal - cartCopy[prodIdx].quantity;
        state.quantityTotal = newQuantity;
        cartCopy.splice(prodIdx, 1);
        state.cart = cartCopy;
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({ cart: cartCopy, quantityTotal: newQuantity })
        );
      }
    },
    subtractProduct(state, action) {
      const subsProdId = action.payload;
      const cartCopy = current(state.cart).slice();
      const prodIdx = cartCopy.findIndex(
        (prod) => prod.productId === subsProdId
      );
      if (prodIdx !== -1) {
        let editedProd = {};
        Object.assign(editedProd, state.cart[prodIdx]);
        editedProd.quantity = editedProd.quantity - 1;
        if (editedProd.quantity === 0) {
          cartCopy.splice(prodIdx, 1);
        } else {
          cartCopy.splice(prodIdx, 1, editedProd);
        }
        const newQuantity = state.quantityTotal - 1;
        state.quantityTotal = newQuantity;
        state.cart = cartCopy;
        localStorage.removeItem("cart");
        localStorage.setItem(
          "cart",
          JSON.stringify({ cart: cartCopy, quantityTotal: newQuantity })
        );
      }
    },
    clearCart(state, action) {
      state.cart = [];
      state.quantityTotal = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
