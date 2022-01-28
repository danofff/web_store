import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: { categories: [], products: [], orders: [] },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setAllOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
