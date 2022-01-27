import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    token: null,
    isAdmin: null,
    userId: null,
  },
  reducers: {
    loginUser(state, action) {
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.isAdmin = action.payload.isAdmin;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser(state) {
      state.email = null;
      state.userId = null;
      state.isAdmin = null;
      state.token = null;
    },
    checkUserLocalStorage(state) {
      const user = localStorage.getItem("user");
      if (user) {
        const userParsed = JSON.parse(user);
        state.email = userParsed.email;
        state.userId = userParsed.userId;
        state.isAdmin = userParsed.isAdmin;
        state.token = userParsed.token;
      }
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
