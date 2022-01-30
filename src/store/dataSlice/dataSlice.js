import { createSlice, current } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: { categories: [], products: [], orders: [] },
  reducers: {
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
