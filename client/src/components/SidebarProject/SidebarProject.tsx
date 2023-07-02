import React, { useState } from 'react';
import { Button, Navbar, Image } from 'react-bootstrap';
import { FaUsers, FaCog, FaProjectDiagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SettingsModal from '../../modals/SettingsModal/SettingsModal';
import ProfileModal from '../../modals/ProfileModal/ProfileModal';
import LogoutModal from '../../modals/LogoutModal/LogoutModal';

const SidebarProject: React.FC = () => {
  const [show, setShow] = useState<{
    [key: string]: boolean;
  }>({
    users: false,
    settings: false,
    profile: false,
    logout: false,
    project: false,
  });

  const navigate = useNavigate();

  const handleShow = (modal: string) => {
    setShow({ ...show, [modal]: true });
  };

  const handleClose = (modal: string) => {
    setShow({ ...show, [modal]: false });
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleUsersClick = () => {
    navigate('/users');
  };

  const handleProjectClick = () => {
    navigate('/adminprojectpage');
  };

  return (
    <Navbar className="d-flex flex-column px-2 py-3 bg-light vh-100" expand="lg">
      <Navbar.Brand href="#" className="mb-3">
        <Image src="/vitralogo.png" fluid />
      </Navbar.Brand>

      <h5 className="my-3" onClick={handleProjectClick} style={{ cursor: 'pointer' }}>
        Projects List
      </h5>
      <div className="mt-auto">
        <Button variant="link" className="d-flex align-items-center text-dark text-decoration-none text-left" onClick={handleUsersClick}>
          <FaUsers className="mr-2" />
          Users Management
        </Button>

        <Button variant="link" className="d-flex align-items-center text-dark text-decoration-none text-left" onClick={() => handleShow('settings')}>
          <FaCog className="mr-2" />
          Settings
        </Button>
        <SettingsModal show={show.settings} onHide={() => handleClose('settings')} />

        <Button variant="link" className="d-flex align-items-center text-dark text-decoration-none text-left" onClick={() => handleShow('profile')}>
          <FaProjectDiagram className="mr-2" />
          Profile
        </Button>
        <ProfileModal show={show.profile} onHide={() => handleClose('profile')} />

        <Button variant="link" className="d-flex align-items-center text-dark text-decoration-none text-left" onClick={() => handleShow('logout')}>
          Log Out
        </Button>
        <LogoutModal show={show.logout} onHide={() => handleClose('logout')} logout={handleLogout} />
      </div>
    </Navbar>
  );
};

export default SidebarProject;
