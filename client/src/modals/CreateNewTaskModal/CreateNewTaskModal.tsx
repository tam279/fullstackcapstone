import React, { FC, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import {
  User,
  Project,
  Status,
  Task,
} from "../../problemdomain/Interface/Interface";
import { fetchUserData } from "../../problemdomain/DataService/DataService";

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
  projectId: string;
  addNewTask: (task: Task) => void; // Add this line
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  show,
  handleClose,
  projectId,
  addNewTask,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    status: Status.NOT_STARTED,
    priorityLevel: 1,
    startDate: "",
    endDate: "",
    technicians: [] as string[],
    dependencies: [] as string[],
    projectId: projectId,
  });

  const toISOStringWithFullPrecision = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  useEffect(() => {
    // Fetch technicians when the component mounts
    const fetchProjectTechnicians = async () => {
      const userData = await fetchUserData();
      const projectTechnicians = userData.filter((user: User) =>
        user.projectsAsTechnician.some(
          (project: Project) => project.id === projectId
        )
      );
      setUsers(projectTechnicians);
    };

    fetchProjectTechnicians();
  }, []); // Add empty dependency array to run only once when component mounts

  useEffect(() => {
    // Clear selected technicians when the modal closes
    if (!show) {
      setFormValues((prevValues) => ({
        ...prevValues,
        technicians: [],
      }));
    }
  }, [show]);

  const handleFormChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (event.target.name === "technicians") {
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
        dependencies: event.target.value.split(","),
      });
    } else {
      let value: string | number = event.target.value;
      // Parse priorityLevel as integer
      if (event.target.name === "priorityLevel") {
        value = parseInt(value);
      }
      setFormValues({
        ...formValues,
        [event.target.name]: value,
      });
    }
  };

  const handleFormSubmit = async () => {
    try {
      // Extract technician ids from the users state
      const technicianIds = users
        .filter((user) => formValues.technicians.includes(user.email))
        .map((user) => user.id);

      // Create the task data with the correct structure
      const taskData = {
        name: formValues.name,
        description: formValues.description,
        status: formValues.status,
        priorityLevel: formValues.priorityLevel,
        startDate: toISOStringWithFullPrecision(formValues.startDate), // Access startDate from formValues
        endDate: toISOStringWithFullPrecision(formValues.endDate), // Access endDate from formValues
        technicians: technicianIds, // Pass the array of technician ids directly
        dependencies: formValues.dependencies,
        projectId: formValues.projectId,
      };

      const response = await axios.post(
        `${config.backend}/api/project/${formValues.projectId}/tasks`,
        taskData
      );
      const newTask = response.data;
      addNewTask(newTask);

      handleClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

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
              <Form.Group>
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter task name"
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="startDate"
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="endDate"
                  onChange={handleFormChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Priority Level</Form.Label>
                <Form.Control
                  as="select"
                  value={formValues.priorityLevel}
                  onChange={handleFormChange}
                  name="priorityLevel"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
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
                  <option value={Status.NOT_STARTED}>Not Started</option>
                  <option value={Status.IN_PROGRESS}>In Progress</option>
                  <option value={Status.COMPLETED}>Completed</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Technician</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="technicians"
                  value={formValues.technicians}
                  onChange={handleFormChange}
                >
                  {users.map((user, index) => (
                    <option key={index} value={user.email}>
                      {user.firstName + " " + user.lastName}
                    </option>
                  ))}
                </Form.Control>
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

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Task description..."
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
