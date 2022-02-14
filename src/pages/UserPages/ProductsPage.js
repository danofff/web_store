import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  getCategoriesAct,
  getProductsAct,
  getProductsAdminAct,
} from "../../store/dataState/dataActions";
import ProductCard from "../../components/ProductCard/ProductCard";
import StyledSelect from "../../components/ui/StyledSelect/StyledSelect";
import Button from "../../components/ui/Button/Button";

import classes from "./ProductsPage.module.css";

const sortProducts = (products, sortingType) => {
  switch (sortingType) {
    case "priceLowHigh":
      return products.slice().sort((prod1, prod2) => {
        return prod1.price - prod2.price;
      });
    case "priceHighLow":
      return products.slice().sort((prod1, prod2) => {
        return -(prod1.price - prod2.price);
      });
    case "ratingLowHigh":
      return products.slice().sort((prod1, prod2) => {
        return prod1.rating - prod2.rating;
      });

    case "ratingHighLow":
      return products.slice().sort((prod1, prod2) => {
        return -(prod1.rating - prod2.rating);
      });
    default:
      return products;
  }
};

const filterProducts = (products, categoryId) => {
  if (categoryId === "all") {
    return products;
  } else {
    return products.filter((prod) => prod.categoryId === categoryId);
  }
};

const ProductsPage = (props) => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.data);
  const { isAdmin, token } = useSelector((state) => state.user);

  //state reducer
  function reducer(state, action) {
    switch (action.type) {
      case "sort":
        if (action.payload === "default") {
          const filtered = filterProducts(products, state.categoryToShow);
          return {
            ...state,
            productsToShow: filtered,
            sortType: action.payload,
          };
        }
        const sorted = sortProducts(state.productsToShow, action.payload);
        return {
          ...state,
          productsToShow: sorted,
          sortType: action.payload,
        };
      case "filter":
        const filtered = filterProducts(products, action.payload);
        const filteredAndSorted = sortProducts(filtered, state.sortType);
        return {
          ...state,
          productsToShow: filteredAndSorted,
          categoryToShow: action.payload,
        };
      case "clear":
        return {
          productsToShow: products,
          sortType: "default",
          categoryToShow: "all",
        };
      default:
        return state;
    }
  }

  //use reducer state handler
  const [pageSatate, dispatchOnPage] = useReducer(reducer, {
    productsToShow: products,
    categoryToShow: "all",
    sortType: "default",
  });

  useEffect(() => {
    dispatchOnPage({ type: "clear", payload: products });
    if (categories.length === 0) {
      dispatch(getCategoriesAct());
    }
  }, [products, categories]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(getProductsAdminAct(token));
    } else {
      dispatch(getProductsAct());
    }
  }, [isAdmin]);

  const onSortChange = (event) => {
    dispatchOnPage({ type: "sort", payload: event.target.value });
  };

  const onFilterChange = (event) => {
    dispatchOnPage({
      type: "filter",
      payload: event.target.value === "all" ? "all" : +event.target.value,
    });
  };

  const onResetHanlder = (event) => {
    dispatchOnPage({ type: "clear" });
  };

  //select options
  const selectSortOptions = [
    { name: "Sort by: Not Sorted", value: "default" },
    { name: "Price: Low to High", value: "priceLowHigh" },
    { name: "Price: High to Low", value: "priceHighLow" },
    { name: "Rating: Low to High", value: "ratingLowHigh" },
    { name: "Rating: Hight to Low", value: "ratingHighLow" },
  ];

  const selectFilterOptions = [
    {
      name: "All Categories",
      value: "all",
    },
    ...categories.map((category) => {
      return {
        name: category.title,
        value: category.id,
      };
    }),
  ];

  return (
    <section>
      <div className={classes.products_manipulation}>
        <div className={classes.manipulation_sort}>
          <StyledSelect options={selectSortOptions} onChange={onSortChange} />
        </div>
        <div className={classes.manipulation_filter}>
          <StyledSelect
            options={selectFilterOptions}
            onChange={onFilterChange}
          />
        </div>
        <Button type="button" style="outlined" onClickHandler={onResetHanlder}>
          Reset
        </Button>
      </div>
      <div className={classes.products_list}>
        {pageSatate.productsToShow.map((product) => {
          return <ProductCard key={`prod${product.id}`} product={product} />;
        })}
      </div>
    </section>
  );
};

export default ProductsPage;
