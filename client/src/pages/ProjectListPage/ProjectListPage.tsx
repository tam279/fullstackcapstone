
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import { Button, Table, ProgressBar, Form } from 'react-bootstrap';
import './ProjectListPage.css';
import CreateNewProjectModal from '../../modals/CreateNewProjectModal/CreateNewProjectModal';
// import EditProjectModal from '../../modals/EditProjectModal/EditProjectModal';
import axios from 'axios';

interface ProjectData {
  PROJECTID: number;
  NAME: string;
  STARTDATE: string;
  ENDDATE: string;
  MANAGERNAME: string;
  DESCRIPTION: string;
  COMPANYID: number;
  ISACTIVE: number;
}


interface CompanyData {
  COMPANYID: number;
  COMPANYNAME: string;
  // other company fields...
}


const AdminProjectPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [companies, setCompanies] = useState<CompanyData[]>([]); // New state for companies
  const [show, setShow] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const location = useLocation();


  useEffect(() => {
    fetchProjects();
    fetchCompanies(); // Fetch companies on component mount
  }, []);


  const fetchProjects = () => {
    axios
      .get('http://localhost:5000/api/projects')
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
      .get('http://localhost:5000/api/companies')
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
    const projectPath = `/project/${project.NAME.replace(/\s/g, '-')}`;
    window.location.href = projectPath;
  };

  return (
    <div className="AdminProjectPage">
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
                <td>
                  <Link to={`/project/${project.NAME.replace(/\s/g, '-')}`}>{project.PROJECTID}</Link>

                </td>

                <td>             <div onClick={() => handleProjectClick(project)}>{project.NAME}</div>
                </td>
                <td>{project.STARTDATE}</td>
                <td>{project.ENDDATE}</td>

                <td>{project.MANAGERNAME}</td>
                <td>{project.DESCRIPTION}</td>
                {
                  companies.find(company => company.COMPANYID === project.COMPANYID)?.COMPANYNAME || 'Unknown'
                }                <td>{project.ISACTIVE === 1 ? 'Active' : project.ISACTIVE === 0 ? 'Inactive' : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CreateNewProjectModal show={show} handleClose={handleClose} companies={companies} refetchProjects={fetchProjects} />
        {/* <EditProjectModal
          show={editingProject !== null}
          handleClose={() => setEditingProject(null)}
          project={editingProject}
        /> */}
      </div>
    </div>
  );
};

export default AdminProjectPage;
