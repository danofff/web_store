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
} from "../../store/dataSlice/dataActions";

import classes from "./ProductForm.module.css";
import { getProductById } from "../../api/dataApi";

const ProductForm = ({ mode = "add", productId = null }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const categories = useSelector((state) => state.data.categories);

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    imageURL: "",
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
          });
          setCategoryId(parseInt(product.categoryId));
        })
        .catch((error) => {
          console.log(error);
          //handle error
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
      <StyledSelect
        options={categoriesOptions}
        label="Category"
        name="category"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <FormControl
        type="textarea"
        name="description"
        label="Description"
        isRequired={true}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        formik={formik}
      />
      <Button type="submit" style="plain">
        {mode === "add" ? "Add product" : "Edit product"}
      </Button>
    </form>
  );
};

export default ProductForm;
