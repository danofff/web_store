import React from "react";
import classes from "./CategoriesPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoriesAct } from "../store/dataSlice/dataActions";

const CategoriesPage = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.categories);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    dispatch(getCategoriesAct(token));
  }, [dispatch]);
  return (
    <div>
      {categories.map((category) => {
        return <p>{category.title}</p>;
      })}
    </div>
  );
};

export default CategoriesPage;
