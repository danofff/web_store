import {
  changeAddress,
  getUserById,
  loginUser,
  registerUser,
} from "../../api/userApi";
import { userActions } from "./userSlice";
import { uiActions } from "../uiState/uiSlice";

export const getUserByIdAct = (token, userId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const user = await getUserById(token, userId);
      dispatch(userActions.setUserData(user.user));
    } catch (error) {
      //handle error
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isActive: true,
          type: "error",
          text: error.message,
        })
      );
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
      dispatch(
        uiActions.setSnackbar({
          type: "error",
          isActive: true,
          text: error.message,
        })
      );
      return false;
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const registerUserAct = (email, password, address, zip) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      await registerUser(email, password, address, zip);
      dispatch(
        uiActions.setSnackbar({
          type: "success",
          isActive: true,
          text: "User successfully registered",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isActive: true,
          type: "error",
          text: error.message,
        })
      );
    } finally {
      uiActions.setLoader(false);
    }
  };
};

export const editUserAddressAct = (token, address, zip) => {
  return async (dispatch) => {
    try {
      uiActions.setLoader(true);
      const user = await changeAddress(token, address, zip);
      dispatch(
        uiActions.setSnackbar({
          type: "success",
          isActive: true,
          text: "Address changed successfully",
        })
      );
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isActive: true,
          type: "error",
          text: error.message,
        })
      );
    } finally {
      uiActions.setLoader(false);
    }
  };
};
