import React, { FC, ChangeEvent } from "react";
import { Modal, Button } from "react-bootstrap";
import './SettingsModal.css'; // Import the CSS file

interface SettingsModalProps {
  show: boolean;
  onHide: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ show, onHide }) => {

  const handleConfirm = () => {
    // Write your confirm handling logic here
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    // Write your upload handling logic here
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="login-form">
          <form>
            <div className="mb-3 input-field">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input type="password" className="form-control" id="currentPassword" />
            </div>
            <div className="mb-3 input-field">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input type="password" className="form-control" id="newPassword" />
            </div>
            <div className="mb-3 input-field">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" />
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

export default SettingsModal;
