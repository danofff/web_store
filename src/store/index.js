import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userState/userSlice";
import dataSlice from "./dataSlice/dataSlice";
import uiSlice from "./uiSlice/uiSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
