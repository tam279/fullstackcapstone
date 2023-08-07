import React, { useState, FormEvent, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";
import "./LoginPage.css";
import config from "../../config";
import NewPasswordModal from "../../modals/NewPasswordModal";

interface User {
  companyId: string;
  email: string;
  firstName: string;
  id: string;
  jobTitle: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  tags: string;
  token: string;
}
const LoginPage = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<User | null>(null); // Use the User interface
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Extract the magic link token from the URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    // If the token exists, send a GET request to the backend for verification
    if (token) {
      console.log(token);
      axios
        .get(`${config.backend}/login/email/verify?token=${token}`)
        .then((response) => {
          // Token verification successful
          const userData = response.data.user;
          // Now you can use the user data as needed (e.g., log the user in, store user data in state, etc.)
          console.log("User data:", userData);
          if (userData) {
            setUser(userData);
            setShowModal(true); // Show the modal when we have user data
          }
          // For example, you can redirect the user to the dashboard after successful login
          // navigate("/dashboard");
        })
        .catch((error) => {
          // Token verification failed or invalid token
          console.error("Error:", error.response.data.error);

          // Redirect the user to the login page or display an error message
          // navigate("/login");
        });
    }
  }, [navigate, location.search]);

  const handleForgotPassword = async () => {
    // Send the email to the backend API for password reset
    try {
      await axios.post(`${config.backend}/forgotpassword`, {
        email: resetEmail,
      });
      alert("Password reset email sent. Check your inbox for instructions.");
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "An error occurred while sending the password reset email."
      );
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.backend}/api/login`, {
        email,
        password,
      });

      // Assuming the server responds with a JWT token, role, and id
      const {
        token,
        user: { role, id },
      } = response.data;

      // Store the JWT token, role, and id in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userId", id);

      // Include the user's role and id in the request headers for subsequent API calls
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["User-Id"] = id;
      axios.defaults.headers.common["User-Role"] = role;

      // Redirect to the ProjectListPage or any other desired page
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
            <div className="forgot-password-container">
              <h5 className="text-center">Forgot your password?</h5>
              <form onSubmit={handleForgotPassword}>
                <div className="mb-3">
                  <label htmlFor="resetEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="resetEmail"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-link">
                  Reset Password
                </button>
              </form>
            </div>
            {/* <div className="text-center mt-3">
              <p>Or log in with:</p>
              <button className="btn btn-secondary me-2">Microsoft</button>
              <button className="btn btn-secondary">Google</button>
            </div> */}
            {/* Implement forgot your password */}
          </div>
        </div>
      </div>

      <NewPasswordModal
        show={showModal}
        userId={user?.id || null}
        token={user?.token || null}
      />

      <Footer />
    </div>
  );
};

export default LoginPage;
