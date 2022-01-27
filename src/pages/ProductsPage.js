import React from "react";
import classes from "./ProductsPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getProductsAct } from "../store/dataSlice/dataActions";

const ProductsPage = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state=>state.data.products)
    useEffect(()=>{
        dispatch(getProductsAct())
    },[])
  return (
    <div>
      {products.map(product=>{
          return <p>{product.title}</p>
      })}
    </div>
  );
}

export default ProductsPage;