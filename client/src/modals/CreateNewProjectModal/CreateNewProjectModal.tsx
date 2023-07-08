import React, { FC, useState } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

interface CreateProjectModalProps {
  show: boolean;
  handleClose: () => void;
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [technicians, setTechnicians] = useState("");
  const [viewers, setViewers] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [totalTasks, setTotalTasks] = useState("");
  const [completedTasks, setCompletedTasks] = useState("");
  const [progress, setProgress] = useState("");
  const [isActive, setIsActive] = useState("");
  const [companyID, setCompanyID] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/createProject', {
        name,
        managerEmail,
        technicians,
        viewers,
        description,
        startDate,
        endDate,
        status,
        totalTasks,
        completedTasks,
        progress,
        isActive,
        companyID
      }, {
        withCredentials: true,
      });

      console.log(response.data);
      handleClose();
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
              {/* Group 1 - Basic Details */}
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter project name" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter project description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Manager Email</Form.Label>
                <Form.Control type="text" placeholder="Enter manager email" value={managerEmail} onChange={(e) => setManagerEmail(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Technicians</Form.Label>
                <Form.Control type="text" placeholder="Enter technicians' emails separated by comma" value={technicians} onChange={(e) => setTechnicians(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Viewers</Form.Label>
                <Form.Control type="text" placeholder="Enter viewers' emails separated by comma" value={viewers} onChange={(e) => setViewers(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Company ID</Form.Label>
                <Form.Control type="number" placeholder="Enter company ID" value={companyID} onChange={(e) => setCompanyID(e.target.value)} />
              </Form.Group>

            </Col>
            <Col>
              {/* Group 2 - Project Details */}
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
                        <Form.Control type="text" placeholder="Enter project status" value={status} onChange={(e) => setStatus(e.target.value)} />
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
                        <Form.Control type="number" placeholder="Enter total number of tasks" value={totalTasks} onChange={(e) => setTotalTasks(e.target.value)} />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Label>Completed Tasks</Form.Label>
                        <Form.Control type="number" placeholder="Enter number of completed tasks" value={completedTasks} onChange={(e) => setCompletedTasks(e.target.value)} />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <Form.Group>
                        <Form.Label>Progress</Form.Label>
                        <Form.Control type="number" placeholder="Enter project progress percentage" value={progress} onChange={(e) => setProgress(e.target.value)} />
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

export default CreateProjectModal;