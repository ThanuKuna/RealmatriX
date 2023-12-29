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
// import DeleteConfirmationModal from "../components/modals/confirmationmodal/DeleteConfirmationModal";
// import AddPropertyfrom "../components/additionals/Addproperty";
// import propertyViewModal from "../components/modals/propertyViewModal";
// import EditPropertyfrom "../components/additionals/Editproperty";

function Property() {
  // const [updateTrigger, setUpdateTrigger] = useState(false);
  const [propertyData, setpropertyData] = useState([]);
  const [selectedproperty, setSelectedproperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [searchTerm3, setSearchTerm3] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredpropertyList, setfilteredpropertyList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [brandList, setbrandList] = useState([]);

  const propertyViewModal = (property) => {
    setSelectedproperty(property);
    setShowModal(true);
  };

  useEffect(() => {
    (async () => await fetchData())();
  }, []);

  // useEffect(() => {
  //   (async () => await fetchCategory())();
  // }, []);

  // useEffect(() => {
  //   (async () => await fetchBrand())();
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [updateTrigger]);

  async function fetchData() {
    try {
      const result = await axios.get("http://127.0.0.1:8000/property");
      setpropertyData(result.data);
    } catch (error) {
      // Handle error
      console.error("Error fetching Propertydata:", error);
    }
  }

  // async function fetchCategory() {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/category");
  //     const activeCategories = response.data.filter(category => category.status === "Active");
  //     setcategoryList(activeCategories);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // }

  // async function fetchBrand() {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/brand");
  //     const activeBrand = response.data.filter(brand => brand.status === "Active");
  //     setbrandList(activeBrand);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // }

  // const [addCategoryModal, setAddCategoryModal] = useState(false);

  // const handleOpen = () => {
  //   setAddCategoryModal(!addCategoryModal);
  // };

  const handleChange3 = (event) => {
    setSearchTerm3(event.target.value);
  };

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   const searchedProperty= propertyData.propertys.find(
  //     (property) => property.serialno === searchTerm3
  //   );
  //   if (searchedproperty) {
  //     setSelectedproperty(searchedproperty);
  //     setShowModal(true);
  //     setSearchTerm3("");
  //   } else {
  //     toast.error("Propertynot Found");
  //   }
  // };

  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // };
  // const handleBrandChange = (event) => {
  //   setSelectedBrand(event.target.value);
  // };

  useEffect(() => {
    const filteredData = propertyData.filter(
      (property) =>
        property.name.toLowerCase().includes(searchTerm3.toLowerCase())
      // (selectedCategory === "" || property.categories === selectedCategory) &&
      // (selectedBrand === "" || property.brand === selectedBrand)
    );
    setfilteredpropertyList(filteredData);
  }, [searchTerm3, propertyData]);

  // const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  // const [selectedpropertyIdToDelete, setSelectedpropertyIdToDelete] = useState(null);

  // const handleDelete = (propertyId) => {
  //   setSelectedpropertyIdToDelete(propertyId);
  //   setShowDeleteConfirmationModal(true);
  // };

  // const handleDeleteConfirmed = async () => {
  //   try {
  //     await axios.delete(http://127.0.0.1:8000/property/${selectedpropertyIdToDelete});
  //     toast.success("Propertydeleted successfully");
  //     setShowDeleteConfirmationModal(false);
  //     setUpdateTrigger(!updateTrigger);
  //   } catch (error) {
  //     console.error("Error deleting property:", error);
  //     toast.error("Error deleting property");
  //     setShowDeleteConfirmationModal(false);
  //   }
  // };

  // const handleDeleteCanceled = () => {
  //   setShowDeleteConfirmationModal(false);
  // };

  // const propertyEditModal = (property) => {
  //   setSelectedproperty(property);
  //   setShowModal2(true);
  //   fetchData();
  // };

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
                <form>
                  <input
                    className="SearchBox"
                    type="text"
                    placeholder="Filter by propertyName"
                    value={searchTerm3}
                    onChange={handleChange3}
                  />
                  <div className="search-icon">
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
                  value={selectedCategory}
                  // onChange={handleCategoryChange}
                >
                  <option value={""}>--Select the Status--</option>
                  {categoryList.map((category) => (
                    <option key={category.id} value={category.categories}>
                      {category.categories}
                    </option>
                  ))}
                </select>

                {selectedCategory && (
                  <div
                    className="search-icon"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "8px",
                    }}
                    onClick={() => setSelectedCategory("")}
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
                  value={selectedBrand}
                  // onChange={handleBrandChange}
                >
                  <option value={""}>--Select the Type--</option>
                  {brandList.map((brand) => (
                    <option key={brand.id} value={brand.brand}>
                      {brand.brand}
                    </option>
                  ))}
                </select>
                {selectedBrand && (
                  <div
                    className="search-icon si2"
                    style={{
                      zIndex: "100",
                      backgroundColor: "white",
                      right: "5px",
                    }}
                    // onClick={() => setSelectedBrand("")}
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
                // onClick={handleOpen}
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
                      <td>{property.status}</td>
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
                          // onClick={() => propertyEditModal(property)}
                        >
                          <EditIcon className="text-success" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          className="viewbutt"
                          // onClick={() => handleDelete(property.id)}
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
      <ToastContainer />
    </Sidebar>
  );
}

export default Property;