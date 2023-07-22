import React, { FC, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  InputGroup,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import { Dropdown, DropdownButton } from "react-bootstrap";
import {
  Task,
  Comment,
  User,
  Status,
} from "../../problemdomain/Interface/Interface";
import moment from "moment";

interface TaskDetailModalProps {
  show: boolean;
  handleClose: () => void;
  task: Task | null; // make sure this is correctly defined
  projectId: string;
  taskId: string;
  onTaskUpdated: (updatedTask: Task) => void; // define type for updatedTask
}

const TaskComponent: FC<TaskDetailModalProps> = ({
  taskId,
  show,
  handleClose,
  projectId,
  onTaskUpdated,
}) => {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskResponse = await axios.get(
          `${config.backend}/api/project/${projectId}/task/${taskId}`
        );
        setTask(taskResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(
          `${config.backend}/api/tasks/${taskId}/comments`
        );
        setComments(commentsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (show) {
      fetchTask();
      fetchComments();
    }
  }, [show, taskId, projectId]);

  if (!task) {
    return null;
  }
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };
  const updateTaskStatus = async (newStatus: string | null) => {
    if (newStatus === null) {
      newStatus = task.status;
    }

    try {
      await axios.put(
        `${config.backend}/api/project/${projectId}/task/${taskId}`,
        { status: Status[newStatus as keyof typeof Status] }
      );
      const updatedTask = {
        ...task,
        status: Status[newStatus as keyof typeof Status],
      };
      setTask(updatedTask);
      onTaskUpdated(updatedTask);
    } catch (error) {
      console.error(error);
    }
  };
  const formattedStartDate = new Date(task.startDate)
    .toISOString()
    .split("T")[0];
  const formattedEndDate = new Date(task.endDate).toISOString().split("T")[0];

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task Details and Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" value={task.name} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" value={task.description} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={task.status} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority Level</Form.Label>
              <Form.Control type="text" value={task.priorityLevel} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="text" value={formattedStartDate} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="text" value={formattedEndDate} disabled />
            </Form.Group>
            {task.technicians && (
              <Form.Group>
                <Form.Label>Technicians</Form.Label>
                {task.technicians.map((tech, i) => (
                  <Form.Control
                    key={i}
                    type="text"
                    value={`${tech.firstName} ${tech.lastName}`} // Concatenate first name and last name
                    disabled
                  />
                ))}
              </Form.Group>
            )}
          </Col>
          <Col>
            <h3>Comments</h3>
            {comments.map((comment: Comment, index: number) => (
              <div key={index}>
                <p>{`${comment.User.firstName} ${
                  comment.User.lastName
                } - ${moment(comment.timeStamp).format("LLL")}`}</p>
                <p>{comment.comment}</p>
              </div>
            ))}
            <h4>Enter a Comment:</h4>
            <InputGroup>
              <FormControl
                as="textarea"
                placeholder="Enter comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </InputGroup>
            <input type="file" onChange={handleFileUpload} />{" "}
            {/* File upload input */}
            <Button variant="primary">Send</Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Dropdown onSelect={updateTaskStatus}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {task.status}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey={Status.NOT_STARTED}>
              {Status.NOT_STARTED}
            </Dropdown.Item>
            <Dropdown.Item eventKey={Status.IN_PROGRESS}>
              {Status.IN_PROGRESS}
            </Dropdown.Item>
            <Dropdown.Item eventKey={Status.COMPLETED}>
              {Status.COMPLETED}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskComponent;
