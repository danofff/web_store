import { getUserById, loginUser, registerUser } from "../../api/userApi";
import { userActions } from "./userSlice";
import { uiActions } from "../uiSlice/uiSlice";

export const getUserByIdAct = (token, userId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const user = await getUserById(token, userId);
      dispatch(userActions.setUserData(user.user));
    } catch (error) {
      //handle error
      console.log(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const loginUserAct = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const user = await loginUser(email, password);
      dispatch(userActions.loginUser(user));
      return true;
    } catch (error) {
      console.log(error);
      //handle error
      return false;
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const registerUserAct = (email, password, address, zip) => {
  return async (dispatch) => {
    try {
      uiActions.setLoader(true);
      await registerUser(email, password, address, zip);
      return true;
    } catch (error) {
      console.log(error);
      //handle error
    } finally {
      uiActions.setLoader(false);
    }
  };
};
