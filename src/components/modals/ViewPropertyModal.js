import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";

function ViewPropertyModal(props) {
  const { show, onHide, propertyDetails } = props;
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
      <Modal.Header>
        <Modal.Title className="Modal-Title">Property Details View</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className="d-flex row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Property Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={propertyDetails && propertyDetails.name}
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
                  value={propertyDetails && propertyDetails.address}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="d-flex row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Type
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={propertyDetails && propertyDetails.type}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Status
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={propertyDetails && propertyDetails.status}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="d-flex row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Price
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={propertyDetails && propertyDetails.price}
                  readOnly
                />
              </div>
            </div>
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Size
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={propertyDetails && propertyDetails.size}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="d-flex row">
            <div className="col-12">
              <div className="form-outline mb-2">
                <label className="form-label" htmlFor="inputAddAttribute-value">
                  Property Description
                </label>
                <textarea
                  type="text"
                  id="inputAddAttribute-value"
                  className="form-control"
                  value={propertyDetails && propertyDetails.description}
                  required
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

export default ViewPropertyModal;