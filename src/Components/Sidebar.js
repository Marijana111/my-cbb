import React, { useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    let element = document.getElementsByClassName("bm-overlay")[0];
    if (!element.style.transform) {
      element.click();
    }
  }, [location]);
  return (
    <Menu>
      <Link to="/home" id="home" className="menu-item">
        Home
      </Link>
      <Link to="/products" id="products" className="menu-item">
        Products
      </Link>
      <Link to="/customers" id="customers" className="menu-item">
        Customers
      </Link>
      <Link to="/categories" id="categories" className="menu-item">
        Categories
      </Link>
      <Link to="/brands" id="brands" className="menu-item">
        Brands
      </Link>
      <Link to="/contact" id="contact" className="menu-item">
        Contact
      </Link>
    </Menu>
  );
};

export default Sidebar;
