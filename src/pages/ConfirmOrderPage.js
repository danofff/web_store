import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getUserByIdAct } from "../store/userState/userActions";
import Button from "../components/ui/Button/Button";

import FormControl from "../components/ui/FormControl/FormControl";

import classes from "./ConfirmOrderPage.module.css";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const ConfirmOrderPage = (props) => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userId) {
      dispatch(getUserByIdAct(user.token, user.userId));
    }
  }, [dispatch, user.userId]);

  const onToCartHandler = (event) => {
    navigate("/cart");
  };

  const formik = useFormik({
    initialValues: {
      email: user && user.userData ? user.userData.email : "",
      phone: "",
      address: user && user.userData ? user.userData.address : "",
      zip: user && user.userData ? user.userData.zip : "",
      fullname: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email must be valid email"),
      address: Yup.string(),
      phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
      zip: Yup.string().matches(
        /^\d{5}(-\d{4})?$/,
        "Zip code could contain only digits. Use 00000 or 00000-0000 pattern"
      ),
      fullname: Yup.string().min(
        5,
        "Fullname must be at least 5 characters long"
      ),
    }),
    onSubmit: (values) => {},
    enableReinitialize: true,
  });

  return (
    <div>
      <h1 className="title">Confirm order</h1>
      <Button type="button" style="plain" onClickHandler={onToCartHandler}>
        ← Cart
      </Button>
      <div className={classes.form_container}>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <FormControl
            name="email"
            label="Email"
            type="email"
            isRequired={true}
            value={formik.values.email}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            formik={formik}
          />

          <FormControl
            name="phone"
            label="Phone Number"
            type="text"
            isRequired={true}
            value={formik.values.phone}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            formik={formik}
          />
          <FormControl
            name="fullname"
            label="Fullname"
            type="text"
            isRequired={true}
            value={formik.values.fullname}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            formik={formik}
          />

          <FormControl
            name="address"
            label="Address"
            type="address"
            value={formik.values.address}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            formik={formik}
          />
          <FormControl
            name="zip"
            label="ZIP"
            type="zip"
            value={formik.values.zip}
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            formik={formik}
          />
          <p className={classes.total_sum}>
            TOTAL ORDER SUMM:{" "}
            {`\$${
              Math.round(
                cart.reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0) * 100
              ) / 100
            }`}
          </p>
          <Button type="submit" style="plain">
            CONFIRM ORDER
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
