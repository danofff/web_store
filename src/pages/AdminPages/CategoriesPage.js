import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  getCategoriesAdminAct,
  addCategoryAct,
} from "../../store/dataState/dataActions";
import CategoryLi from "../../components/CategoryLi/CategoryLi";
import Button from "../../components/ui/Button/Button";
import StyledInput from "../../components/ui/StyledInput/StyledInput";

import classes from "./CategoriesPage.module.css";

const CategoriesPage = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.data.categories);
  const token = useSelector((state) => state.user.token);
  const [addCategory, setAddCategory] = useState(false);

  const formik = useFormik({
    initialValues: {
      categoryInput: "",
    },
    validationSchema: Yup.object({
      categoryInput: Yup.string()
        .min(3, "Must be at least 3 char long")
        .required("Category name must not be empty"),
    }),
    onSubmit: (values) => {
      dispatch(addCategoryAct(token, values.categoryInput));
      values.categoryInput = "";
    },
  });

  useEffect(() => {
    dispatch(getCategoriesAdminAct(token));
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <h1 className="title">Categories</h1>
      <Button
        width="80px"
        type="button"
        style="plain"
        onClickHandler={() => {
          setAddCategory((prevState) => !prevState);
        }}
      >
        {addCategory ? "Close" : "Add"}
      </Button>
      <form
        className={`${classes.form} ${addCategory ? classes.form_active : ""}`}
        onSubmit={formik.handleSubmit}
      >
        <StyledInput
          type="text"
          value={formik.values.categoryInput}
          name="categoryInput"
          setValue={formik.handleChange}
          placeholder="Category Name..."
        />
        <Button type="submit" style="outlined" text="Add">
          ADD
        </Button>
        {formik.touched.categoryInput && formik.errors.categoryInput ? (
          <p className={classes.error_text}>{formik.errors.categoryInput}</p>
        ) : null}
      </form>
      <div className={classes.table_cont}>
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
    </div>
  );
};

export default CategoriesPage;
