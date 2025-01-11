import React, { useState } from "react";
import "../Login/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Handle the login form submission
  async function handleLoginForm(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      console.log(response);

      // Extract role and token from the response
      const role =
        response.data.employee?.role?.[0]?.roleName ||
        response.data.admin?.role?.[0]?.roleName ||
        response.data.appUser?.role?.[0]?.roleName;
      const token = response.data.jwtToken;

      console.log("Token:", token);
      console.log("Role:", role);

      // If role and token exist, store them in localStorage
      if (role && token) {
        const roleJwt = {
          role,
          token,
        };
        localStorage.setItem("employeROyalmadeLogin", JSON.stringify(roleJwt));

        if (response.status === 200) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }


  return (
    <>
      <div className="login_container">
        <div className="login_heading">Sign In</div>
        <form className="login_form" onSubmit={handleLoginForm}>
          <input
            required
            className="login_input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            required
            className="login_input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <input className="login-button" type="submit" value="Log In" />
        </form>
      </div>
    </>
  );
}

export default Login;
