
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import { Button, Table, ProgressBar, Form } from 'react-bootstrap';
import './ProjectListPage.css';
import CreateNewProjectModal from '../../modals/CreateNewProjectModal/CreateNewProjectModal';
import EditProjectModal from '../../modals/EditProjectModal/EditProjectModal';
import axios from 'axios';
import config from '../../config';

interface ProjectData {
  PROJECTID: number;
  NAME: string;
  STARTDATE: string;
  ENDDATE: string;
  MANAGERNAME: string;
  DESCRIPTION: string;
  STATUS: string;
  COMPANYID: number;
  ISACTIVE: number;
}


interface CompanyData {
  COMPANYID: number;
  COMPANYNAME: string;
  // other company fields...
}


const ProjectListPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [companies, setCompanies] = useState<CompanyData[]>([]); // New state for companies
  const [show, setShow] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    fetchProjects();
    fetchCompanies(); // Fetch companies on component mount
  }, []);


  const fetchProjects = () => {
    axios
      .get(`${config.backend}/api/projects`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        if (error.message === 'Network Error' && !error.response) {
          // Show a notification to the user
          console.error('Check your network connection');
        } else {
          console.error('Error:', error);
        }
      });
  };


  // New fetch function for companies
  const fetchCompanies = () => {
    axios
      .get(`${config.backend}/api/companies`)
      .then(response => {
        setCompanies(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProjectClick = (project: ProjectData) => {
    const projectPath = `/project/${project.PROJECTID}`;
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
              <th>Project ID</th>
              <th>Name</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Manager name</th>
              <th>Description</th>
              <th>Company Name</th>
              <th>Status</th>
              <th>Is Active</th>
              <th>
                <Button>Filter</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.PROJECTID}>
                <td>
                  <Button variant="primary" onClick={() => setEditingProject(project)}>
                    Edit
                  </Button>
                </td>

                <td>               <div onClick={() => handleProjectClick(project)}>{project.PROJECTID}</div>

                </td>

                <td>               <div>{project.NAME}</div>

                </td>
                <td>{project.STARTDATE}</td>
                <td>{project.ENDDATE}</td>

                <td>{project.MANAGERNAME}</td>
                <td>{project.DESCRIPTION}</td>
                {
                  companies.find(company => company.COMPANYID === project.COMPANYID)?.COMPANYNAME || 'Unknown'
                }
                <td>{project.STATUS}</td>
                <td>{project.ISACTIVE === 1 ? 'Active' : project.ISACTIVE === 0 ? 'Inactive' : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CreateNewProjectModal show={show} handleClose={handleClose} companies={companies} refetchProjects={fetchProjects} />
        <EditProjectModal
          show={editingProject !== null}
          handleClose={() => setEditingProject(null)}
          projectId={editingProject?.PROJECTID || 0} // Update prop name to projectId
          refetchProjects={fetchProjects}
          companies={companies}
        />

      </div>
    </div>
  );
};

export default ProjectListPage;