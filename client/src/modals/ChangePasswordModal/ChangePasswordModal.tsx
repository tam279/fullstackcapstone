import React, { FC, ChangeEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ChangePasswordModal.css";
import config from "../../config";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface ChangePasswordModalProps {
  show: boolean;
  onHide: () => void;
}

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({
  show,
  onHide,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * The function `handleConfirm` is used to change the password by making a POST request to the backend
   * API with the new password and the user ID.
   * @returns The function `handleConfirm` returns nothing.
   */
  const handleConfirm = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("jwtToken");
    let userId = "";
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userId = decodedToken.userId;
    }

    try {
      const response = await axios.post(`${config.backend}/changePassword`, {
        userId: userId,
        newPassword: newPassword,
      });
      onHide();
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while changing the password");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-form">
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form>
            <div className="mb-3 input-field">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCurrentPassword(e.target.value)
                }
              />
            </div>
            <div className="mb-3 input-field">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
              />
            </div>
            <div className="mb-3 input-field">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
