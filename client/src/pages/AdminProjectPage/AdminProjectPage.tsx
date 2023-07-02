import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import { Button, Table, ProgressBar, Form } from 'react-bootstrap';
import './AdminProjectPage.css';
import CreateNewProjectModal from '../../modals/CreateNewProjectModal/CreateNewProjectModal';
import EditProjectModal from '../../modals/EditProjectModal/EditProjectModal';

interface Project {
  name: string;
  progress: number;
}

const AdminProjectPage = () => {

  const projects: Project[] = [
    { name: 'Project 1', progress: 60 },
    { name: 'Project 2', progress: 30 },  
    { name: 'Project 3', progress: 80 },  
  ];

  const [show, setShow] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [sortKey, setSortKey] = useState<'name' | 'progress'>('name');
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

const sortedProjects = [...projects].sort((a, b) => {
  if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
  if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
  return 0;
});


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
              <th>    <Button variant="primary" onClick={handleShow}>
            + New Project
          </Button></th>
              <th>Name</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Deadline</th>
              <th>Company</th>
              <th>Manager</th>
              <th> <Button>Filter</Button>
</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
               <td>  <Button variant="primary" onClick={() => setEditingProject(project)}>
                    Edit
                  </Button></td>
               <td>
                  <Link to={`/project/${project.name.replace(/\s/g, '-')}`}>{project.name}</Link>
                
                </td>
                <td>
                  <Form.Control as="select">
                    <option>Good</option>
                    <option>Warning</option>
                    <option>Bad</option>
                  </Form.Control>
                </td>
                <td>
                  <ProgressBar now={project.progress} label={`${project.progress}%`} />
                </td>
                <td>
                  <Form.Control type="date" />
                </td>
                <td>
                  <Form.Control as="select">
                    {/* Replace with your actual company data */}
                    <option>Company 1</option>
                    <option>Company 2</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control as="select">
                    {/* Replace with your actual manager data */}
                    <option>Manager 1</option>
                    <option>Manager 2</option>
                  </Form.Control>
                </td>
                <td>{/* Filter */}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <CreateNewProjectModal show={show} handleClose={handleClose} />
        <EditProjectModal show={editingProject !== null} handleClose={() => setEditingProject(null)} project={editingProject} />
      </div>
    </div>
  );
};

export default AdminProjectPage;
