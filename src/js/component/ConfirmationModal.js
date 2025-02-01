import React from "react";
import { Modal, Button } from "react-bootstrap";//import react into the bundle import React from 'react' 

const ConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Oh Noo!!
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Yes baby!!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
