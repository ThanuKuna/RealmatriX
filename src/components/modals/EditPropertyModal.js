import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateConfirmationalModal from "./confirmationalmodal/UpdateConfirmationalModal";
import DeleteConfirmationModal from "./confirmationalmodal/DeleteConfirmationalModal";

function EditPropertyModal(props) {
    const { show, onHide, propertyDetails } = props;
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [description, setDescription] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);


    useEffect(() => {
        if (propertyDetails) {
            setName(propertyDetails.name);
            setAddress(propertyDetails.address);
            setType(propertyDetails.type);
            setStatus(propertyDetails.status);
            setPrice(propertyDetails.price);
            setSize(propertyDetails.size);
            setDescription(propertyDetails.description);
            setId(propertyDetails.id)

        }
    }, [propertyDetails]);

    const handleUpdate = (e) => {
        setShowUpdateConfirmModal(true);
    };

    async function handleUpdateConfirmed(e) {
        e.preventDefault();
        if (
            name === propertyDetails.name &&
            address === propertyDetails.address &&
            type === propertyDetails.type &&
            status === propertyDetails.status &&
            price === propertyDetails.price &&
            size === propertyDetails.size &&
            description === propertyDetails.description
        ) {
            toast.info("No data to update");
            setShowUpdateConfirmModal(false);
            return;
        }
        try {
            const updatedProperty = {
                id: id,
                name: name,
                address: address,
                type: type,
                status: status,
                price: price,
                size: size,
                description: description,
            };
            await axios
                .put(`http://127.0.0.1:8000/property/${id}`, updatedProperty)
                .then((response) => {
                    toast.success("Property Updated successfully");
                    onHide();
                    setUpdateTrigger(!updateTrigger);
                });
        } catch (error) {
            alert("Property Update Failed");
            console.error(error);
        }
        setShowUpdateConfirmModal(false);
    }
    const handleDelete = (e) => {
        setShowConfirmModal(true);
    };

    async function handleConfirmed(e) {
        e.preventDefault();
        try {
            await axios
                .delete(`http://127.0.0.1:8000/property/${id}`)
                .then((response) => {
                    toast.success("Property deleted successfully");
                    onHide();
                });
        } catch (error) {
            alert("Property Delete Failed");
            console.error(error);
        }
        setShowConfirmModal(false);
    }



    return (

        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="Modal-Title">Property Details Edit</Modal.Title>
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}

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
                                <select
                                    id="selectAddAttribute-attribute"
                                    className="form-select"
                                    onChange={(e) => setType(e.target.value)}
                                    value={type}
                                >
                                    <option value={""}>--Select an Type--</option>
                                    <option value={"House"}>House</option>
                                    <option value={"Yard"}>Yard</option>
                                    <option value={"Apartments"}>Apartments</option>
                                    <option value={"Yard"}>Hotel</option>
                                    <option value={"Warehouse"}>Warehouse</option>
                                </select>
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
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}

                                >
                                    <option value={""}>--Select an Status--</option>
                                    <option value={"Active"}>Active</option>
                                    <option value={"Pending"}>Pending</option>
                                    <option value={"Sold"}>Sold</option>
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
                <Button variant="primary" style={{ backgroundColor: 'green' }} onClick={handleUpdate}>
                    Update Property
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                <ToastContainer />
                <UpdateConfirmationalModal
                    show={showUpdateConfirmModal}
                    onHide={() => setShowUpdateConfirmModal(false)}
                    onConfirm={handleUpdateConfirmed}
                />
                <DeleteConfirmationModal
                    show={showConfirmModal}
                    onHide={() => setShowConfirmModal(false)}
                    onConfirm={handleConfirmed}
                />
            </Modal.Footer>
        </Modal>
    );
}

export default EditPropertyModal;