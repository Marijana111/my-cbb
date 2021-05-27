import React, { useState, useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CLIENT_ID =
  "323514883563-5uh8pt38sbquutsrflivg70adksgoh0o.apps.googleusercontent.com";

const GoogleBtn = () => {
  const [accessToken, setAccessToken] = useState("");
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const login = (response) => {
    if (response.accessToken) {
      setAccessToken(response.accessToken);
      setIsLogged(true);
    }
  };

  const logout = (response) => {
    setAccessToken("");
    setIsLogged(false);
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  return (
    <div>
      {isLogged ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Login"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
      {accessToken ? (
        <h5 className="text-center">
          Uspješno ste se prijavili u sustav! Idi na{" "}
          <Link to="/">naslovnicu</Link>.
        </h5>
      ) : null}
    </div>
  );
};

export default GoogleBtn;
