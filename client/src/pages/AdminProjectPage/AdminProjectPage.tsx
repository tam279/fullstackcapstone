import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import { Button, Table, ProgressBar, Form } from 'react-bootstrap';
import './AdminProjectPage.css';
import CreateNewProjectModal from '../../modals/CreateNewProjectModal/CreateNewProjectModal';
import EditProjectModal from '../../modals/EditProjectModal/EditProjectModal';
import axios from 'axios';

interface ProjectData {
  PROJECTID: number;
  NAME: string;
  STARTDATE: string;
  ENDDATE: string;
  PROGRESS: number;
  MANAGEREMAIL: string;
  DESCRIPTION: string;
  COMPANYID: number;
  ISACTIVE: number;
}

const AdminProjectPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [show, setShow] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
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
              <th>Progress</th>
              <th>Manager email</th>
              <th>Description</th>
              <th>Company ID</th>
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
                <td>
                  <ProgressBar now={project.PROGRESS} label={`${project.PROGRESS}%`} />
                </td>
                <td>{project.MANAGEREMAIL}</td>
                <td>{project.DESCRIPTION}</td>
                <td>{project.COMPANYID}</td>
                <td>{project.ISACTIVE}</td>
                <td>{/* Filter */}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CreateNewProjectModal show={show} handleClose={handleClose} />
        <EditProjectModal
          show={editingProject !== null}
          handleClose={() => setEditingProject(null)}
          project={editingProject}
        />
      </div>
    </div>
  );
};

export default AdminProjectPage;
