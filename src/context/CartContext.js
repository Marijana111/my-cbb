import React, { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([{}]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
