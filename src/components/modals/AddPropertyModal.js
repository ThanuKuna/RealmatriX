import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPropertyModal(props) {
    const { show, onHide, propertyDetails } = props;
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const resetForm = () => {
        setName("");
        setAddress("");
        setType("");
        setStatus("");
        setPrice("");
        setSize("");
        setDescription("");
    };

    async function addProperty(event) {
        event.preventDefault();
        if (name.length === 0) {
            toast.warning("Fill the Name Field");
        } else if (address.length === 0) {
            toast.warning("Fill the Address Field");
        } else if (type.length === 0) {
            toast.warning("Fill the Type Field");
        } else if (status.length === 0) {
            toast.warning("Fill the Status Field");
        } else if (price.length === 0) {
            toast.warning("Fill the Price Field");
        } else if (size.length === 0) {
            toast.warning("Fill the Size Field");
        } else if (description.length === 0) {
            toast.warning("Fill the Description Field");
        } else {
            try {
                await axios.post("http://127.0.0.1:8000/property", {
                    name: name,
                    address: address,
                    type: type,
                    status: status,
                    size: size,
                    price: price,
                    description: description
                });
                toast.success("Property added Succesfully");
                resetForm();
                setUpdateTrigger(!updateTrigger);
            } catch (err) {
                toast.error("Property added Failed");
            }
        }
    }


    return (

        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="Modal-Title">Property Details ADD</Modal.Title>
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
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
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
                                    onChange={(e) => setAddress(e.target.value)}
                                    value={address}
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
                                    onChange={(e) => setType(e.target.value)}
                                    value={type}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">
                                    Status
                                </label>
                                <select
                                    id="selectAddAttribute-attribute"
                                    className="form-select"
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
                                >
                                    <option>--Select an Attribute--</option>
                                    <option value={"Available"}>Available</option>
                                    <option value={"Non-Available"}>NonAvailable</option>
                                </select>
                                {/* <input
                                    type="text"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    onChange={(e) => setStatus(e.target.value)}
                                    value={status}
                                /> */}
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
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
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
                                    onChange={(e) => setSize(e.target.value)}
                                    value={size}
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
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>
                        </div>
                    </div>
                </>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success" onClick={addProperty}>
                    Add Property
                </Button>
                <Button variant="secondary" onClick={resetForm}>
                    Reset
                </Button>
                <ToastContainer />
            </Modal.Footer>
        </Modal>
    );
}

export default AddPropertyModal;