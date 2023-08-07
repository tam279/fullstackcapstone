import React, { FC, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import {
  User,
  Task,
  Project,
  Status,
} from "../../problemdomain/Interface/Interface";
import { fetchUserData } from "../../problemdomain/DataService/DataService";

interface EditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  task: Task;
  projectId: string;
  onTaskUpdated: (updatedTask: Task) => void; // Added this line
}

const EditTaskModal: FC<EditTaskModalProps> = ({
  show,
  handleClose,
  task,
  onTaskUpdated,
}) => {
  // Added onTaskUpdated here
  const [users, setUsers] = useState<User[]>([]);
  const [formValues, setFormValues] = useState({
    name: task.name,
    description: task.description,
    status: task.status,
    priorityLevel: task.priorityLevel,
    startDate: new Date(task.startDate).toISOString().slice(0, 16),
    endDate: new Date(task.endDate).toISOString().slice(0, 16),
    technicians: task.technicians.map((tech) => tech.email),
    dependencies: task.dependencies || "",
    projectId: task.projectId,
  });

  const [lastFetchedProjectId, setLastFetchedProjectId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchProjectTechnicians = async () => {
      if (task.projectId !== lastFetchedProjectId) {
        const userData = await fetchUserData();
        const projectTechnicians = userData.filter((user: User) =>
          user.projectsAsTechnician.some(
            (project: Project) => project.id === task.projectId
          )
        );
        setUsers(projectTechnicians);
        setLastFetchedProjectId(task.projectId);
      }
    };

    fetchProjectTechnicians();
  }, [task.projectId, lastFetchedProjectId]); // Depend on task.projectId and lastFetchedProjectId

  const handleStatusChange = (newStatus: string) => {
    if (
      task?.status === Status.NOT_STARTED &&
      newStatus === Status.IN_PROGRESS &&
      task.dependencies
    ) {
      const proceed = window.confirm(
        `This task has dependencies: ${task.dependencies}. Are you sure you want to change its status to IN_PROGRESS?`
      );
      if (!proceed) {
        return false; // If user says 'No', then exit and don't update status
      }
    }
    return true;
  };

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
        dependencies: event.target.value,
      });
    } else if (event.target.name === "status") {
      const newStatus = event.target.value as Status;

      if (!handleStatusChange(newStatus)) {
        return; // Don't update the status in the form if handleStatusChange returns false
      }

      setFormValues({
        ...formValues,
        [event.target.name]: newStatus,
      });
    } else {
      let value: string | number = event.target.value;
      if (event.target.name === "priorityLevel") {
        value = parseInt(value);
      }
      setFormValues({
        ...formValues,
        [event.target.name]: value,
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${config.backend}/api/project/${task.projectId}/task/${task.id}`
      );
      handleClose();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const technicianIds = users
        .filter((user) => formValues.technicians.includes(user.email))
        .map((user) => user.id);

      const taskData = {
        name: formValues.name,
        description: formValues.description,
        status: formValues.status,
        priorityLevel: formValues.priorityLevel,
        startDate: new Date(formValues.startDate).toISOString(),
        endDate: new Date(formValues.endDate).toISOString(),
        technicians: technicianIds,
        dependencies: formValues.dependencies,
        projectId: formValues.projectId,
      };

      const response = await axios.put(
        `${config.backend}/api/project/${formValues.projectId}/task/${task.id}`,
        taskData
      );

      if (response.status === 200) {
        onTaskUpdated(response.data);
      }

      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    setFormValues({
      name: task.name,
      description: task.description,
      status: task.status,
      priorityLevel: task.priorityLevel,
      startDate: new Date(task.startDate).toISOString().slice(0, 16),
      endDate: new Date(task.endDate).toISOString().slice(0, 16),
      technicians: task.technicians.map((tech) => tech.email),
      dependencies: task.dependencies || "",
      projectId: task.projectId,
    });
  }, [task]);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
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
                  value={formValues.name}
                />
              </Form.Group>

              <Form.Control
                type="datetime-local"
                name="startDate"
                onChange={handleFormChange}
                value={formValues.startDate}
              />

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="endDate"
                  onChange={handleFormChange}
                  value={formValues.endDate}
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
                  placeholder="Task dependencies. Enter the task id, follow by the comma..."
                  name="dependencies"
                  onChange={handleFormChange}
                  value={formValues.dependencies}
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
                  value={formValues.description}
                />
              </Form.Group>
            </Col>
          </Row>
          <Modal.Footer>
            <Row className="w-100">
              <Col xs={4}>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Col>
              <Col xs={8} className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTaskModal;
