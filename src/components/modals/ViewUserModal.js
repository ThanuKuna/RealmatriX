import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";

function ViewUserModal(props) {
  const { show, onHide, userDetails } = props;
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header>
        <Modal.Title className="Modal-Title">User Details View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className="d-flex row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  User Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails && userDetails.name}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails && userDetails.address}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="d-flex row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Role
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails && userDetails.role}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails && userDetails.email}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="d-flex row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  NIC
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails && userDetails.nic}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={userDetails && userDetails.phoneno}
                  readOnly
                />
              </div>
            </div>
          </div>
        </>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary"  onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewUserModal;