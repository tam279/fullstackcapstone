import React, { FC } from 'react';
import './Footer.css';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h1 className="footer-title">Vitra services</h1>
        <div className="footer-bottom">
          <p className="footer-copyright">© 2022 — 2023</p>
          <p className="footer-links">Privacy — Terms</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
