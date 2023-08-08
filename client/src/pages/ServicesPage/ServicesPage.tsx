import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import "./ServicesPage.css";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";

const ServicesPage = () => {
  return (
    <div className="services-page">
      <Navigation />

      <Container className="services-content">
        <h1 className="services-title">Manage IT Solutions</h1>
        <p className="description">
          Our Managed IT Solutions offer reliable support for your business in
          the fast-paced digital world. We ensure smooth operations for your
          servers and workstations, allowing you to concentrate on your core
          functions. With our expert team managing your IT infrastructure, from
          routine maintenance to complex problem-solving, we provide proactive,
          scalable solutions that grow with your business. For more details,
          Contact Us.
        </p>
        <div className="info-container">
          <div className="info-box">
            <h2 className="title-inside-box">Manage IT Solutions</h2>
            <p className="text-inside-box">
              In a rapidly changing digital landscape, our Managed IT Solutions
              serve as a beacon of reliability for your business.
            </p>
          </div>
          <div className="info-box">
            <h2 className="title-inside-box">
              Backup and Disaster Recovery Planning
            </h2>
            <p className="text-inside-box">
              Data is the lifeblood of modern businesses, and its loss can have
              devastating effects.
            </p>
          </div>
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

      <Footer />
    </div>
  );
};

export default ServicesPage;
