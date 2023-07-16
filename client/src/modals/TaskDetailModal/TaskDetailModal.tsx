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
  DEPENDENCY: any;
}

interface Comment {
  COMMENTID: number;
  COMMENT: string;
  DATE: string;
  TASKID: number;
  EMAIL: string;
  FILENAME: string | null;
  FILEDATA: Buffer | null; // UPDATE: Add this field
}

const TaskDetailModal: FC<TaskDetailModalProps> = ({
  show,
  handleClose,
  taskId,
}) => {
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchTaskAndComments = async () => {
      try {
        const taskResponse = await axios.get<Task>(
          `${config.backend}/api/tasks/${taskId}`
        );
        setTask(taskResponse.data);

        const commentsResponse = await axios.get<Comment[]>(
          `${config.backend}/api/comments/task?taskId=${taskId}`
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
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");

      const formData = new FormData();
      formData.append("COMMENT", newComment);
      formData.append("TASKID", taskId.toString());
      formData.append("EMAIL", "manager@company1.com");
      formData.append("DATE", formattedDate);
      if (selectedFile) {
        formData.append("file", selectedFile, selectedFile.name);
      }

      const response = await axios.post<Comment>(
        `${config.backend}/api/comments`, // UPDATE: Changed the route
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
        setSelectedFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE: New function to download a file from a comment
  const downloadCommentFile = async (commentId: number) => {
    try {
      // Find the comment object from the comments state array
      const comment = comments.find(
        (comment) => comment.COMMENTID === commentId
      );

      if (!comment || !comment.FILENAME) {
        throw new Error(`No comment or filename found with ID: ${commentId}`);
      }

      const response = await axios.get<ArrayBuffer>(
        `${config.backend}/api/comments/${comment.COMMENTID}/file`,
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = comment.FILENAME;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const response = await axios.put<Task>(
        `${config.backend}/api/updateTasks/${taskId}`,
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

  const renderCommentFiles = (comment: Comment) => {
    if (!comment.FILENAME) {
      return null;
    }

    return (
      <div>
        <p>Files:</p>
        <ul>
          <li>
            <a
              href={`${config.backend}/api/comments/file/${comment.COMMENTID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {comment.FILENAME}
            </a>
            <Button onClick={() => downloadCommentFile(comment.COMMENTID)}>
              Download {comment.FILENAME}
            </Button>
          </li>
        </ul>
      </div>
    );
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
                <option>In Progress</option>
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
            {task.DEPENDENCY && (
              <Form.Group>
                <Form.Label>Dependency</Form.Label>
                <Form.Control type="text" value={task.DEPENDENCY} disabled />
              </Form.Group>
            )}
          </Col>
          <Col>
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              <h4>Comments:</h4>
              {comments.map((comment: Comment, i: number) => (
                <div key={i}>
                  <p>
                    {comment.EMAIL} - {new Date(comment.DATE).toLocaleString()}
                  </p>
                  <p>{comment.COMMENT}</p>
                  {renderCommentFiles(comment)}
                </div>
              ))}
            </div>

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
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button onClick={handleCommentSubmit}>Send</Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <DropdownButton variant="secondary" title="Select Action">
          {task.STATUS === "Not Started" && (
            <Dropdown.Item onClick={() => handleStatusChange("In Progress")}>
              Start Task
            </Dropdown.Item>
          )}
          {task.STATUS === "In Progress" && (
            <Dropdown.Item onClick={() => handleStatusChange("Completed")}>
              Complete Task
            </Dropdown.Item>
          )}
          {task.STATUS === "Completed" && (
            <Dropdown.Item onClick={() => handleStatusChange("Not Started")}>
              Restart Task
            </Dropdown.Item>
          )}
        </DropdownButton>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailModal;
