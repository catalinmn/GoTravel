import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CommentBox from "./commentBox";

const CustomModal = (props) => {
  return (
    <Modal
      show={props.modalShow}
      onHide={props.modalClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">We want to hear your opinion!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentBox
          updateLocation={props.updateLocation}
          reviews={props.reviews}
          selectedItem={props.selectedItem}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.modalClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
