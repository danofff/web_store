import { loginUser, registerUser } from "../../api/userApi";
import { userActions } from "./userSlice";

export const loginUserAct = (email, password) => {
  return async (dispatch) => {
    try {
      console.log("login user action is working");
      const user = await loginUser(email, password);
      dispatch(userActions.loginUser(user));

      console.log("unreacheble code");
      return true;
    } catch (error) {
      console.log(error);
      //handle error
      return false;
    }
  };
};

export const registerUserAct = (email, password, address, zip) => {
  return async (dispatch) => {
    try {
      console.log("register user action is working");
      const user = await registerUser(email, password, address, zip);
      return true;
    } catch (error) {
      console.log(error);
      //handle error
    }
  };
};
