import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import './LoginPage.css';

const LoginPage = () => {
  let navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    navigate('/ChangePasswordPage');
  };

  const handleForgotPassword = () => {
    navigate('/ForgotPasswordPage');
  };

  return (
    <div className="page-container">
      <Navigation />

      <div className="content-wrap">
        <div className="container">
          <div className="text-center mt-5">
            <img src="/vitralogo.png" alt="Vitra Logo" className="logo-custom-login" />
            <h2>Welcome!</h2>
          </div>

          <div className="login-form mt-5">
            <h3 className="text-center">Log in to Vitra Services</h3>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" />
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>

              <button type="submit" className="btn btn-primary">Log in</button>
            </form>

            <div className="text-center mt-3">
              <p>Or log in with:</p>
              <button className="btn btn-secondary me-2">Microsoft</button>
              <button className="btn btn-secondary">Google</button>
            </div>
            {/* Implement forgot your password */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
