import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ChangePasswordPage from './pages/ChangePasswordPage/ChangePasswordPage';
import ProjectListPage from './pages/ProjectListPage/ProjectListPage';
import ProjectDetailpage from './pages/ProjectDetailPage/ProjectDetailpage';
import UserManagementPage from './pages/UserManagementPage/UserManagementPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/projectlistpage" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
