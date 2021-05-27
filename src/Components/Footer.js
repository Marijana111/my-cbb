import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Footer() {
  const { isLight } = useContext(ThemeContext);
  return (
    <footer
      className="footer bg-dark"
      className={isLight ? "footer bg-secondary" : "footer bg-dark"}
    >
      <div className="container text-center">
        <span className="text-white">
          &copy; Combis {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
