import React from "react";
import classes from "./ProductsPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getProductsAct } from "../store/dataSlice/dataActions";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductPageMenuBar from "../components/ProductPageMenuBar/ProductPageMenuBar";


const ProductsPage = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state=>state.data.products)
    useEffect(()=>{
        dispatch(getProductsAct())
    },[])
  return (
    <div>
      <ProductPageMenuBar></ProductPageMenuBar>
      <div className={`spacer ${classes.spacer}`}>
      {products.map(product =>{
        return <ProductCard product={product}/>
      })}
    </div>
    </div>
  );
}
export default ProductsPage;