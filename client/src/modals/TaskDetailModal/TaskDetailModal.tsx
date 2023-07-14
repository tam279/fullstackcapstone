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

interface TaskDetailModalProps {
  show: boolean;
  handleClose: () => void;
  taskId: number;
}

interface Task {
  TASKID: number;
  NAME: string;
  STARTDATE: string;
  ENDDATE: string;
  PROGRESS: number;
  DESCRIPTION: string;
  STATUS: string;
  PRIORITY: string;
  ISACTIVE: number;
  PROJECTID: number;
  DURATION: number;
  TECHNICIAN: string;
  TAG: string;
  DEPENDENCY_NAME: string | null;
}

interface Comment {
  COMMENTID: number;
  COMMENT: string;
  DATE: string;
  TASKID: number;
  EMAIL: string;
}

const TaskDetailModal: FC<TaskDetailModalProps> = ({
  show,
  handleClose,
  taskId,
}) => {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    const fetchTaskAndComments = async () => {
      try {
        const taskResponse = await axios.get<Task>(
          `${config.backend}/api/tasks/${taskId}`
        );
        setTask(taskResponse.data);

        const commentsResponse = await axios.get<Comment[]>(
          `${config.backend}/api/comments?taskId=${taskId}`
        );
        setComments(commentsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (show) {
      fetchTaskAndComments();
    }
  }, [show, taskId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post<Comment>(
        `${config.backend}/api/comments`,
        {
          comment: newComment,
          taskId,
          // Any other fields the API needs...
        }
      );

      if (response.status === 200) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartTask = async () => {
    try {
      // Update the task status based on the current status
      let newStatus = "";
      if (task?.STATUS === "Not Started") {
        newStatus = "In Progress";
      } else if (task?.STATUS === "In Progress") {
        newStatus = "Completed";
      } else {
        newStatus = "Not Started";
      }

      const response = await axios.put<Task>(
        `${config.backend}/api/tasks/${taskId}`,
        {
          ...task,
          STATUS: newStatus,
        }
      );

      if (response.status === 200) {
        setTask(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!task) {
    return null;
  }

  const formattedStartDate = new Date(task.STARTDATE)
    .toISOString()
    .split("T")[0];
  const formattedEndDate = new Date(task.ENDDATE).toISOString().split("T")[0];

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Task Details and Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={formattedStartDate}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                defaultValue={formattedEndDate}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Priority Level</Form.Label>
              <Form.Control as="select" defaultValue={task.PRIORITY} disabled>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Current Status</Form.Label>
              <Form.Control as="select" defaultValue={task.STATUS} disabled>
                <option>Not Started</option>
                <option>On going</option>
                <option>Completed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={task.DESCRIPTION}
                disabled
              />
            </Form.Group>
            {task.DEPENDENCY_NAME && (
              <Form.Group>
                <Form.Label>Dependency</Form.Label>
                <Form.Control
                  type="text"
                  value={task.DEPENDENCY_NAME}
                  disabled
                />
              </Form.Group>
            )}
          </Col>
          <Col>
            <h4>Comments:</h4>
            {comments.map((comment: Comment, i: number) => (
              <div key={i}>
                <p>
                  {comment.EMAIL} -{" "}
                  {new Date(comment.DATE).toLocaleDateString()}
                </p>
                <p>{comment.COMMENT}</p>
              </div>
            ))}
            <InputGroup>
              <FormControl
                as="textarea"
                placeholder="Enter comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </InputGroup>
            <Form.Group>
              <Form.Label>Files</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button onClick={handleCommentSubmit}>Send</Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleStartTask}>
          {task.STATUS === "Not Started" && "Start Task"}
          {task.STATUS === "In Progress" && "Complete"}
          {task.STATUS === "Completed" && "Not Started"}
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;
