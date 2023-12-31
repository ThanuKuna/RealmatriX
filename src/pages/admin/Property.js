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
import ViewPropertyModal from "../../components/modals/ViewPropertyModal";
import AddPropertyModal from "../../components/modals/AddPropertyModal";
import EditPropertyModal from "../../components/modals/EditPropertyModal";
import DeleteConfirmationModal from "../../components/modals/confirmationalmodal/DeleteConfirmationalModal";

function Property() {
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [propertyData, setpropertyData] = useState([]);
  const [selectedproperty, setSelectedproperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [searchTerm3, setSearchTerm3] = useState("");
  const [selectedStatus, setselectedStatus] = useState("");
  const [selectedType, setselectedType] = useState("");
  const [filteredpropertyList, setfilteredpropertyList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [brandList, setbrandList] = useState([]);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const propertyViewModal = (property) => {
    setSelectedproperty(property);
    setShowModal(true);
  };

  const propertyEditModal = (property) => {
    setSelectedproperty(property);
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
      const result = await axios.get("http://127.0.0.1:8000/property");
      setpropertyData(result.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching Propertydata:", error);
    }
  }

  const handleOpen = () => {
    setShowModal2(!showModal2);
    fetchData();
  };

  const handleChange3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const selectedproperty= propertyData.find(
      (property) => property.name === searchTerm3
    );
    if (selectedproperty) {
      setSelectedproperty(selectedproperty);
      setShowModal(true);
      setSearchTerm3("");
    } else {
      toast.error("Property not Found");
    }
  };

  const handleStatusChange = (event) => {
    setselectedStatus(event.target.value);
  };
  const handleBrandChange = (event) => {
    setselectedType(event.target.value);
  };

  useEffect(() => {
    const filteredData = propertyData.filter(
      (property) =>
        property.name.toLowerCase().includes(searchTerm3.toLowerCase()) &&
        (selectedStatus === "" || property.status === selectedStatus) &&
        (selectedType === "" || property.type === selectedType)
    );
    setfilteredpropertyList(filteredData);
  }, [searchTerm3, selectedStatus, selectedType, propertyData]);


  const handleDelete = async (id) => {
    setConfirmModalVisible(true);
    setPropertyToDelete(id);
  };

  async function DeleteProperty(id) {
    setConfirmModalVisible(false);
    await axios.delete("http://127.0.0.1:8000/property/" + id);
    toast.success("Category deleted successfully");
    fetchData();
  }


  return (
    <Sidebar>
      <div className="container">
        <nav className="navbar mt-3 py-1 mb-3 rounded">
          <div className="container-fluid d-flex align-items-center justify-content-center">
            <span className="navbar-brand mb-0 h1 text-white">
              Property Section
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
                    placeholder="Filter by propertyName"
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
                  <option value={""}>--Select an Status--</option>
                  <option value={"Active"}>Active</option>
                  <option value={"Pending"}>Pending</option>
                  <option value={"Sold"}>Sold</option>
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
                <select
                  className="SearchBox"
                  value={selectedType}
                  onChange={handleBrandChange}
                >
                  <option value={""}>--Select an Type--</option>
                  <option value={"House"}>House</option>
                  <option value={"Yard"}>Yard</option>
                  <option value={"Apartments"}>Apartments</option>
                  <option value={"Yard"}>Hotel</option>
                  <option value={"Warehouse"}>Warehouse</option>
                </select>
                {selectedType && (
                  <div
                    className="search-icon si2"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "5px",
                    }}
                    onClick={() => setselectedType("")}
                  >
                    <ClearIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex mb-2 Property-AddedSection">
            <div className="col-12 d-flex AddAttribute-Button-Section p-4">
              <button
                className="d-flex gap-1 btn btn-success"
                onClick={handleOpen}
              >
                Addproperty
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
                    PropertyName
                  </th>
                  <th scope="col" className="col-1">
                    Address
                  </th>
                  <th scope="col" className="col-1">
                    Type
                  </th>
                  <th scope="col" className="col-1">
                    Status
                  </th>
                  <th scope="col" className="col-1">
                    Size
                  </th>
                  <th scope="col" className="col-1">
                    Price
                  </th>
                  <th scope="col" className="col-1">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredpropertyList.length > 0 ? (
                  filteredpropertyList.map((property, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{property.name}</td>
                      <td>{property.address}</td>
                      <td>{property.type}</td>
                      <td>
                        <div
                          className={
                            property.status === "Active"
                              ? "active"
                              : property.status === "Pending"
                                ? "pending"
                                : "sold"
                          }

                        >
                          {property.status}
                        </div>
                      </td>
                      <td>{property.price}</td>
                      <td>{property.size}</td>
                      <td className="col-2">
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => propertyViewModal(property)}
                        >
                          <VisibilityIcon className="text" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => propertyEditModal(property)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          onClick={() => handleDelete(property.id)}
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
      <ViewPropertyModal
        show={showModal}
        onHide={() => setShowModal(false)}
        propertyDetails={selectedproperty}
      />
      <AddPropertyModal
        show={showModal2}
        onHide={handleOpen}
      />
      <EditPropertyModal
        show={showModal3}
        onHide={() => {
          setShowModal3(false);
          setUpdateTrigger(!updateTrigger);
        }}
        propertyDetails={selectedproperty}
      />
      <DeleteConfirmationModal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        onConfirm={() => DeleteProperty(propertyToDelete)}
      />
      <ToastContainer />
    </Sidebar>
  );
}

export default Property;