import React, { useState, useEffect } from "react";
import "../../App.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddUserModal(props) {
    const { show, onHide, userDetails } = props;
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [role, setrole] = useState("");
    const [email, setemail] = useState("");
    const [phoneno, setphoneno] = useState("");
    const [nic, setnic] = useState("");
    
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const resetForm = () => {
        setName("");
        setAddress("");
        setrole("");
        setemail("");
        setphoneno("");
        setnic("");
    };

    async function addUser(event) {
        event.preventDefault();
        if (name.length === 0) {
            toast.warning("Fill the Name Field");
        } else if (address.length === 0) {
            toast.warning("Fill the Address Field");
        } else if (role.length === 0) {
            toast.warning("Fill the role Field");
        } else if (email.length === 0) {
            toast.warning("Fill the email Field");
        } else if (phoneno.length === 0) {
            toast.warning("Fill the phoneno Field");
        } else if (nic.length === 0) {
            toast.warning("Fill the nic Field");
        }else {
            try {
                await axios.post("http://127.0.0.1:8000/users", {
                    name: name,
                    address: address,
                    role: role,
                    email: email,
                    nic: nic,
                    phoneno: phoneno,
                });
                toast.success("User added Succesfully");
                resetForm();
                setUpdateTrigger(!updateTrigger);
            } catch (err) {
                toast.error("User added Failed");
            }
        }
    }


    return (

        <Modal show={show} onHide={onHide} centered backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="Modal-Title">User Details ADD</Modal.Title>
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
                <Button variant="success" onClick={addUser}>
                    Add User
                </Button>
                <Button variant="secondary" onClick={resetForm}>
                    Reset
                </Button>
                <ToastContainer />
            </Modal.Footer>
        </Modal>
    );
}

export default AddUserModal;