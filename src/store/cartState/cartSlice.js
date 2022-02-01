import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
  },
  reducers: {
    addProduct(state, action) {
      console.log("add product action is working");
      const addedProduct = action.payload;
      const cartCopy = current(state.cart).slice();
      const prodIdx = cartCopy.findIndex((prod) => prod.id === addedProduct.id);
      if (prodIdx !== -1) {
        let editedProd = {};
        Object.assign(editedProd, cartCopy[prodIdx]);
        editedProd.quantity = editedProd.quantity + 1;
        cartCopy.splice(prodIdx, 1, editedProd);
        state.cart = cartCopy;
      } else {
        state.cart.push({ ...addedProduct, quantity: 1 });
      }
      state.quantity = state.quantity + 1;
    },
  },
  deleteProduct(state, action) {
    const delProdId = action.payload;
    const cartCopy = current(state.cart).slice();
    const prodIdx = cartCopy.findIndex((prod) => prod.id === delProdId);
    if (prodIdx !== -1) {
      state.quantity = state.quantity - cartCopy[prodIdx].quantity;
      cartCopy.splice(prodIdx, 1);
    }
    state.cart = cartCopy;
  },
  subtractProduct(state, action) {
    const subsProdId = action.payload;
    const cartCopy = current(state.cart).slice();
    const prodIdx = cartCopy.findIndex((prod) => prod.id === subsProdId);
    if (prodIdx !== -1) {
      let editedProd = {};
      Object.assign(editedProd, state.cart[prodIdx]);
      editedProd.quantity = editedProd.quantity - 1;
      if (editedProd.quantity === 0) {
        cartCopy.splice(prodIdx, 1);
      } else {
        cartCopy.splice(prodIdx, 1, editedProd);
      }
      state.quantity = state.quantity - 1;
    }
    state.cart = cartCopy;
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
