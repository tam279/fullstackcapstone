/**
 * The ServicesPage component is a React component that displays information about managed IT solutions
 * and related services.
 * @returns The ServicesPage component is being returned.
 */
// Importing necessary components and styles
import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./ServicesPage.css";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";

const ServicesPage = () => {
  return (
    <div className="services-page">
      {/* Navigation component for top navigation */}
      <Navigation />
      {/* Main content container for the services page */}
      <Container className="services-content">
        {/* Main title for the services page */}
        <h1 className="services-title">Manage IT Solutions</h1>
        {/* Description of the services provided */}
        <p className="description">
          Our Managed IT Solutions offer reliable support for your business in
          the fast-paced digital world. We ensure smooth operations for your
          servers and workstations, allowing you to concentrate on your core
          functions. With our expert team managing your IT infrastructure, from
          routine maintenance to complex problem-solving, we provide proactive,
          scalable solutions that grow with your business. For more details,
          Contact Us.
        </p>
        {/* Container for info boxes detailing individual services */}
        <div className="info-container">
          {/* Info box detailing Managed IT Solutions */}
          <div className="info-box">
            <h2 className="title-inside-box">Manage IT Solutions</h2>
            <p className="text-inside-box">
              In a rapidly changing digital landscape, our Managed IT Solutions
              serve as a beacon of reliability for your business.
            </p>
          </div>
          {/* Info box detailing Backup and Disaster Recovery Planning */}
          <div className="info-box">
            <h2 className="title-inside-box">
              Backup and Disaster Recovery Planning
            </h2>
            <p className="text-inside-box">
              Data is the lifeblood of modern businesses, and its loss can have
              devastating effects.
            </p>
          </div>
          {/* Info box detailing Secure Remote Access Services */}
          <div className="info-box">
            <h2 className="title-inside-box">
              Secure Remote Access Services (SSL VPN)
            </h2>
            <p className="text-inside-box">
              In an era of remote work and global teams, secure and reliable
              access to your business network is paramount.
            </p>
          </div>
        </div>
      </Container>
      {/* Footer component for bottom navigation and information */}
      <Footer />
    </div>
  );
};

// Exporting the ServicesPage component for use in other parts of the application
export default ServicesPage;
