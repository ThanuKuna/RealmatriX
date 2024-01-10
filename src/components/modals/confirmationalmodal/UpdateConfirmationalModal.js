import React from "react";
import PropTypes from "prop-types";
import { Modal, Button} from "react-bootstrap";

const UpdateConfirmationalModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered backdrop="static" className="confirmmodal-Back">
      <Modal.Header>
        <Modal.Title className="Modal-Title" style={{color:'Green'}}>Conformation to Update Details !</Modal.Title>
      </Modal.Header>
      <Modal.Body className="Modal-Body-Confirm" >
        <p>Are you sure you want to Update this Details ?</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="success" style={{width:'200px'}} onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
};

UpdateConfirmationalModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default UpdateConfirmationalModal;