// Import necessary modules and components
import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import Container from "react-bootstrap/Container";
import "./LandingPage.css";
import Footer from "../../components/Footer/Footer";

// LandingPage functional component
const LandingPage: React.FC = () => {
  return (
    // Main page wrapper
    <div className="page-wrapper">
      {/* Navigation bar component at the top */}
      <Navigation />
      {/* Wrapper for main content */}
      <div className="content-wrapper">
        {/* Container component from Bootstrap to ensure responsive design */}
        <Container className="container-custom">
          {/* Left container: Primarily for textual content */}
          <div className="left-container">
            {/* Contains title and description text */}
            <div className="text-container">
              {/* Main title text */}
              <div className="title-custom">
                Let us handle your IT challenges.
              </div>
              {/* Description text */}
              <div className="description-custom">
                In a rapidly changing digital landscape, our Managed IT
                Solutions serve as a beacon of reliability for your business.
              </div>
            </div>
          </div>
          {/* Right container: Primarily for visual (e.g., logo) content */}
          <div className="right-container">
            {/* Container for the logo and welcome text (if any) */}
            <div className="logo-welcome-container">
              {/* Logo image */}
              <img
                id="biglogo"
                src="/vitralogo.png"
                alt="Vitra Logo"
                className="logo-custom"
              />
            </div>
          </div>
        </Container>
      </div>
      {/* Footer component at the bottom */}
      <Footer />
    </div>
  );
};

// Exporting the LandingPage component for use in other parts of the application
export default LandingPage;
