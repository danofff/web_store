import React from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { uiActions } from "../../../store/uiState/uiSlice";
import { userActions } from "../../../store/userState/userSlice";
import Button from "../Button/Button";

import classes from "./MobileNav.module.css";

const MobileNav = (props) => {
  const { mobileMenuIsActive } = useSelector((state) => state.ui);
  const { userId, isAdmin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onBackdropClick = (event) => {
    dispatch(uiActions.setMobile(false));
  };
  const onLogoutHandler = (event) => {
    dispatch(userActions.logoutUser());
    dispatch(uiActions.setMobile(false));
  };

  const onNavItemClick = (event) => {
    dispatch(uiActions.setMobile(false));
  };

  return createPortal(
    <div
      className={`${classes.container} ${
        mobileMenuIsActive ? classes.active : ""
      }`}
    >
      <nav className={classes.navigation}>
        <ul className={classes.navigation__items}>
          <div className={classes.navigation__routes}>
            {/* there are things that need to be accessible to anyone and things that should
            be accessible to a specific group(aka admin, logged in user) */}
            {isAdmin && (
              <li className={classes.navigation__item} onClick={onNavItemClick}>
                <NavLink className={classes.navbar_links} to="/admin">
                  Admin
                </NavLink>
              </li>
            )}
            <li className={classes.navigation__item} onClick={onNavItemClick}>
              <NavLink className={classes.navbar_links} to="/products">
                Products
              </NavLink>
            </li>
            {!userId && (
              <li className={classes.navigation__item} onClick={onNavItemClick}>
                <NavLink className={classes.navbar_links} to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {!userId && (
              <li className={classes.navigation__item} onClick={onNavItemClick}>
                <NavLink className={classes.navbar_links} to="/signup">
                  Signup
                </NavLink>
              </li>
            )}
            {userId && (
              <li className={classes.navigation__item} onClick={onNavItemClick}>
                <NavLink className={classes.navbar_links} to="/orders">
                  Orders
                </NavLink>
              </li>
            )}
            {userId && (
              <li className={classes.navigation__item} onClick={onNavItemClick}>
                <NavLink className={classes.navbar_links} to="/profile">
                  Profile
                </NavLink>
              </li>
            )}
          </div>
          {userId && (
            <div className={classes.logout}>
              <Button
                type="button"
                style="plain"
                size="medium"
                onClickHandler={onLogoutHandler}
              >
                Logout
              </Button>
            </div>
          )}
        </ul>
        <button className={classes.navigation__close}></button>
      </nav>
      <div className={classes.backdrop} onClick={onBackdropClick}></div>
    </div>,
    document.getElementById("mobile-menu")
  );
};

export default MobileNav;
