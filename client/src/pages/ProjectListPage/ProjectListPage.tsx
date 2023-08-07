import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import SidebarProject from "../../components/SidebarProject/SidebarProject";
import { Button, Table, Form } from "react-bootstrap";
import "./ProjectListPage.css";
import CreateNewProjectModal from "../../modals/CreateNewProjectModal/CreateNewProjectModal";
import EditProjectModal from "../../modals/EditProjectModal/EditProjectModal";
import axios from "axios";
import config from "../../config";
import {
  Company,
  Project,
  User,
} from "../../problemdomain/Interface/Interface";
import {
  fetchUserData,
  fetchCompanyData,
} from "../../problemdomain/DataService/DataService";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]); // Add this line to hold users
  const [companies, setCompanies] = useState<Company[]>([]); // Add this line to hold companies
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false); // Added this line
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // States for filter and sort
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]); // <-- Corrected state variable name
  const token = localStorage.getItem("jwtToken");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: any = jwt_decode(token);

      // Fetch user details using the email from the decoded token
      axios
        .get(`${config.backend}/api/user/email/${decodedToken.sub}`)
        .then((response) => {
          setCurrentUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  useEffect(() => {
    const filteredProjects = projects
      .filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortKey) {
          case "name":
            return a.name.localeCompare(b.name);
          case "startDate":
            return (
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            );
          // Add similar cases for other properties
          default:
            return 0;
        }
      });

    setDisplayedProjects(filteredProjects); // <-- Use setDisplayedProjects instead of setFilteredProjects
  }, [searchTerm, sortKey, projects]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      setCurrentUser(decodedToken.user);
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchCompanies();
  }, []);

  const fetchProjects = () => {
    axios
      .get(`${config.backend}/api/projects`, {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then((response) => {
        console.log("API response:", response.data);
        setProjects(response.data);
      })
      .catch((error) => {
        if (error.message === "Network Error" && !error.response) {
          console.error("Check your network connection");
        } else {
          console.error("Error:", error);
        }
      });
  };
  const fetchUsers = async () => {
    const fetchedUsers = await fetchUserData();
    setUsers(fetchedUsers);
  };

  const fetchCompanies = async () => {
    const fetchedCompanies = await fetchCompanyData();
    setCompanies(fetchedCompanies);
  };

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  }; // Updated this line
  const handleShow = () => setShow(true);

  const handleProjectClick = (project: Project) => {
    const projectPath = `/project/${project.id}`;
    navigate(projectPath);
  };

  return (
    <div className="ProjectListPage">
      <div className="sidebar-container">
        <SidebarProject />
      </div>

      <div className="projects">
        <div className="project-header d-flex justify-content-between">
          <div className="left-section">
            <h1 className="title">Projects List</h1>

            {/* Filtering and sorting section */}
            <div className="filter-sort d-flex">
              <Form.Control
                type="text"
                placeholder="Filter projects"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mr-2"
              />
              <Form.Control
                as="select"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="startDate">Start Date</option>
                <option value="endDate">End Date</option>
                <option value="managerName">Manager Name</option>
                <option value="description">Description</option>
                <option value="companyName">Company Name</option>
                <option value="status">Status</option>
              </Form.Control>
            </div>
          </div>

          {currentUser && (
            <div className="user-info ml-auto">
              <h3>
                Logged in as: {currentUser.firstName} {currentUser.lastName} -
                Role: {currentUser.role}
              </h3>
            </div>
          )}
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>
                {/* {currentUser && currentUser.role === "ADMIN" && ( */}
                <Button variant="primary" onClick={handleShow}>
                  + New Project
                </Button>
                {/* )} */}
              </th>

              <th>Name</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Manager name</th>
              <th>Description</th>
              <th>Company Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditingProject(project);
                      setShowEdit(true);
                    }}
                  >
                    Edit{" "}
                  </Button>
                </td>
                <td>
                  <Link to={`/project/${project.id}`}>{project.name}</Link>
                </td>
                <td>{new Date(project.startDate).toLocaleDateString()}</td>
                <td>{new Date(project.endDate).toLocaleDateString()}</td>
                <td>
                  {project.manager.firstName} {project.manager.lastName}
                </td>
                <td>{project.description}</td>
                <td>{project.company.name}</td>
                <td>{project.deleted ? "Deleted" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CreateNewProjectModal
          show={show}
          handleClose={handleClose}
          refetchProjects={fetchProjects}
          companies={[]}
        />

        {editingProject && (
          <EditProjectModal
            show={showEdit}
            handleClose={handleClose}
            project={editingProject}
            refetchProjects={fetchProjects}
            users={users}
            companies={companies}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectListPage;
