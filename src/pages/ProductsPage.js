import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getProductsAct,
  getProductsAdminAct,
} from "../store/dataState/dataActions";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductPageMenuBar from "../components/ProductPageMenuBar/ProductPageMenuBar";
import Button from "../components/ui/Button/Button";

import classes from "./ProductsPage.module.css";

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);
  const { isAdmin, token } = useSelector((state) => state.user);
  const [sortCategories, setSortCategories] = useState({ categories: null });
  const [sortPriority, setSortPriority] = useState({
    category: null,
    order: null,
  });
  let sortedProducts = [];
  let border = "";
  useEffect(() => {
    if (isAdmin) {
      dispatch(getProductsAdminAct(token));
    } else {
      dispatch(getProductsAct());
    }
  }, [isAdmin]);
  let handleClearAllFilters = (e) => {
    e.preventDefault();
    setSortCategories({ categories: null });
    setSortPriority({ category: null, order: null });
  };
  if (sortCategories.categories)
    products.forEach((product) => {
      sortCategories.categories.forEach((category) => {
        console.log(category);
        if (category == product.categoryId) sortedProducts.push(product);
      });
    });
  else sortedProducts = [...products];
  if (sortPriority.category) {
    if (sortPriority.order === "high")
      sortedProducts.sort((a, b) => {
        return b[sortPriority.category] - a[sortPriority.category];
      });
    else
      sortedProducts.sort(function (a, b) {
        return a[sortPriority.category] - b[sortPriority.category];
      });
  }
  let countDown = sortedProducts.length;
  let remainder = sortedProducts.length % 3;
  let defCounter = 0;
  return (
    <div>
      <ProductPageMenuBar
        sortCategories={sortCategories}
        setSortCategories={setSortCategories}
        sortPriority={sortPriority}
        setSortPriority={setSortPriority}
      ></ProductPageMenuBar>
      <div className={classes.buttonLine}>
        {sortCategories.categories != null || sortPriority.category != null ? (
          <Button
            style="outlined"
            size="medium"
            onClickHandler={handleClearAllFilters}
          >
            Clear All Filters
          </Button>
        ) : null}
      </div>
      <div className={classes.spacer}>
        {sortedProducts.map((product, index) => {
          border = null;
          //rules for first card
          if (index === 0) {
            if (countDown === 1) {
              return (
                <>
                  <div
                    className={classes.dummyBox}
                    key={`dummy1-1${product.id}`}
                  ></div>
                  <ProductCard
                    product={product}
                    border={"a1"}
                    key={`prod${product.id}`}
                  />
                  <div
                    className={classes.dummyBox}
                    key={`dummy2-1${product.id}`}
                  ></div>
                </>
              );
            } else if (countDown === 2) {
              countDown--;
              return (
                <ProductCard
                  product={product}
                  border={"a2"}
                  key={`prod${product.id}`}
                />
              );
            } else {
              countDown--;
              return (
                <ProductCard
                  product={product}
                  border={"a"}
                  key={`prod${product.id}`}
                />
              );
            }
          }
          //rules for second card
          if (index === 1)
            if (countDown === 1) {
              countDown--;
              return (
                <ProductCard
                  product={product}
                  border={"b2"}
                  key={`prod${product.id}`}
                />
              );
            } else {
              countDown--;
              return (
                <ProductCard
                  product={product}
                  border={"b"}
                  key={`prod${product.id}`}
                />
              );
            }
          //rules for 3rd card
          if (index === 2) {
            countDown--;
            return (
              <ProductCard
                product={product}
                border={"c"}
                key={`prod${product.id}`}
              />
            );
          }

          if (remainder === 1 && countDown === 1)
            return (
              <>
                <div
                  className={classes.dummyBox}
                  key={`dummy1-2${product.id}`}
                ></div>
                <ProductCard
                  product={product}
                  border={"h1"}
                  key={`prod${product.id}`}
                />
                <div
                  className={classes.dummyBox}
                  key={`dummy2-2${product.id}`}
                ></div>
              </>
            );
          if (remainder === 2 && countDown === 2) {
            countDown--;
            return (
              <ProductCard
                product={product}
                border={"g2"}
                key={`prod${product.id}`}
              />
            );
          }
          if (remainder == 2 && countDown == 1)
            return (
              <ProductCard
                product={product}
                border={"i2"}
                key={`prod${product.id}`}
              />
            );
          if (countDown <= 3 && remainder === 0)
            if (countDown === 3) border = "g";
            else if (countDown === 2) border = "h";
            else border = "i";
          if (border === null)
            if (defCounter === 0) {
              defCounter++;
              border = "d";
            } else if (defCounter === 1) {
              defCounter++;
              border = "e";
            } else {
              defCounter = 0;
              border = "f";
            }
          countDown--;
          return (
            <ProductCard
              product={product}
              border={border}
              key={`prod${product.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
