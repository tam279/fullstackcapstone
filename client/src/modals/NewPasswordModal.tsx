import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios"; // Import Axios library
import config from "../config";

interface NewPasswordModalProps {
  show: boolean;
  userId: string | null;
  token: string | null;
}

const NewPasswordModal: React.FC<NewPasswordModalProps> = ({
  show,
  userId,
  token,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === confirmPassword) {
      setPasswordsMatch(true);

      try {
        // Prepare the request data
        const requestData = {
          userId,
          newPassword: password,
        };

        // Set the Authorization header with the bearer token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make the POST request to the /newpassword endpoint with the user ID and password
        const response = await axios.post(
          `${config.backend}/newpassword`, // Replace with your backend API endpoint URL
          requestData,
          {
            headers,
          }
        );

        console.log("Password updated successfully!", response.data);
        // Redirect the user here using your desired method (e.g., navigate or window.location.href)
        window.location.reload();
      } catch (error) {
        console.error("Password update failed:", error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header style={{ borderBottom: "none" }}>
        <Modal.Title>Set New Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!passwordsMatch && (
              <Form.Text className="text-danger">
                Passwords do not match.
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewPasswordModal;
