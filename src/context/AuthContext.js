import React, { createContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
