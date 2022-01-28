import { getCategories, getProducts, getAllOrders } from "../../api/dataApi";
import { dataActions } from "./dataSlice";

export const getCategoriesAct = (token) => {
  return async (dispatch) => {
    try {
      const response = await getCategories(token);
      dispatch(dataActions.setCategories(response.categories));
    } catch (error) {
      console.log(error); //handle error here!
    }
  };
};

export const getProductsAct = () => {
  return async (dispatch) => {
    try {
      const response = await getProducts();
      dispatch(dataActions.setProducts(response.products));
    } catch (error) {
      //handle error here!
      console.log(error);
    }
  };
};

export const getAllOrdersAct = (token) => {
  return async (dispatch) => {
    try {
      const response = await getAllOrders(token);
      dispatch(dataActions.setAllOrders(response.orders));
    } catch (error) {
      console.log(error);
      //handle error
    }
  };
};
