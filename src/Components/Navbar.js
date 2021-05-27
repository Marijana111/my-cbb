import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import GoogleBtn from "./GoogleBtn";
import { Button } from "react-bootstrap";

export default function Navbar() {
  const { isLight, toggleTheme } = useContext(ThemeContext);
  const { isLogged } = useContext(AuthContext);

  const history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  const handleCartClick = () => {
    history.push("/cart");
  };

  return (
    <>
      <Sidebar></Sidebar>
      <nav
        className={
          isLight
            ? "navbar navbar-expand-lg navbar-light bg-secondary"
            : "navbar navbar-expand-lg navbar-dark bg-dark "
        }
      >
        <a className="navbar-brand" href="#">
          CBB Store
        </a>
        <div className="themetoggle">
          <Button id="cart" onClick={handleCartClick}>
            <i className="fas fa-cart-plus"></i>
          </Button>{" "}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleTheme}
          >
            Toggle theme
          </button>
        </div>{" "}
        {isLogged ? (
          <GoogleBtn />
        ) : (
          <button className="btn btn-primary" onClick={handleLogin}>
            <i className="fas fa-user"></i> Sign up
          </button>
        )}
      </nav>
    </>
  );
}
