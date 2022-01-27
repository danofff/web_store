import { getCategories, getProducts } from "../../api/dataApi";
import { dataActions } from "./dataSlice";

export const getCategoriesAct = (token) => {
  return async (dispatch) => {
    try {
      const response = await getCategories(token);
      dispatch(dataActions.setCategories(response.categories));
    } catch (error) {
      console.log(error);//handle error here!
    }
  };
};

export const getProductsAct = () =>{
  return async (dispatch)=>{
      try {
        const response= await getProducts();
        dispatch(dataActions.setProducts(response.products))
      } catch (error) {
          //handle error here!
        console.log(error)
      }
  }
}
