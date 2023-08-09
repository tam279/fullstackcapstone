/**
 * The `Footer` component is a functional component in TypeScript React that renders a footer with a
 * title, copyright information, and links.
 * @returns The `Footer` component is returning a JSX element representing the footer section of a
 * website.
 */
import React, { FC } from "react";
import "./Footer.css";

/**
 * The `Footer` component is a functional component in TypeScript React that renders a footer with a
 * title, copyright information, and links.
 * @returns The Footer component is returning a JSX element representing the footer section of a
 * website.
 */
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
};

export default Footer;
