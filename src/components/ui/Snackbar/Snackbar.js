import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiState/uiSlice";
import Container from "../Container/Container";

import classes from "./Snackbar.module.css";

const Snackbar = (props) => {
  const snackbar = useSelector((state) => state.ui.snackbar);
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    if (snackbar.isActive) {
      timer = setTimeout(() => {
        dispatch(
          uiActions.setSnackbar({
            type: snackbar.type,
            text: "",
            isActive: false,
          })
        );
      }, 6000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [snackbar]);

  const onCloseHandler = (event) => {
    dispatch(
      uiActions.setSnackbar({
        type: snackbar.type,
        text: "",
        isActive: false,
      })
    );
  };
  return (
    <div
      className={`${classes.main} ${classes[snackbar.type]} ${
        snackbar.isActive ? classes.active : ""
      }`}
    >
      <Container>
        <div className={`${classes.snackbar}`}>
          <span className={classes.text}>{snackbar.text}</span>
          <span className={classes.close_btn} onClick={onCloseHandler}>
            X
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Snackbar;
