import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loaderIsActive: false,
    snackbar: {
      type: "default",
      text: "default",
      isActive: false,
    },
  },
  reducers: {
    setLoader(state, action) {
      state.loaderIsActive = action.payload;
    },
    setSnackbar(state, action) {
      state.snackbar = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
