import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface LogoutModalProps {
  show: boolean;
  onHide: () => void;
  logout: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ show, onHide, logout }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="primary" onClick={logout}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
