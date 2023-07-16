import React, { FC, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../../config";

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
  projectId: number;
}

interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  // Add other properties if they exist
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  show,
  handleClose,
  projectId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    startDate: "",
    technicians: [] as string[], // Update the type here
    description: "",
    PRIORITY: "", // change this from priorityLevel
    endDate: "",
    tags: "",
    dependencies: "",
    projectId: projectId,
    status: "", // Add this line
  });

  useEffect(() => {
    const fetchProjectTechnicians = async () => {
      const response = await axios.get(
        `${config.backend}/api/project/${projectId}/technicians`
      );
      setUsers(response.data);
    };

    fetchProjectTechnicians();
  }, [projectId]);

  // ...existing code

  const handleFormChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (event.target.name === "users") {
      const selectedOptions = Array.from(
        (event.target as HTMLSelectElement).selectedOptions,
        (option) => (option as HTMLOptionElement).value
      );
      setFormValues({
        ...formValues,
        technicians: selectedOptions,
      });
    } else if (event.target.name === "dependencies") {
      setFormValues({
        ...formValues,
        dependencies: event.target.value,
      });
    } else if (event.target.name === "PRIORITY") {
      setFormValues({
        ...formValues,
        PRIORITY: event.target.value,
      });
    } else if (event.target.name === "status") {
      // Add this condition
      setFormValues({
        ...formValues,
        status: event.target.value,
      });
    } else if (event.target.name === "name") {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    } else if (event.target.name === "tags") {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    } else {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  // ...existing code

  const handleFormSubmit = async () => {
    try {
      const taskData = {
        ...formValues,
        PROJECTID: projectId,
        TECHNICIAN_EMAIL: formValues.technicians,
        NAME: formValues.name,
        PRIORITY: formValues.PRIORITY,
        TAG: formValues.tags,
        STATUS: formValues.status,
        DEPENDENCY: formValues.dependencies, // Add this line
      };

      await axios.post(`${config.backend}/api/createTasks`, taskData);
      handleClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const [status, setStatus] = useState("");

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <h2>Details</h2>
            <Col>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter task name"
                onChange={handleFormChange}
              />

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="STARTDATE"
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Technician</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="users"
                  value={formValues.technicians}
                  onChange={handleFormChange}
                >
                  {users.map((user, index) => (
                    <option key={index} value={user.EMAIL}>
                      {user.FIRSTNAME + " " + user.LASTNAME}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="DESCRIPTION"
                  placeholder="Task description..."
                  onChange={handleFormChange}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Priority Level</Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.PRIORITY}
                  onChange={handleFormChange}
                  name="PRIORITY"
                >
                  <option value="">Select Priority Level</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.status}
                  onChange={handleFormChange}
                  name="status"
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="ENDDATE"
                  onChange={handleFormChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Dependencies</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Task dependencies. Enter the task name, follow by the comma..."
                  name="dependencies"
                  onChange={handleFormChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
