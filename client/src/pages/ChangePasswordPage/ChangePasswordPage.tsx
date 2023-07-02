import React from "react";
import "./ChangePasswordPage.css";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from 'react-router-dom';  // import useNavigate

const ChangePasswordPage = () => {
  const navigate = useNavigate();  // create a navigate function

  const handleSkip = () => {
    navigate('/adminprojectpage'); // navigate to AdminProjectPage when Skip is clicked
  };

  const handleConfirm = () => {
    // Write your confirm handling logic here
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Write your upload handling logic here
  };

  return (
    <div className="page-container">
      <Navigation />
      <div className="content-wrap">
        <div className="container">
          <div className="text-center mt-5">
            <h2>Welcome, enter a new password</h2>
          </div>
          <div className="login-form mt-5">
            <form>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input type="password" className="form-control" id="currentPassword" />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input type="password" className="form-control" id="newPassword" />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" />
              </div>
              <div className="mb-3">
                <label htmlFor="profileIcon" className="form-label">Profile Icon</label>
                <input type="file" className="form-control" id="profileIcon" onChange={handleUpload} />
              </div>
              <button type="button" className="btn btn-secondary mr-3" onClick={handleSkip}>Skip</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;
