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

const ProjectListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]); // Add this line to hold users
  const [companies, setCompanies] = useState<Company[]>([]); // Add this line to hold companies
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false); // Added this line
  const [editingProject, setEditingProject] = useState<Project | null>(null);
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW5hZ2VyQGNvbXBhbnkxLmNvbSIsImlhdCI6MTY4OTIyNDk5N30.W5GuZWhh3woOr87dUSk5VRz7Gy78Zt1R93OhRHC8tRE`,
        }, //TODO replace bearer with locally stored bearer
      })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        if (error.message === "Network Error" && !error.response) {
          // Show a notification to the user
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
          <div className="project-info">
            <h1 className="title">Projects List</h1>
          </div>
        </div>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>
                <Button variant="primary" onClick={handleShow}>
                  + New Project
                </Button>
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
            {projects.map((project) => (
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
                  <div onClick={() => handleProjectClick(project)}>
                    {project.name}
                  </div>
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
            show={showEdit} // Updated this line
            handleClose={handleClose}
            project={editingProject}
            refetchProjects={fetchProjects}
            users={users}
            companies={companies} // Replace roles with companies
          />
        )}
      </div>
    </div>
  );
};

export default ProjectListPage;
