import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.user = null;
    },
    checkUserLocalStorage(state) {
      const user = localStorage.getItem("user");
      if (user) {
        state.user = JSON.parse(user);
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
