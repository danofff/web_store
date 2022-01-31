import {
  getCategories,
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

/*****CATEGORIES ACTIONS****/
export const getCategoriesAdminAct = (token) => {
  return async (dispatch) => {
    try {
      const response = await getCategoriesAdmin(token);
      dispatch(dataActions.setCategories(response.categories));
    } catch (error) {
      console.log(error); //handle error here!
    }
  };
};

// made this to get list of all categories for products page
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

export const editCategoryAct = (token, categoryId, categoryData) => {
  return async (dispatch) => {
    try {
      const response = await editCategory(token, categoryId, categoryData);
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
      dispatch(dataActions.editCategory(response.category));
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

export const addProductAct = (token, productData) => {
  return async (dispatch) => {
    try {
      const response = await addProduct(token, productData);
      dispatch(dataActions.addProduct(response.product));
    } catch (error) {
      //handle error here
      console.log(error);
    }
  };
};

export const editProductAct = (token, productId, productData) => {
  return async (dispatch) => {
    try {
      const response = await editProduct(token, productId, productData);
      dispatch(dataActions.editProduct(response.product));
    } catch (error) {
      // handle error here
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
