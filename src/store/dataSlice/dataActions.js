import {
  getCategories,
  getProducts,
  getAllOrders,
  editCategory,
  deleteCategory,
  addCategory,
} from "../../api/dataApi";
import { dataActions } from "./dataSlice";

/*****CATEGORIES ACTIONS****/
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

export const addCategoryAct = (token, title) => {
  return async (dispatch) => {
    try {
      const response = await addCategory(token, title);
      dispatch(dataActions.addCategory(response.category));
    } catch (error) {
      console.log(error); //handle error here!
    }
  };
};

export const editCategoryAct = (token, categoryId, title) => {
  return async (dispatch) => {
    try {
      const response = await editCategory(token, categoryId, title);
      dispatch(dataActions.editCategory(response.category));
    } catch (error) {
      //handle error
      console.error(error);
    }
  };
};

export const deleteCategoryAct = (token, categoryId) => {
  return async (dispatch) => {
    try {
      const response = await deleteCategory(token, categoryId);
      dispatch(dataActions.editCategories(response.category));
    } catch (error) {
      //handle error
      console.error(error);
    }
  };
};

/*****PRODUCTS ACTIONS****/
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

/*****ORDERS ACTIONS****/
export const getAllOrdersAct = (token) => {
  return async (dispatch) => {
    try {
      const response = await getAllOrders(token);
      dispatch(dataActions.setAllOrders(response.orders));
    } catch (error) {
      //handle error
      console.log(error);
    }
  };
};
