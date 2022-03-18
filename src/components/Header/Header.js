import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../ui/Button/Button";
import { userActions } from "../../store/userState/userSlice";
import { uiActions } from "../../store/uiState/uiSlice";

import classes from "./Header.module.css";
import mainLogo from "./logo.png";

const Header = () => {
  const { userId, isAdmin } = useSelector((state) => state.user);
  const { quantityTotal } = useSelector((state) => state.cart);
  const { mobileMenuIsActive } = useSelector((state) => state.ui);

  const [isCartBouncing, setIsCartBouncing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsCartBouncing(true);
    const timer = setTimeout(() => {
      setIsCartBouncing(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [quantityTotal]);

  const onLogoutHandler = (event) => {
    dispatch(userActions.logoutUser());
  };

  const handleHamburgerClick = (event) => {
    dispatch(uiActions.setMobile(!mobileMenuIsActive));
  };

  return (
    <header className={classes.header}>
      <Link to="/products">
        <div className={classes.image}>
          <img src={mainLogo} />
          <span>Data-Ts</span>
        </div>
      </Link>
      <nav className={classes.navbar}>
        <div className={classes.navbar_routes}>
          {/* there are things that need to be accessible to anyone and things that should
            be accessible to a specific group(aka admin, logged in user) */}
          {isAdmin && (
            <NavLink className={classes.navbar_links} to="/admin">
              Admin
            </NavLink>
          )}
          <NavLink className={classes.navbar_links} to="/products">
            Products
          </NavLink>
          {!userId && (
            <NavLink className={classes.navbar_links} to="/login">
              Login
            </NavLink>
          )}
          {!userId && (
            <NavLink className={classes.navbar_links} to="/signup">
              Signup
            </NavLink>
          )}
          {userId && (
            <NavLink className={classes.navbar_links} to="/orders">
              Orders
            </NavLink>
          )}
          {userId && (
            <NavLink className={classes.navbar_links} to="/profile">
              Profile
            </NavLink>
          )}
        </div>
        <NavLink className={classes.navbar_links} to="/cart">
          <div className={classes.cart}>
            <i className="fas fa-shopping-cart"></i>
            <span className={isCartBouncing ? classes.bouncing : ""}>
              {quantityTotal}
            </span>
          </div>
        </NavLink>
        <div
          className={`${classes.hamburger} ${
            mobileMenuIsActive ? classes.active : ""
          }`}
          onClick={handleHamburgerClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        {userId && (
          <div className={classes.logout}>
            <Button
              type="button"
              style="outlined"
              size="medium"
              onClickHandler={onLogoutHandler}
            >
              Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
