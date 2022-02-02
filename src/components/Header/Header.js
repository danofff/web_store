import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../ui/Button/Button";
import { userActions } from "../../store/userState/userSlice";

import classes from "./Header.module.css";

const Header = () => {
  const { userId, isAdmin } = useSelector((state) => state.user);
  const { quantityTotal } = useSelector((state) => state.cart);


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


  return (
    <header className={classes.header}>
      <div className={classes.image}>
        <img
          src={`https://miro.medium.com/fit/c/160/160/1*NqIybBxOwC1uYDBgOp-7Sg.png`}
        />
      </div>
      <nav className={classes.navbar}>
        {/* there are things that need to be accessible to anyone and things that should
            be accessible to a specific group(aka admin, logged in user) */}
        {isAdmin && (
          <NavLink className={classes.navbar_links} to="/admin/categories">
            Categories
          </NavLink>
        )}
        {isAdmin && (
          <NavLink className={classes.navbar_links} to="/admin/orders">
            All Orders
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
        <NavLink className={classes.navbar_links} to="/cart">
          <div className={classes.cart}>
            <i className="fas fa-shopping-cart"></i>
            <span className={isCartBouncing ? classes.bouncing : ""}>
              {quantityTotal}
            </span>
          </div>
        </NavLink>
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
        {/* the following links need a ternary to prove the user is an administrator */}
        {/* <NavLink>Product Orders</NavLink>*/}
      </nav>
    </header>
  );
};

export default Header;
