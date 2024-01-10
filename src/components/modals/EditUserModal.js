import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateConfirmationalModal from "./confirmationalmodal/UpdateConfirmationalModal";
import DeleteConfirmationModal from "./confirmationalmodal/DeleteConfirmationalModal";

function EditUserModal(props) {
    const { show, onHide, userDetails } = props;
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [role, setrole] = useState("");
    const [email, setemail] = useState("");
    const [nic, setnic] = useState("");
    const [phoneno, setphoneno] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);


    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name);
            setAddress(userDetails.address);
            setrole(userDetails.role);
            setemail(userDetails.email);
            setnic(userDetails.nic);
            setphoneno(userDetails.phoneno);
            setId(userDetails.id)

        }
    }, [userDetails]);

    const handleUpdate = (e) => {
        setShowUpdateConfirmModal(true);
    };

    async function handleUpdateConfirmed(e) {
        e.preventDefault();
        if (
            name === userDetails.name &&
            address === userDetails.address &&
            nic === userDetails.nic &&
            role === userDetails.role &&
            email === userDetails.email &&
            phoneno === userDetails.phoneno
        ) {
            toast.info("No data to update");
            setShowUpdateConfirmModal(false);
            return;
        }
        try {
            const updateduser = {
                id: id,
                name: name,
                address: address,
                role: role,
                email: email,
                nic: nic,
                phoneno: phoneno
            };
            await axios
                .put(`http://127.0.0.1:8000/users/${id}`, updateduser)
                .then((response) => {
                    toast.success("user Updated successfully");
                    onHide();
                    setUpdateTrigger(!updateTrigger);
                });
        } catch (error) {
            alert("user Update Failed");
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
                .delete(`http://127.0.0.1:8000/users/${id}`)
                .then((response) => {
                    toast.success("user deleted successfully");
                    onHide();
                });
        } catch (error) {
            alert("user Delete Failed");
            console.error(error);
        }
        setShowConfirmModal(false);
    }



    return (

        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="Modal-Title">user Details Edit</Modal.Title>
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
                                    role="text"
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
                                    role="text"
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
                                    Role
                                </label>
                                <select
                                    id="selectAddAttribute-attribute"
                                    className="form-select"
                                    onChange={(e) => setrole(e.target.value)}
                                    value={role}
                                >
                                    <option value={""}>--Select an Role--</option>
                                    <option value={"Owner"}>Owner</option>
                                    <option value={"Seller"}>Seller</option>
                                    <option value={"Buyer"}>Buyer</option>
                                    <option value={"Admin"}>Admin</option>
                                    
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">
                                    Email
                                </label>
                                <input
                                    role="text"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    onChange={(e) => setemail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex row">
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">
                                    Contact
                                </label>
                                <input
                                    role="text"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    onChange={(e) => setphoneno(e.target.value)}
                                    value={phoneno}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">
                                    NIC
                                </label>
                                <input
                                    role="text"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    onChange={(e) => setnic(e.target.value)}
                                    value={nic}
                                />
                            </div>
                        </div>
                    </div>
                </>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" style={{ backgroundColor: 'green' }} onClick={handleUpdate}>
                    Update User
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

export default EditUserModal;