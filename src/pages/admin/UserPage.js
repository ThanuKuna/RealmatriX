import React, { useState, useEffect } from "react";
import "../../App.css";
import "../../Styles/Property.css";
import Sidebar from "../../layouts/Sidebar";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import ViewUserModal from "../../components/modals/ViewUserModal";
import AddUserModal from "../../components/modals/AddUserModal";
import EditUserModal from "../../components/modals/EditUserModal";
import DeleteConfirmationModal from "../../components/modals/confirmationalmodal/DeleteConfirmationalModal";

function UserPage() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [userData, setuserData] = useState([]);
  const [selecteduser, setSelecteduser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [searchTerm3, setSearchTerm3] = useState("");
  const [searchTerm4, setSearchTerm4] = useState("");
  const [selectedStatus, setselectedStatus] = useState("");
  const [filtereduserList, setfiltereduserList] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const userViewModal = (user) => {
    setSelecteduser(user);
    setShowModal(true);
  };

  const userEditModal = (user) => {
    setSelecteduser(user);
    setShowModal3(true);
  };

  useEffect(() => {
    (async () => await fetchData())();
  }, []);


  useEffect(() => {
    fetchData();
  }, [updateTrigger]);

  async function fetchData() {
    try {
      const result = await axios.get("http://127.0.0.1:8000/users");
      setuserData(result.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching Userdata:", error);
    }
  }

  const handleOpen = () => {
    setShowModal2(!showModal2);
    fetchData();
  };

  const handleChange3 = (event) => {
    setSearchTerm3(event.target.value);
  };
  const handleChange4 = (event) => {
    setSearchTerm4(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const selecteduser = userData.find(
      (user) => user.name === searchTerm3
    );
    if (selecteduser) {
      setSelecteduser(selecteduser);
      setShowModal(true);
      setSearchTerm3("");
    } else {
      toast.error("User not Found");
    }
  };


  const handleSearchSubmit2 = (event) => {
    event.preventDefault();
    const selecteduser = userData.find(
      (user) => user.nic === searchTerm4
    );
    if (selecteduser) {
      setSelecteduser(selecteduser);
      setShowModal(true);
      setSearchTerm4("");
    } else {
      toast.error("User not Found");
    }
  };

  const handleStatusChange = (event) => {
    setselectedStatus(event.target.value);
  };
 
  useEffect(() => {
    const filteredData = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm3.toLowerCase()) &&
        (selectedStatus === "" || user.role === selectedStatus) &&
        user.nic.toLowerCase().includes(searchTerm4.toLowerCase())
    );
    setfiltereduserList(filteredData);
  }, [searchTerm3, selectedStatus, searchTerm4, userData]);


  const handleDelete = async (id) => {
    setConfirmModalVisible(true);
    setUserToDelete(id);
  };

  async function DeleteUser(id) {
    setConfirmModalVisible(false);
    await axios.delete("http://127.0.0.1:8000/users/" + id);
    toast.success("User deleted successfully");
    fetchData();
  }


  return (
    <Sidebar>
      <div className="container">
        <nav className="navbar mt-3 py-1 mb-3 rounded">
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <span className="navbar-brand mb-0 h1 text-white">
              User Section
            </span>
          </div>
        </nav>
        <div className="Property-Main-Section p-2">
          <div className="container mb-3 Property-FilterSection d-flex">
            <div className="col-1"></div>
            <div className="col-3">
              <div className="search-input-container mt-4">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    className="SearchBox"
                    type="text"
                    placeholder="Filter by userName"
                    value={searchTerm3}
                    onChange={handleChange3}
                  />
                  <div className="search-icon" onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </div>
                  {searchTerm3 && (
                    <div
                      className="search-icon si2"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "15px",
                      }}
                      onClick={() => setSearchTerm3("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </form>
              </div>
            </div>
            <div className="col-4">
              {" "}
              <div className="search-input-container mt-4 m-5">
                <select
                  className="SearchBox"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                >
                  <option value={""}>--Select an Role--</option>
                  <option value={"Owner"}>Owner</option>
                  <option value={"Seller"}>Seller</option>
                  <option value={"Buyer"}>Buyer</option>
                  <option value={"Admin"}>Admin</option>
                </select>

                {selectedStatus && (
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "8px",
                    }}
                    onClick={() => setselectedStatus("")}
                  >
                    <ClearIcon />
                  </div>
                )}
              </div>
            </div>
            <div className="col-3">
              {" "}
              <div className="search-input-container mt-4">
                <form onSubmit={handleSearchSubmit2}>
                  <input
                    className="SearchBox"
                    type="text"
                    placeholder="Filter by NIC"
                    value={searchTerm4}
                    onChange={handleChange4}
                  />
                  <div className="search-icon" onClick={handleSearchSubmit2}>
                    <SearchIcon />
                  </div>
                  {searchTerm4 && (
                    <div
                      className="search-icon si2"
                      style={{
                        zIndex: "100",
                        backgroundColor: "white",
                        right: "15px",
                      }}
                      onClick={() => setSearchTerm4("")}
                    >
                      <ClearIcon />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="d-flex mb-2 Property-AddedSection">
            <div className="col-12 d-flex AddAttribute-Button-Section p-4">
              <button
                className="d-flex gap-1 btn btn-success"
                onClick={handleOpen}
              >
                Adduser
                <AddCircleIcon />
              </button>
            </div>
          </div>
          <div className="Category-TableSection">
            <table className="table table-striped table-hover">
              <thead className="top-0 position-sticky z-1">
                <tr>
                  <th scope="col" className="col-1">
                    No
                  </th>
                  <th scope="col" className="col-1">
                    UserName
                  </th>
                  <th scope="col" className="col-1">
                    Address
                  </th>
                  <th scope="col" className="col-1">
                    User Role
                  </th>
                  <th scope="col" className="col-1">
                    Email
                  </th>
                  <th scope="col" className="col-1">
                    Contact
                  </th>
                  <th scope="col" className="col-1">
                    NIC
                  </th>
                  <th scope="col" className="col-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtereduserList.length > 0 ? (
                  filtereduserList.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.address}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneno}</td>
                      <td>{user.nic}</td>
                      <td className="col-2">
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => userViewModal(user)}
                        >
                          <VisibilityIcon className="text" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => userEditModal(user)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteIcon className="text-danger" />
                        </IconButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ViewUserModal
        show={showModal}
        onHide={() => setShowModal(false)}
        userDetails={selecteduser}
      />
      <AddUserModal
        show={showModal2}
        onHide={handleOpen}
      />
      <EditUserModal
        show={showModal3}
        onHide={() => {
          setShowModal3(false);
          setUpdateTrigger(!updateTrigger);
        }}
        userDetails={selecteduser}
      />
      <DeleteConfirmationModal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        onConfirm={() => DeleteUser(userToDelete)}
      />
      <ToastContainer />
    </Sidebar>
  );
}

export default UserPage;