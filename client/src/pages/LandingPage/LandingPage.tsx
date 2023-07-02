import React from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Container from 'react-bootstrap/Container';
import './LandingPage.css';
import Footer from '../../components/Footer/Footer';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Navigation />
      <Container className="container-custom">
        <div className="left-container">
          <div className="text-container">
            <div className="title-custom">Let us handle your IT challenges.</div>
            <div className="description-custom">
              In a rapidly changing digital landscape, our Managed IT Solutions serve as a beacon of reliability for your business.
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="logo-welcome-container">
            <img id='biglogo' src="/vitralogo.png" alt="Vitra Logo" className="logo-custom" />
            <div className="welcome-custom">
              <h2>Welcome!</h2>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default LandingPage;
