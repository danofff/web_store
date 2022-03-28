import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormControl from "../ui/FormControl/FormControl";
import Button from "../ui/Button/Button";
import StyledSelect from "../ui/StyledSelect/StyledSelect";
import {
  addProductAct,
  editProductAct,
  getCategoriesAdminAct,
} from "../../store/dataState/dataActions";

import classes from "./ProductForm.module.css";
import { getProductById } from "../../api/dataApi";
import { uiActions } from "../../store/uiState/uiSlice";

const ProductForm = ({ mode = "add", productId = null }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const categories = useSelector((state) => state.data.categories);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0.01,
    quantity: 1,
    imageURL: "",
    isActiveProduct: false,
  });
  const [categoryId, setCategoryId] = useState(1);

  useEffect(() => {
    dispatch(getCategoriesAdminAct(token));
    if (mode === "edit") {
      getProductById(productId)
        .then((result) => {
          const product = result.product;
          setProduct({
            title: product.title,
            description: product.description,
            imageURL: product.imageURL,
            price: product.price,
            quantity: product.quantity,
            isActiveProduct: product.isActive,
          });
          setCategoryId(parseInt(product.categoryId));
        })
        .catch((error) => {
          console.log(error);
          //handle error
          dispatch(
            uiActions.setSnackbar({
              isActive: true,
              error: error.message,
              type: "error",
            })
          );
        });
    }
  }, [dispatch]);

  const formik = useFormik({
    initialValues: product,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().min(3).required(),
      description: Yup.string().required().min(12),
      imageURL: Yup.string().required(),
      price: Yup.number().min(0.01).required(),
      quantity: Yup.number().integer().min(1).required(),
    }),
    onSubmit: (values) => {
      const productData = {
        title: values.title,
        description: values.description,
        imageURL: values.imageURL,
        price: values.price,
        quantity: values.quantity,
        categoryId,
        isActive: product.isActiveProduct,
      };
      if (mode === "add") {
        dispatch(addProductAct(token, productData));
      } else {
        dispatch(editProductAct(token, productId, productData));
      }
    },
  });

  const categoriesOptions = categories
    .filter((cat) => cat.isActive)
    .map((cat) => {
      return { value: cat.id, name: cat.title };
    });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <FormControl
        type="text"
        name="title"
        label="Title"
        isRequired={true}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        formik={formik}
      />
      <FormControl
        type="number"
        name="price"
        label="Price"
        min="0.01"
        max="100000"
        step="0.01"
        isRequired={true}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        formik={formik}
      />
      <FormControl
        type="number"
        name="quantity"
        label="Quantity"
        min="1"
        max="10000"
        step="1"
        isRequired={true}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        formik={formik}
      />
      <FormControl
        type="text"
        name="imageURL"
        label="Image URL"
        isRequired={true}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        formik={formik}
      />
      <div className={classes.select__cont}>
        <StyledSelect
          options={categoriesOptions}
          label="Category"
          name="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
      </div>
      <FormControl
        type="textarea"
        name="description"
        label="Description"
        isRequired={true}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        formik={formik}
      />
      {mode === "edit" && (
        <div className={classes.is_active}>
          <input
            type="checkbox"
            checked={product.isActiveProduct}
            onChange={(e) => {
              setProduct((prevState) => {
                return {
                  ...prevState,
                  isActiveProduct: !prevState.isActiveProduct,
                };
              });
            }}
          />
          <label>Is Active Product</label>
        </div>
      )}

      <Button type="submit" style="plain">
        {mode === "add" ? "Add product" : "Edit product"}
      </Button>
    </form>
  );
};

export default ProductForm;
