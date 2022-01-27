import { getCategories } from "../../api/dataApi";
import { dataActions } from "./dataSlice";

export const getCategoriesAct = (token) => {
  return async (dispatch) => {
    try {
      const response = await getCategories(token);
      dispatch(dataActions.setCategories(response.categories));
      return response;
    } catch (error) {
      console.log(error);//handle error here!
    }
  };
};
