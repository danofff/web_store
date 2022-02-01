import {
  getCategoriesAdmin,
  getProducts,
  getAllOrders,
  editCategory,
  deleteCategory,
  addCategory,
  addProduct,
  editProduct,
} from "../../api/dataApi";
import { dataActions } from "./dataSlice";
import { uiActions } from "../uiSlice/uiSlice";

/*****CATEGORIES ACTIONS****/
export const getCategoriesAdminAct = (token) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await getCategoriesAdmin(token);
      dispatch(dataActions.setCategories(response.categories));
    } catch (error) {
      console.log(error); //handle error here!
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const addCategoryAct = (token, title) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await addCategory(token, title);
      dispatch(dataActions.addCategory(response.category));
    } catch (error) {
      console.log(error); //handle error here!
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const editCategoryAct = (token, categoryId, categoryData) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await editCategory(token, categoryId, categoryData);
      dispatch(dataActions.editCategory(response.category));
    } catch (error) {
      //handle error
      console.error(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const deleteCategoryAct = (token, categoryId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await deleteCategory(token, categoryId);
      dispatch(dataActions.editCategory(response.category));
    } catch (error) {
      //handle error
      console.error(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

/*****PRODUCTS ACTIONS****/
export const getProductsAct = () => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await getProducts();
      dispatch(dataActions.setProducts(response.products));
    } catch (error) {
      //handle error here!
      console.log(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const addProductAct = (token, productData) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await addProduct(token, productData);
      dispatch(dataActions.addProduct(response.product));
    } catch (error) {
      //handle error here
      console.log(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const editProductAct = (token, productId, productData) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await editProduct(token, productId, productData);
      dispatch(dataActions.editProduct(response.product));
    } catch (error) {
      // handle error here
      console.log(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

/*****ORDERS ACTIONS****/
export const getAllOrdersAct = (token) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await getAllOrders(token);
      dispatch(dataActions.setAllOrders(response.orders));
    } catch (error) {
      //handle error
      console.log(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};
