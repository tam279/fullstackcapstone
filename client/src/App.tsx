/* The code is a TypeScript React component that defines the main App component of a web application.
It imports necessary modules and components, such as React, Bootstrap CSS, and various pages and
components used in the application. */
// import required module and component imports
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProjectListPage from "./pages/ProjectListPage/ProjectListPage";
import ProjectDetailpage from "./pages/ProjectDetailPage/ProjectDetailpage";
import UserManagementPage from "./pages/UserManagementPage/UserManagementPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Role } from "./problemdomain/Interface/Interface";

// Main App functional component
const App: React.FC = () => {
  return (
    // Router to handle navigation and routing
    <Router>
      <div>
        {/* Routes component to define individual routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Private routes (role-based)
           User Management route only
          accessible for ADMIN role */}
          <Route
            path="/users"
            element={
              <PrivateRoute roles={[Role.ADMIN]}>
                <UserManagementPage />
              </PrivateRoute>
            }
          />
          {/* Project List page accessible for both ADMIN and USER roles */}
          <Route
            path="/projectlistpage"
            element={
              <PrivateRoute roles={[Role.ADMIN, Role.USER]}>
                <ProjectListPage />
              </PrivateRoute>
            }
          />
          {/* Project Detail page accessible for both ADMIN and USER roles */}
          <Route
            path="/project/:projectId"
            element={
              <PrivateRoute roles={[Role.ADMIN, Role.USER]}>
                <ProjectDetailpage />
              </PrivateRoute>
            }
          />{" "}
        </Routes>
      </div>
    </Router>
  );
};

// Exporting the App component for use in other parts of the application
export default App;
