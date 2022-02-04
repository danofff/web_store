import React from "react";
import classes from "./ProductsPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { getProductsAct } from "../store/dataSlice/dataActions";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductPageMenuBar from "../components/ProductPageMenuBar/ProductPageMenuBar";


const ProductsPage = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state=>state.data.products);
    const [sortCategories, setSortCategories] = useState({categories: null})
    const [sortPriority, setSortPriority] = useState({category: null, order: null})
    let sortedProducts=[];
    let border = "";
    useEffect(()=>{
        dispatch(getProductsAct())
    },[]);
    if (sortCategories.categories)
      products.forEach(product=>{
        sortCategories.categories.forEach(category=>{
          console.log(category)
          if (category == product.categoryId)
            sortedProducts.push(product)
        })
      })
    else sortedProducts=[...products];
    if(sortPriority.category)
    {
      if (sortPriority.order === "high")
        sortedProducts.sort((a,b)=>{
          return b[sortPriority.category] - a[sortPriority.category]
        })
      else
      sortedProducts.sort(function(a,b){
        return a[sortPriority.category] - b[sortPriority.category]
      })
    }
    let countDown = sortedProducts.length;
    let remainder = sortedProducts.length%3;
    let defCounter=0;
  return (
    <div>
      <ProductPageMenuBar 
        sortCategories={sortCategories} setSortCategories={setSortCategories}
        sortPriority={sortPriority} setSortPriority={setSortPriority}
      ></ProductPageMenuBar>
      <div className={classes.spacer}>
          {sortedProducts.map((product, index) =>{
          border = null;
          //rules for first card
          if (index === 0){
            if (countDown === 1){
              return <><div className={classes.dummyBox}></div><ProductCard product={product} border={'a1'}/><div className={classes.dummyBox}></div></>
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
            if(countDown === 1 ){
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
            return <><div className={classes.dummyBox}></div><ProductCard product={product} border={'h1'}/><div className={classes.dummyBox}></div></>
          if (remainder === 2 && countDown === 2 ){
            countDown--;
            return <ProductCard product={product} border={'g2'}/>
          }
          if (remainder == 2 && countDown == 1)
            return <ProductCard product={product} border={'i2'}/>
          if (countDown <= 3 && remainder===0)
            if (countDown ===  3)
              border="g"
            else if (countDown===2)
              border="h"
            else
              border="i"
          if (border === null)
            if (defCounter===0){
              defCounter++;
              border="d";
            }else if (defCounter===1){
                defCounter++;
                border="e";
            }else{
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