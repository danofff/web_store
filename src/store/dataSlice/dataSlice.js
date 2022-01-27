import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "data",
  initialState: { categories: [] },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
