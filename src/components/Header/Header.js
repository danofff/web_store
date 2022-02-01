import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const { userId, isAdmin } = useSelector((state) => state.user);
  console.log(classes);
  console.log("Im here");
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

        <NavLink className={classes.navbar_links} to="/products">
          Home
        </NavLink>
        <NavLink className={classes.navbar_links} to="/products">
          Products
        </NavLink>
        <NavLink className={classes.navbar_links} to="/">
          Login
        </NavLink>
        <NavLink className={classes.navbar_links} to="/signup">
          SignUp
        </NavLink>
        <NavLink className={classes.navbar_links} to="/cart">
          Cart
        </NavLink>
        {userId && (
          <NavLink className={classes.navbar_links} to="/orders">
            Orders
          </NavLink>
        )}
        {/* {isAdmin && (
          <NavLink className={classes.navbar_links} to="/categories">
            Categories
          </NavLink>
        )}
        {isAdmin && (
          <NavLink className={classes.navbar_links} to="/allorders">
            All Orders
          </NavLink>
        )} */}
// =======
//         <NavLink to="/products">Home</NavLink>
//         <NavLink to="/products">Products</NavLink>
//         <NavLink to="/login">Login</NavLink>
//         <NavLink to="/signup">SignUp</NavLink>
//         <NavLink to="/cart">Cart</NavLink>
//         {userId && <NavLink to="/orders">Orders</NavLink>}
//         {isAdmin && <NavLink to="/categories">Categories</NavLink>}
//         {isAdmin && <NavLink to="/allorders">All Orders</NavLink>}
// >>>>>>> master
        {/* the following links need a ternary to prove the user is an administrator */}
        {/* <NavLink>Product Orders</NavLink> */}
      </nav>
    </header>
  );
};

export default Header;
