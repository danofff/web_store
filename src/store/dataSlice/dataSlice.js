import { createSlice, current } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: { categories: [], products: [], orders: [] },
  reducers: {
    //categories
    setCategories(state, action) {
      state.categories = action.payload.sort((a, b) => a.id - b.id);
    },
    editCategory(state, action) {
      const newCat = action.payload;
      const allCat = current(state.categories).slice();
      const editedCatIdx = allCat.findIndex((cat) => newCat.id === cat.id);
      allCat.splice(editedCatIdx, 1, newCat);
      state.categories = allCat;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },

    //products
    setProducts(state, action) {
      state.products = action.payload.sort((a, b) => a.id - b.id);
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },

    //orders
    setAllOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
