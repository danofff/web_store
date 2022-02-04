import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormControl from "../ui/FormControl/FormControl";
import Button from "../ui/Button/Button";
import { changePassword } from "../../api/userApi";
import { uiActions } from "../../store/uiSlice/uiSlice";
import classes from "./ProfileChangePassword.module.css";

const ProfileChangePassword = () => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      passwordOld: "",
      passwordNew: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      passwordOld: Yup.string()
        .required("Old password is required field")
        .min(8, "Old password must be at least 8 characters long"),
      passwordNew: Yup.string()
        .required("New password is required field")
        .min(8, "New password must be at least 8 characters long"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("passwordNew")], "Passwords must match")
        .required("Password confirmation is required field"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(uiActions.setLoader(true));
      changePassword(token, values.passwordOld, values.passwordNew)
        .then((response) => {
          dispatch(
            uiActions.setSnackbar({
              isActive: true,
              type: "success",
              text: "Password successfully changed",
            })
          );
        })
        .catch((error) => {
          dispatch(
            uiActions.setSnackbar({
              isActive: true,
              type: "error",
              text: error.message,
            })
          );
        })
        .finally(() => {
          resetForm({ values: "" });
          dispatch(uiActions.setLoader(false));
        });
    },
    enableReinitialize: true,
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          label="Old password"
          name="passwordOld"
          type="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          formik={formik}
        />
        <FormControl
          label="New password"
          name="passwordNew"
          type="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          formik={formik}
        />
        <FormControl
          label="Password confirmation"
          name="passwordConfirmation"
          type="password"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          formik={formik}
        />
        <Button type="submit" style="plain">
          Change password
        </Button>
      </form>
    </div>
  );
};

export default ProfileChangePassword;
