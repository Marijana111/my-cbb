import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLogged } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
export default PrivateRoute;
