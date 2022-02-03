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
    changeProduct(state, action) {
      //retrieve info form payload
      const { product, newQuantity } = action.payload;

      //find if product already exists in cart
      const prodIdx = state.cart.findIndex((prod) => {
        return prod.productId === product.productId;
      });

      //service variables
      let newTotalQuantity;

      if (prodIdx !== -1) {
        //subtract previous quantity from totalQuantity and add a new quantity
        newTotalQuantity =
          state.quantityTotal - state.cart[prodIdx].quantity + newQuantity;
        state.cart[prodIdx] = { ...state.cart[prodIdx], quantity: newQuantity };
      } else {
        state.cart.push({ ...product, quantity: 1 });
        newTotalQuantity = state.quantityTotal + 1;
      }
      state.quantityTotal = newTotalQuantity;
      localStorage.removeItem("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify({ cart: state.cart, quantityTotal: newTotalQuantity })
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
    // subtractProduct(state, action) {
    //   const subsProdId = action.payload;
    //   const cartCopy = current(state.cart).slice();
    //   const prodIdx = cartCopy.findIndex(
    //     (prod) => prod.productId === subsProdId
    //   );
    //   if (prodIdx !== -1) {
    //     let editedProd = {};
    //     Object.assign(editedProd, state.cart[prodIdx]);
    //     editedProd.quantity = editedProd.quantity - 1;
    //     if (editedProd.quantity === 0) {
    //       cartCopy.splice(prodIdx, 1);
    //     } else {
    //       cartCopy.splice(prodIdx, 1, editedProd);
    //     }
    //     const newQuantity = state.quantityTotal - 1;
    //     state.quantityTotal = newQuantity;
    //     state.cart = cartCopy;
    //     localStorage.removeItem("cart");
    //     localStorage.setItem(
    //       "cart",
    //       JSON.stringify({ cart: cartCopy, quantityTotal: newQuantity })
    //     );
    //   }
    // },
    clearCart(state, action) {
      state.cart = [];
      state.quantityTotal = 0;
      localStorage.removeItem("cart");
    },
  },
  extraReducers: {},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
