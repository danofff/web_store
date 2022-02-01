import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loaderIsActive: false,
  },
  reducers: {
    setLoader(state, action) {
      state.loaderIsActive = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
