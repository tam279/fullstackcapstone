import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import "./LoginPage.css";
import config from "../../config";

const LoginPage = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backend}/api/login`, {
        email,
        password,
      });

      // Assuming the server responds with a JWT token and role
      const {
        token,
        user: { role, id },
      } = response.data;


      // console.log(response.data);
      // Store the JWT token and role in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", id);
      localStorage.setItem("userId", id);

      // Redirect to the ChangePasswordPage or any other desired page
      navigate("/projectlistpage");
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  // const handleLogin = (e: FormEvent) => {
  //   e.preventDefault();
  //   navigate('/ChangePasswordPage');
  // };

  // const handleForgotPassword = () => {
  //   navigate('/ForgotPasswordPage');
  // };

  return (
    <div className="page-container">
      <Navigation />

      <div className="content-wrap">
        <div className="container">
          <div className="text-center mt-5">
            <img
              src="/vitralogo.png"
              alt="Vitra Logo"
              className="logo-custom-login"
            />
            <h2>Welcome!</h2>
          </div>

          <div className="login-form mt-5">
            <h3 className="text-center">Log in to Vitra Services</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email} // Bind the value to the email state variable
                  onChange={(e) => setEmail(e.target.value)} // Update the email state variable on input change
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password} // Bind the value to the password state variable
                  onChange={(e) => setPassword(e.target.value)} // Update the password state variable on input change
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </form>

            {/* <div className="text-center mt-3">
              <p>Or log in with:</p>
              <button className="btn btn-secondary me-2">Microsoft</button>
              <button className="btn btn-secondary">Google</button>
            </div> */}
            {/* Implement forgot your password */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
