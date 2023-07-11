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
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [show, setShow] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [filterDate, setFilterDate] = useState<string>(''); // Filter for the ENDDATE
  const [filterStatus, setFilterStatus] = useState<string>(''); // Filter for the STATUS
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
    fetchCompanies();
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

  const displayedProjects = projects
    .filter(project => {
      return (!filterDate || new Date(project.ENDDATE) > new Date(filterDate)) &&
        (!filterStatus || project.STATUS === filterStatus);
    })
    .sort((a, b) => a.NAME.localeCompare(b.NAME));

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
              <th>
                End date
                <Form.Control
                  type="date"
                  placeholder="Filter by end date"
                  value={filterDate}
                  onChange={e => setFilterDate(e.target.value)}
                />
              </th>
              <th>Manager name</th>
              <th>Description</th>
              <th>Company Name</th>
              <th>
                Status
                <Form.Control
                  as="select"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                >
                  <option value="">Filter by status...</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In process">In Process</option>
                  <option value="Completed">Completed</option>
                  {/* Add more status options here... */}
                </Form.Control>
              </th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.map(project => (
              <tr key={project.PROJECTID}>
                <td>
                  <Button variant="primary" onClick={() => setEditingProject(project)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <div onClick={() => handleProjectClick(project)}>{project.PROJECTID}</div>
                </td>
                <td>
                  <div>{project.NAME}</div>
                </td>
                <td>{new Date(project.STARTDATE).toLocaleDateString()}</td>
                <td>{new Date(project.ENDDATE).toLocaleDateString()}</td>
                <td>{project.MANAGERNAME}</td>
                <td>{project.DESCRIPTION}</td>
                <td>
                  {companies.find(company => company.COMPANYID === project.COMPANYID)?.COMPANYNAME || 'Unknown'}
                </td>
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