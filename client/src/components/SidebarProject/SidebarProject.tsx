/* The code you provided is a TypeScript React component called `SidebarProject`. It is a sidebar
navigation component that displays a logo, a list of projects, and various buttons for managing
users, changing password, viewing profile, and logging out. */
// Import required module and component imports
import React, { useState, useEffect } from "react";
import { Button, Navbar, Image } from "react-bootstrap";
import { FaUsers, FaCog, FaProjectDiagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ChangePasswordModal from "../../modals/ChangePasswordModal/ChangePasswordModal";
import ProfileModal from "../../modals/ProfileModal/ProfileModal";
import LogoutModal from "../../modals/LogoutModal/LogoutModal";
import { User, Role } from "../../problemdomain/Interface/Interface"; // import User type
import { fetchUserData } from "../../problemdomain/DataService/DataService"; // Import your fetch function

const SidebarProject: React.FC = () => {
  // Local state to manage user and modal visibility
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const userRole = localStorage.getItem("userRole") as Role;

  const [show, setShow] = useState<{
    [key: string]: boolean;
  }>({
    users: false,
    settings: false,
    profile: false,
    logout: false,
    project: false,
  });

  // Hook to programmatically navigate
  const navigate = useNavigate();

  // Handlers to manage modal visibility
  const handleShow = (modal: string) => {
    setShow({ ...show, [modal]: true });
  };
  const handleClose = (modal: string) => {
    setShow({ ...show, [modal]: false });
  };

  // Handlers for various sidebar actions
  const handleLogout = () => {
    navigate("/");
  };

  const handleUsersClick = () => {
    navigate("/users");
  };

  const handleProjectClick = () => {
    navigate("/projectlistpage");
  };

  const handleProfileClick = async () => {
    try {
      const users = await fetchUserData();
      const token = localStorage.getItem("jwtToken");
      let userEmail = "";
      if (token) {
        const decodedToken: any = jwt_decode(token);
        userEmail = decodedToken.sub;
      }
      const user = users.find((user: User) => user.email === userEmail);
      setCurrentUser(user);
      handleShow("profile");
    } catch (error) {
      console.error(error);
    }
  };

  // Render the sidebar component
  return (
    <Navbar
      className="d-flex flex-column px-2 py-3 bg-light vh-100"
      expand="lg"
    >
      <Navbar.Brand href="#" className="mb-3">
        <Image
          src="/vitralogo.png"
          fluid
          style={{ borderRadius: "5px", width: "150px" }}
        />
      </Navbar.Brand>

      <h5
        className="my-3"
        onClick={handleProjectClick}
        style={{ cursor: "pointer" }}
      >
        Projects List
      </h5>
      <div className="mt-auto">
        {userRole !== Role.USER && (
          <Button
            variant="link"
            className="d-flex align-items-center text-dark text-decoration-none text-left"
            onClick={handleUsersClick}
          >
            <FaUsers className="mr-2" />
            Users Management
          </Button>
        )}

        <Button
          variant="link"
          className="d-flex align-items-center text-dark text-decoration-none text-left"
          onClick={() => handleShow("settings")}
        >
          <FaCog className="mr-2" />
          Change Password
        </Button>
        <ChangePasswordModal
          show={show.settings}
          onHide={() => handleClose("settings")}
        />

        <Button
          variant="link"
          className="d-flex align-items-center text-dark text-decoration-none text-left"
          onClick={handleProfileClick}
        >
          <FaProjectDiagram className="mr-2" />
          Profile
        </Button>
        <ProfileModal
          show={show.profile}
          onHide={() => handleClose("profile")}
          user={currentUser}
        />

        <Button
          variant="link"
          className="d-flex align-items-center text-dark text-decoration-none text-left"
          onClick={() => handleShow("logout")}
        >
          Log Out
        </Button>
        <LogoutModal
          show={show.logout}
          onHide={() => handleClose("logout")}
          logout={handleLogout}
        />
      </div>
    </Navbar>
  );
};

export default SidebarProject;
