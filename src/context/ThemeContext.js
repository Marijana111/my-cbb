import React, { createContext, useState } from "react";

export const ThemeContext = createContext();
const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState({ isLight: false });

  const toggleTheme = () => {
    setTheme({ isLight: !theme.isLight });
    let element = document.getElementById("root");
    element.classList.toggle("root");
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
