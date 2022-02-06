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
  getOrdersByUserId,
  getReviewsByProductId,
  addReview,
  editOrder,
} from "../../api/dataApi";
import { dataActions } from "./dataSlice";
import { uiActions } from "../uiState/uiSlice";

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

export const getOrderByUserIdAct = (token, userId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const response = await getOrdersByUserId(token, userId);
      dispatch(dataActions.setAllOrders(response.orders));
    } catch (error) {
      //handle error
      console.log(error);
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const editOrderAct = (token, orderId, isComplete) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const order = await editOrder(token, orderId, isComplete);
      dispatch(dataActions.editOrder(order.order));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isActive: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

/*****REVIEWS ACTIONS****/
export const getReviewsByProductIdAct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const reviews = await getReviewsByProductId(productId);
      dispatch(dataActions.setAllReviews(reviews));
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
      dispatch(uiActions.setLoader(false));
    }
  };
};
export const addReviewAct = (
  token,
  productId,
  reviewText,
  starRating,
  username
) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const review = await addReview(token, productId, reviewText, starRating);
      dispatch(dataActions.addReview({ ...review.review, username }));
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
      dispatch(uiActions.setLoader(false));
    }
  };
};
