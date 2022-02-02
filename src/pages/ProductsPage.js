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
    let border = "";
    
    useEffect(()=>{
        dispatch(getProductsAct())
    },[]);
    let countDown = products.length;
    let remainder = products.length%3;
    let defCounter=0;
  return (
    <div>
      <ProductPageMenuBar></ProductPageMenuBar>      
      <div className={classes.spacer}>
          {products.map((product, index) =>{
          border = null;
          console.log("CountDown = " + countDown + " when index = " + index)
          //rules for first card
          if (index === 0){
            if (countDown === 1){
              return <ProductCard product={product} border={'a1'}/>
            }
            else if (countDown === 2){
              countDown--;
              return <ProductCard product={product} border={'a2'}/>
            }
            else{
              countDown--;
              return <ProductCard product={product} border={'a'}/>
            }
          }
          //rules for second card
          if (index === 1)
            if(countDown === 2 ){
              countDown--;
              return <ProductCard product={product} border={'b2'}/>
            }else{
              countDown--;
              return <ProductCard product={product} border={'b'}/>
            }
          //rules for 3rd card
          if (index === 2){
            countDown--;
            return <ProductCard product={product} border={'c'}/>
          }
          if ( remainder === 1 && countDown === 1 )
            return <ProductCard product={product} border={'h1'}/>
          if (remainder === 2 && countDown === 2 ){
            countDown--;
            return <ProductCard product={product} border={'g2'}/>
          }
          if (remainder == 2 && countDown == 1)
            return <ProductCard product={product} border={'i2'}/>
          if (countDown <= 3)
            if (countDown ===  3)
              border="g"
            else if (countDown===2)
              border="h"
            else
              border="i"

          if (defCounter===0 && border===null){
            defCounter++;
            border="d";
          }
            else if (defCounter===1){
              defCounter++;
              border="e";
            }
            else{
              defCounter=0;
              border="f";
            }
          countDown--;
          return <ProductCard product={product} border={border}/>
        })}
      </div>
    </div>
  );
}

export default ProductsPage;