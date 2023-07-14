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
    TECHNICIANS: [],
    DESCRIPTION: "",
    PRIORITY: "",
    ENDDATE: "",
    TAG: "",
    FILTER: "",
    STATUS: "",
    DEPENDENCIES: "",
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
          DEPENDENCIES: taskData.DEPENDENCIES || "", // Set the current dependency value
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
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(
        `${config.backend}/api/updateTasks/${taskId}`,
        formValues
      );
      handleClose();
    } catch (error) {
      console.error("Error updating task:", error);
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
            <Row>
              <h2>Details</h2>
              <Col>
                <Form.Control
                  type="text"
                  name="NAME"
                  placeholder="Enter task name"
                  value={formValues.NAME}
                  onChange={handleFormChange}
                />

                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="STARTDATE"
                    value={formValues.STARTDATE}
                    onChange={handleFormChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Technician</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    name="TECHNICIANS"
                    value={formValues.TECHNICIANS}
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
                    value={formValues.DESCRIPTION}
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
                    value={formValues.STATUS}
                    onChange={handleFormChange}
                    name="STATUS"
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
                    value={formValues.ENDDATE}
                    onChange={handleFormChange}
                  />
                </Form.Group>

          
                {task && task.DEPENDENCY_NAME && (
                  <Form.Group>
                    <Form.Label>Current Dependency</Form.Label>
                    <Form.Control
                      type="text"
                      value={task.DEPENDENCY_NAME}
                      disabled
                    />
                  </Form.Group>
                )}
              </Col>
            </Row>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
