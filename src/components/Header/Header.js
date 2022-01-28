import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.module.css";
import { useSelector } from "react-redux";

const Header = () => {
  const {userId, isAdmin} = useSelector((state) => state.user)

  return (
    <nav>
      <div>
        <Logo />
        {/* need to import a logo to a file called Logo */}
      </div>
      <div>
        {/* there are things that need to be accessible to anyone and things that should
            be accessible to a specific group(aka admin, logged in user) */}
        <NavLink to="/products" >Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/">Login</NavLink>
        <NavLink to="/signup">SignUp</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        {userId && <NavLink to="/orders">Orders</NavLink>}
        {isAdmin && <NavLink to="/categories">Categories</NavLink>}
        {isAdmin && <NavLink to="/allorders">All Orders</NavLink>}
        {/* the following links need a ternary to prove the user is an administrator */}
        {/* <NavLink>Product Orders</NavLink> */}
      </div>
    </nav>
  );
};

export default Header;
