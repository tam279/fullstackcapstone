/* The above code is a TypeScript React component that represents a modal for displaying task details
and comments. It is used to view and interact with a specific task within a project. */
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
import "./TaskDetailModal.css";
import { FaEdit, FaTrash } from "react-icons/fa";

// Define the component props
interface TaskDetailModalProps {
  show: boolean;
  handleClose: () => void;
  task: Task | null;
  projectId: string;
  taskId: string;
  onTaskUpdated: (updatedTask: Task) => void;
}

const TaskComponent: FC<TaskDetailModalProps> = ({
  taskId,
  show,
  handleClose,
  projectId,
  onTaskUpdated,
}) => {
  // State setup for managing task and comments
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editComment, setEditComment] = useState<{
    id: string;
    value: string;
  } | null>(null);
  const loggedInUserId = localStorage.getItem("userId");

  // Ref for handling file uploads
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handler for file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract files from event
    const files = e.target.files;

    // Handle file selection or deselection
    if (files && files.length > 0) {
      // When the file input changes and there is at least one file, update the selectedFile state with the chosen file
      setSelectedFile(files[0]);
    } else {
      // When the file input changes and there are no files selected (e.g., user cleared the input), set selectedFile to null
      setSelectedFile(null);
    }
  };

  const handleCreateComment = async () => {
    try {
      const formData = new FormData();
      formData.append("comment", newComment);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Retrieve the user ID from local storage
      const userId = localStorage.getItem("userId");

      if (userId !== null) {
        formData.append("userId", userId);
      }

      // Make the Axios request to your API endpoint
      const response = await axios.post(
        `${config.backend}/api/tasks/${taskId}/comments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If the request was successful, clear the comment box and the selected file
      if (response.status === 200) {
        setNewComment("");
        setSelectedFile(null); // Clear the selected file
        fileInputRef.current && (fileInputRef.current.value = ""); // Clear the file input field
      }

      // Handle the response as needed
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Effect to fetch task details and comments when the modal is shown
  useEffect(() => {
    // Fetch the specific task details
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

    // Fetch all comments for the specific task
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(
          `${config.backend}/api/tasks/${taskId}/comments`
        );

        const sortedComments = commentsResponse.data.sort(
          (a: Comment, b: Comment) => {
            return (
              new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
            );
          }
        );

        setComments(sortedComments.reverse());
      } catch (error) {
        console.error(error);
      }
    };

    // Only run fetch functions if the modal is shown
    if (show) {
      fetchTask();
      fetchComments();
    }

    // Poll for new comments every 5 seconds
    const intervalId = setInterval(fetchComments, 5000); // Fetches comments every 5 seconds

    // Cleanup interval on effect cleanup
    return () => {
      clearInterval(intervalId); // Clears the interval on component unmount
    };
  }, [show, taskId, projectId]);

  // Function to update the status of the task
  const updateTaskStatus = async (newStatus: string | null) => {
    // Fallback to current task status
    if (newStatus === null) {
      newStatus = task?.status || "";
    }
    if (task?.id) {
      // ensure we have a task id before proceeding
      try {
        await axios.put(
          `${config.backend}/api/project/${projectId}/task/${taskId}`,
          { status: Status[newStatus as keyof typeof Status] }
        );
        const updatedTask: Task = {
          ...task,
          status: Status[newStatus as keyof typeof Status],
          id: task.id,
        };
        setTask(updatedTask);
        onTaskUpdated(updatedTask);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const formattedStartDate = task?.startDate
    ? new Date(task.startDate).toISOString().split("T")[0]
    : "";
  const formattedEndDate = task?.endDate
    ? new Date(task.endDate).toISOString().split("T")[0]
    : "";

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(`${config.backend}/api/comments/${commentId}`);

      // Remove the deleted comment from local state
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (
    commentId: string,
    updatedComment: string
  ) => {
    try {
      // API call to update the comment
      const response = await axios.put(
        `${config.backend}/api/comments/${commentId}`,
        { text: updatedComment }, // Use 'text' instead of 'comment' to match the server's expected data format
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // If successful, update the local state with the updated comment
        setComments(
          comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, text: updatedComment }
              : comment
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

 /* The above code is rendering a modal component in a TypeScript React application. The modal displays
 task details and comments. */
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
              <Form.Control type="text" value={task?.name || ""} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={task?.description || ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={task?.status || ""} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Priority Level</Form.Label>
              <Form.Control
                type="text"
                value={task?.priorityLevel || ""}
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="text" value={formattedStartDate} disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="text" value={formattedEndDate} disabled />
            </Form.Group>
            {task?.technicians && (
              <Form.Group>
                <Form.Label>Technicians</Form.Label>
                {task.technicians.map((tech: User, i: number) => (
                  <Form.Control
                    key={i}
                    type="text"
                    value={tech.firstName + " " + tech.lastName}
                    disabled
                  /> // assuming 'name' is a valid property of User
                ))}
              </Form.Group>
            )}
          </Col>
          <Col>
            <h3>Comments</h3>
            <div className="comments-container">
              {comments.map((comment: Comment, index: number) => (
                <div key={index}>
                  <p>{`${comment.User.firstName} ${
                    comment.User.lastName
                  } - ${moment(comment.timeStamp).format("LLL")}`}</p>

                  {editComment && editComment.id === comment.id ? (
                    <InputGroup>
                      <FormControl
                        as="textarea"
                        placeholder="Update comment"
                        value={editComment.value}
                        onChange={(e) =>
                          setEditComment({
                            id: comment.id,
                            value: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="success"
                        onClick={() =>
                          handleUpdateComment(comment.id, editComment.value)
                        }
                      >
                        Update
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => setEditComment(null)}
                      >
                        Cancel
                      </Button>
                    </InputGroup>
                  ) : (
                    <>
                      <p>{comment.comment}</p>
                      {/* Check if the current user is the owner of the comment */}
                      {localStorage.getItem("userId") === comment.User.id && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FaEdit
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={() =>
                              setEditComment({
                                id: comment.id,
                                value: comment.comment,
                              })
                            }
                          />
                          <FaTrash
                            style={{ cursor: "pointer", color: "red" }}
                            onClick={() => handleDeleteComment(comment.id)}
                          />
                        </div>
                      )}
                    </>
                  )}

                  <ul>
                    {comment.files.map((file, index) => (
                      <li key={index}>
                        <span>File Name: {file.name}</span>
                        <span>
                          <a
                            href={`${config.backend}/download/${file.id}`}
                            download={file.name}
                          >
                            Download
                          </a>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h4>Enter a Comment:</h4>
            <InputGroup>
              <FormControl
                as="textarea"
                placeholder="Enter comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </InputGroup>
            {/* Use the ref for the file input */}
            <input
              type="file"
              onChange={handleFileUpload}
              ref={fileInputRef}
              // Add an id for the file input element, if needed
              // id="fileInput"
            />
            <Button variant="primary" onClick={handleCreateComment}>
              Send
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Dropdown onSelect={updateTaskStatus}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {task?.status}
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
