import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, FormControl } from 'react-bootstrap';
import axios from 'axios';
import  config from '../../config';
interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  TAG: string;
  COMPANYNAME: string;
  ROLENAME: string;
  METHODNAME: string;
  PHONE_NUMBER: string;
  JOB_TITLE: string;
  ISACTIVE: number;
}
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

interface EditProjectModalProps {
  show: boolean;
  handleClose: () => void;
  projectId: number;
  refetchProjects: () => void;
  companies: CompanyData[];
}

const EditProjectModal: FC<EditProjectModalProps> = ({ show, handleClose, projectId, refetchProjects, companies }) => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [managerName, setManagerName] = useState("");
  const [technicians, setTechnicians] = useState<string[]>([]);
  const [viewers, setViewers] = useState<string[]>([]);
  const [companyID, setCompanyID] = useState<number | "">("");
  const [status, setStatus] = useState("");
  const [isActive, setIsActive] = useState("");
  const [managers, setManagers] = useState<string[]>([]);
  const [allTechnicians, setAllTechnicians] = useState<string[]>([]);
  const [allViewers, setAllViewers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [description, setDescription] = useState<string>("");


  useEffect(() => {
    fetchProject();
  }, [projectId]);




  const fetchProject = async () => {
    try {
      console.log("fetchProject called with projectId:", projectId);
      const response = await axios.get(`${config.backend}/api/project/${projectId}`);
      const projectData = response.data;
      console.log("projectData:", projectData);
      setProject(projectData);
      setName(projectData.NAME);

      // Ensure date is in the format 'YYYY-MM-DD'
      const startDate = new Date(projectData.STARTDATE);
      setStartDate(`${startDate.getFullYear()}-${("0" + (startDate.getMonth() + 1)).slice(-2)}-${("0" + startDate.getDate()).slice(-2)}`);
      console.log("startDate:", startDate);

      // Same for endDate
      const endDate = new Date(projectData.ENDDATE);
      setEndDate(`${endDate.getFullYear()}-${("0" + (endDate.getMonth() + 1)).slice(-2)}-${("0" + endDate.getDate()).slice(-2)}`);

      // Check if the data is an array and it's not empty before setting it
      if (Array.isArray(projectData.manager) && projectData.manager.length > 0) {
        setManagerName(projectData.manager[0].MANAGEREMAIL);
      }
      if (Array.isArray(projectData.technicians) && projectData.technicians.length > 0) {
        setTechnicians(projectData.technicians.map((technician: any) => technician.TECHNICIANEMAIL));
      }
      if (Array.isArray(projectData.viewers) && projectData.viewers.length > 0) {
        setViewers(projectData.viewers.map((viewer: any) => viewer.VIEWEREMAIL));
      }

      setCompanyID(projectData.COMPANYID);
      setStatus(projectData.STATUS);
      setIsActive(projectData.ISACTIVE.toString());

      // Add this line to set the description state
      setDescription(projectData.DESCRIPTION);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  // Add another useEffect to observe the change of managerName
  useEffect(() => {
    console.log("Managername:", managerName);
  }, [managerName]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.backend}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const handleUpdate = async () => {
    try {
      const PROGRESS = 0; // You might need to replace this with real progress data
      const DESCRIPTION = ""; // You might need to replace this with real description data

      await axios.put(`${config.backend}/api/updateProject/${projectId}`, {
        NAME: name,
        STARTDATE: startDate,
        ENDDATE: endDate,
        PROGRESS,
        STATUS: status,
        DESCRIPTION: description,
        COMPANYID: companyID,
        MANAGEREMAIL: managerName, // managerName is considered as MANAGEREMAIL here.
        TECHNICIANEMAILS: technicians, // add technicians' emails here
        VIEWEREMAILS: viewers, // add viewers' emails here if needed
      });
      handleClose();
      refetchProjects();
    } catch (error) {
      console.error("Error:", error);
    }
  };




  const handleDelete = async () => {
    try {
      await axios.delete(`${config.backend}/api/deleteProject/${projectId}`);
      handleClose();
      refetchProjects();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleSelectChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setTechnicians(Array.from(target.selectedOptions, option => option.value));
  }


  const handleMultipleSelectChange = (setState: React.Dispatch<React.SetStateAction<string[]>>) => (
    e: ChangeEvent<unknown>
  ) => {
    const target = e.target as HTMLSelectElement;
    setState(Array.from(target.selectedOptions, (option) => option.value));
  };

  const handleActivate = async () => {
    try {
      await axios.put(`${config.backend}/api/activateProject/${projectId}`);
      handleClose();
      refetchProjects();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeactivate = async () => {
    try {
      await axios.put(`${config.backend}/api/deactivateProject/${projectId}`);
      handleClose();
      refetchProjects();
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {project ? (
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Manager Name</Form.Label>
                  <Form.Control as="select" value={managerName} onChange={(e) => setManagerName(e.target.value)}>
                    <option>Select a Manager</option>
                    {
                      users.filter(user => user.ROLENAME === 'Manager').map(manager =>
                        <option key={manager.EMAIL} value={manager.EMAIL}>
                          {manager.FIRSTNAME} {manager.LASTNAME}
                        </option>

                      )
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Technician Name</Form.Label>
                  <Form.Control as="select" multiple value={technicians} onChange={handleMultipleSelectChange(setTechnicians)}>
                    {
                      users.filter(user => user.ROLENAME === 'Technician').map(technician =>
                        <option key={technician.EMAIL} value={technician.EMAIL}>
                          {technician.EMAIL}
                        </option>
                      )
                    }
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Viewer Name</Form.Label>
                  <Form.Control as="select" multiple value={viewers} onChange={handleMultipleSelectChange(setViewers)}>
                    {
                      users.filter(user => user.ROLENAME === 'Viewer').map(viewer =>
                        <option key={viewer.EMAIL} value={viewer.EMAIL}>
                          {viewer.EMAIL}
                        </option>
                      )
                    }
                  </Form.Control>
                </Form.Group>

              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Company</Form.Label>
                  <Form.Control as="select" value={companyID} onChange={(e) => setCompanyID(Number(e.target.value))}>
                    <option value="">Select a Company</option>
                    {companies.map((company) => (
                      <option
                        key={company.COMPANYID}
                        value={company.COMPANYID.toString()}
                      >
                        {company.COMPANYNAME}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>


                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value as string)}>
                    <option value="">Select Status</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Is Active</Form.Label>
                  <Form.Control as="select" value={isActive} onChange={(e) => setIsActive(e.target.value as string)}>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        ) : (
          <p>Loading project data...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="success" onClick={handleActivate}>
          Activate
        </Button>
        <Button variant="warning" onClick={handleDeactivate}>
          Deactivate
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
