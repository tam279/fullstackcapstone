import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';
interface UserData {
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

interface CompanyData {
  COMPANYID: number;
  COMPANYNAME: string;
}

interface CreateNewProjectModalProps {
  show: boolean;
  handleClose: () => void;
  companies: CompanyData[];
  refetchProjects: () => void;
}

const CreateNewProjectModal: React.FC<CreateNewProjectModalProps> = ({
  show,
  handleClose,
  companies,
  refetchProjects
}) => {
  const [name, setName] = useState("");
  const [managerName, setManagerName] = useState("Select a Manager");
  const [technicians, setTechnicians] = useState<string[]>([]);
  const [viewers, setViewers] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [companyName, setCompanyName] = useState("");

  const isManagerSelected = managerName !== "Select a Manager";

  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get(`${config.backend}/api/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

  const handleCompanyChange = (e: ChangeEvent<FormControlElement>) => {
    const selectedCompanyID = e.target.value;
    const selectedCompany = companies.find(
      (company) => company.COMPANYID === parseInt(selectedCompanyID, 10)
    );

    if (selectedCompany) {
      setCompanyID(selectedCompanyID);
      setCompanyName(selectedCompany.COMPANYNAME);
    }
  };



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedManager = users.find(
      (user) => `${user.FIRSTNAME} ${user.LASTNAME}` === managerName
    );

    if (!selectedManager) {
      alert("Please select a manager before submitting");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createProject",
        {
          NAME: name,
          STARTDATE: startDate,
          ENDDATE: endDate,
          STATUS: status || "Not Started", // Use 'Not Started' if status is empty
          MANAGEREMAIL: selectedManager.EMAIL,
          TECHNICIANEMAILS: technicians,
          VIEWEREMAILS: viewers,
          DESCRIPTION: description,
          COMPANYID: companyID
        },
        {
          withCredentials: true
        }
      );

      handleClose();
      refetchProjects();
    } catch (err) {
      console.error(err);
    }
  };




  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter project description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Manager Name</Form.Label>
                <Form.Control as="select" value={managerName} onChange={(e) => setManagerName(e.target.value)}>
                  <option>Select a Manager</option>
                  {users.filter(user => user.ROLENAME.toLowerCase() === "manager").map(user => (
                    <option key={user.EMAIL} value={`${user.FIRSTNAME} ${user.LASTNAME}`}>
                      {user.FIRSTNAME} {user.LASTNAME}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Technician Name</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={technicians}
                  onChange={(e) =>
                    setTechnicians(
                      Array.from(
                        (e.target as unknown as HTMLSelectElement).selectedOptions,
                        (option: HTMLOptionElement) => option.value
                      )
                    )
                  }
                >                  {users.filter(user => user.ROLENAME.toLowerCase() === "technician").map(user => (
                  <option key={user.EMAIL} value={user.EMAIL}>
                    {user.FIRSTNAME} {user.LASTNAME}
                  </option>
                ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Viewer Name</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={viewers}
                  onChange={(e) =>
                    setViewers(
                      Array.from(
                        (e.target as unknown as HTMLSelectElement).selectedOptions,
                        (option: HTMLOptionElement) => option.value
                      )
                    )
                  }
                >
                  {users.filter(user => user.ROLENAME.toLowerCase() === "viewer").map(user => (
                    <option key={user.EMAIL} value={user.EMAIL}>
                      {user.FIRSTNAME} {user.LASTNAME}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  as="select"
                  value={companyID}
                  onChange={handleCompanyChange}
                >
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
            </Col>
            <Col>
              <Table responsive>
                <tbody>
                  <tr>
                    <td>
                      <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          as="select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Select Status</option>
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </Form.Control>

                      </Form.Group>

                    </td>
                    <td>
                      <Form.Group>
                        <Form.Label>Is Active</Form.Label>
                        <Form.Control as="select" value={isActive} onChange={(e) => setIsActive(e.target.value)}>
                          <option value="1">Active</option>
                          <option value="0">Inactive</option>
                        </Form.Control>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Group>
                        <Form.Label>Total Tasks</Form.Label>
                        <Form.Control type="number" placeholder="Enter total number of tasks" value={totalTasks} onChange={(e) => setTotalTasks(parseInt(e.target.value, 10))} />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Label>Completed Tasks</Form.Label>
                        <Form.Control type="number" placeholder="Enter number of completed tasks" value={completedTasks} onChange={(e) => setCompletedTasks(parseInt(e.target.value, 10))} />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Form.Group>
                        <Form.Label>Progress (%)</Form.Label>
                        <Form.Control type="number" placeholder="Enter project progress" value={progress} onChange={(e) => setProgress(parseInt(e.target.value, 10))} />
                      </Form.Group>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewProjectModal;
