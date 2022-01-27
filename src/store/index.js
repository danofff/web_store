import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userState/userSlice";
import dataSlice from "./dataSlice/dataSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
  },
});

export default store;
