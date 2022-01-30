import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCategoriesAct,
  addCategoryAct,
} from "../../store/dataSlice/dataActions";
import CategoryLi from "../../components/CategoryLi/CategoryLi";
import Button from "../../components/ui/Button/Button";

import classes from "./CategoriesPage.module.css";

const CategoriesPage = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.categories);
  const token = useSelector((state) => state.user.token);
  const [addCategory, setAddCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    dispatch(getCategoriesAct(token));
  }, [dispatch]);

  const onAddSubmit = (event) => {
    event.preventDefault();
    dispatch(addCategoryAct(token, categoryInput));
  };
  return (
    <div className={classes.container}>
      <h1 className="title">Categories</h1>
      <Button
        width="100px"
        type="button"
        style="plain"
        text={addCategory ? "close" : "Add"}
        onClickHandler={() => {
          setAddCategory((prevState) => !prevState);
        }}
      />
      <form
        className={`${classes.form} ${addCategory ? classes.form_active : ""}`}
        onSubmit={onAddSubmit}
      >
        <input
          type="text"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <Button type="submit" style="outlined" text="Add" />
      </form>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className={classes.th_name}>Name</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return <CategoryLi category={category} key={category.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;
