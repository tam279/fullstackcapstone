import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../../config";

interface EditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  taskId: any;
}

interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
}

interface FormValues {
  NAME: string;
  STARTDATE: string;
  TECHNICIANS: string[];
  TECHNICIAN_EMAIL: string[]; // Add TECHNICIAN_EMAIL property
  DESCRIPTION: string;
  PRIORITY: string;
  ENDDATE: string;
  TAG: string;
  FILTER: string;
  STATUS: string;
  DEPENDENCY: any;
  ISACTIVE: boolean;
}

const EditTaskModal: FC<EditTaskModalProps> = ({
  show,
  handleClose,
  taskId,
}) => {
  const [task, setTask] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);

  const [formValues, setFormValues] = useState({
    NAME: "",
    STARTDATE: "",
    TECHNICIANS: [] as string[], // Update the type of TECHNICIANS to string[]
    DESCRIPTION: "",
    PRIORITY: "",
    ENDDATE: "",
    TAG: "",
    FILTER: "",
    STATUS: "",
    DEPENDENCY: "",
    ISACTIVE: false,
  });

  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.get(
          `${config.backend}/api/tasks/${taskId}`
        );
        setTask(response.data);
      } catch (error) {
        console.error("Error getting task:", error);
        // handle error as needed
      }
    };

    getTask();
  }, [taskId]);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await axios.get(`${config.backend}/api/tasks/${taskId}`);
        const taskData = res.data;

        let startDate = new Date(taskData.STARTDATE);
        let formattedStartDate = startDate.toISOString().substring(0, 16);

        let endDate = new Date(taskData.ENDDATE);
        let formattedEndDate = endDate.toISOString().substring(0, 16);

        setFormValues({
          NAME: taskData.NAME,
          STARTDATE: formattedStartDate,
          TECHNICIANS: [], // Since API doesn't provide technicians, initialize as empty
          DESCRIPTION: taskData.DESCRIPTION,
          PRIORITY: taskData.PRIORITY,
          ENDDATE: formattedEndDate,
          TAG: taskData.TAG,
          FILTER: taskData.FILTER,
          STATUS: taskData.STATUS,
          DEPENDENCY: taskData.DEPENDENCY || "", // Set the current dependency value
          ISACTIVE: taskData.ISACTIVE || false, // initialize ISACTIVE if it's not provided by API
        });
        setTask(res.data);
        const fetchUsers = async () => {
          try {
            const response = await axios.get(
              `${config.backend}/api/project/${taskData.PROJECTID}/technicians`
            );
            setUsers(response.data);
          } catch (err) {
            console.error(err);
          }
        };

        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    };

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  const handleFormChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // create a copy of formValues
      const updatedFormValues: FormValues = {
        ...formValues,
        TECHNICIAN_EMAIL: formValues.TECHNICIANS,
        DEPENDENCY: formValues.DEPENDENCY,
      };
      delete (updatedFormValues as any).TECHNICIANS;

      updatedFormValues.TECHNICIAN_EMAIL = updatedFormValues.TECHNICIANS;
      delete (updatedFormValues as any).TECHNICIANS;

      // Calculate the progress based on the formula (EndDate - today) / (EndDate - StartDate)
      const endDate = new Date(updatedFormValues.ENDDATE);
      const startDate = new Date(updatedFormValues.STARTDATE);
      const today = new Date();
      const totalDuration = endDate.getTime() - startDate.getTime();
      const remainingDuration = endDate.getTime() - today.getTime();
      const progress = (remainingDuration / totalDuration) * 100;

      // Set the progress value in updatedFormValues
      (updatedFormValues as any).PROGRESS = progress.toFixed(2);

      await axios.put(
        `${config.backend}/api/updateTasks/${taskId}`,
        updatedFormValues
      );
      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `${config.backend}/api/tasks/${taskId}`
      );
      if (response.status === 200) {
        handleClose(); // Close the modal
        // Optional: add code here to refresh the list of tasks in the parent component
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivateTask = async () => {
    try {
      await axios.put(`${config.backend}/api/tasks/${taskId}/activate`);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ISACTIVE: true,
      }));
    } catch (error) {
      console.error("Error activating task:", error);
    }
  };

  const handleDeactivateTask = async () => {
    try {
      await axios.put(`${config.backend}/api/tasks/${taskId}/deactivate`);
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        ISACTIVE: false,
      }));
    } catch (error) {
      console.error("Error deactivating task:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {task && (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="NAME"
                  value={formValues.NAME}
                  onChange={handleFormChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Start Date
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="datetime-local"
                  name="STARTDATE"
                  value={formValues.STARTDATE}
                  onChange={handleFormChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Technicians
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="TECHNICIANS"
                  value={formValues.TECHNICIANS}
                  onChange={handleFormChange}
                  multiple
                >
                  {users.map((user) => (
                    <option key={user.EMAIL} value={user.EMAIL}>
                      {`${user.FIRSTNAME} ${user.LASTNAME}`}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="DESCRIPTION"
                  value={formValues.DESCRIPTION}
                  onChange={handleFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Priority
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="PRIORITY"
                  value={formValues.PRIORITY}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                End Date
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="datetime-local"
                  name="ENDDATE"
                  value={formValues.ENDDATE}
                  onChange={handleFormChange}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tag
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="TAG"
                  value={formValues.TAG}
                  onChange={handleFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Filter
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="FILTER"
                  value={formValues.FILTER}
                  onChange={handleFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Status
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="STATUS"
                  value={formValues.STATUS}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Delayed">Delayed</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Dependencies
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="DEPENDENCY"
                  value={formValues.DEPENDENCY}
                  onChange={handleFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Active
              </Form.Label>
              <Col sm="10">
                <Form.Check
                  type="checkbox"
                  name="ISACTIVE"
                  checked={formValues.ISACTIVE}
                  onChange={handleFormChange}
                />
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Task
            </Button>{" "}
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete Task
            </Button>{" "}
            {!formValues.ISACTIVE ? (
              <Button variant="success" onClick={handleActivateTask}>
                Activate Task
              </Button>
            ) : (
              <Button variant="warning" onClick={handleDeactivateTask}>
                Deactivate Task
              </Button>
            )}
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
