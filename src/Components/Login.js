import React from "react";
import GoogleBtn from "./GoogleBtn";

export default function Login() {
  return (
    <div className="container">
      <div className="login text-center">
        <h2>CBB Store - Login</h2>
        <h5>Sign in with your Google account</h5>
        <GoogleBtn></GoogleBtn>
      </div>
    </div>
  );
}
