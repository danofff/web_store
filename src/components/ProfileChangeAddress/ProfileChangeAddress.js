import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import ProfileFormsWrapper from "../ui/ProfileFormsWrapper/ProfileFormsWrapper";
import Button from "../ui/Button/Button";
import FormControl from "../ui/FormControl/FormControl";
import { getUserByIdAct } from "../../store/userState/userActions";
import { editUserAddressAct } from "../../store/userState/userActions";

const PrifileChangeAddress = (props) => {
  const { token, userId, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdAct(token, userId));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      address: userData ? userData.address : "",
      zip: userData ? userData.zip : "",
    },
    validationSchema: Yup.object({
      address: Yup.string().min(
        5,
        "Address must be at least 5 characters long"
      ),
      zip: Yup.string().matches(
        /^\d{5}(-\d{4})?$/,
        "Zip code could contain only digits. Use 00000 or 00000-0000 pattern"
      ),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(editUserAddressAct(token, values.address, values.zip));
    },
  });
  return (
    <ProfileFormsWrapper titleText="change address">
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          name="address"
          label="Address"
          type="address"
          value={formik.values.address}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          formik={formik}
          isRequired={true}
        />
        <FormControl
          name="zip"
          label="ZIP"
          type="zip"
          value={formik.values.zip}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          formik={formik}
          isRequired={true}
        />
        <Button type="submit" style="plain">
          Change address
        </Button>
      </form>
    </ProfileFormsWrapper>
  );
};

export default PrifileChangeAddress;
