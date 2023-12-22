import React, { useState, useEffect } from "react";
import SideClose from "../assets/carbon_side-panel-close.svg";
import FeatherIcon from "feather-icons-react";
import logo from "../assets/logo.svg";
import logos from "../assets/logo-small.svg"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeToggle } from "../redux/actions";
import default_dp from "../assets/avatar.svg";
import axios from "axios";
import "./sidebar.css";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';


function Sidebar({ children }) {
  const [profilepic, setprofilepic] = useState(default_dp);
  const [userdata, setUserData] = useState([]);

  const dispatch = useDispatch();
  const open = useSelector((state) => {
    return state.setting.toggle;
  });

  function toggleDrawer() {
    dispatch(changeToggle(!open));
    // setOpen(!open)
  }

  console.log(open);

  const logoutt = () => {
    sessionStorage.setItem("Clubadmin", false);
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div
          className={
            (!open ? " sidebaar col-xl-2" : " w-100px") +
            " col-auto col-md-1 px-0 bg-white border-right min-vh-100 trans sidebaar"
          }
        >
          <div className="close-btn-container ms-4" onClick={toggleDrawer}>
            <MenuOpenIcon sx={{fontSize:'30px',color:'rgb(255, 30, 0)'}} className={!!open && "rotate-180"}/>
          </div>
          {!open ? (
            <div className="logodashboard ms-4">
              <img
                src={logo}
                alt={""}
                style={{ width: "200px", height: "100px" }}
              />
            </div>
          ) : (
            <div className="logodashboard ms-4 mb-2">
              <img
                src={logos}
                alt={""}
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          )}
          <div className={"w-100 border-bottom-d1d1d1 mb-3"} />
          <div className="d-flex flex-column align-items-center align-items-sm-start px-2 pt-2 text-white pt-5">
            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/dashboard"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="layout"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Dashboard</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/property"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="layers"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>Property</div>}
                </div>
              </NavLink>
            </div>
            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active "
                    : "side-menu-item "
                }
                to={"/user"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="droplet"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={"trans-1"}>User</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/vacination"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="shield"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>other</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 border-bottom-d1d1d1 mb-3"} />

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/settings"}
              >
                <div className={"d-flex"}>
                  <FeatherIcon
                    icon="settings"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Settings</div>}
                </div>
              </NavLink>
            </div>

            <div className={"w-100 px-sm-2"}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "side-menu-item side-menu-active"
                    : "side-menu-item"
                }
                to={"/"}
              >
                <div className={"d-flex"} onClick={logoutt}>
                  <FeatherIcon
                    icon="log-out"
                    className={!open ? "me-2" : "ms-1"}
                  />
                  {!open && <div className={""}>Logout</div>}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col p-0">
          <nav className="navbar navbar-expand-lg bg-white border-bottom-d1d1d1 px-4 navbaar">
            <div className="container-fluid">
              <div className="panelheading">Admin Panel</div>
              <button
                className="navbar-toggler ms-auto"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item px-2 layoutProfilename">
                    {userdata.map((data) => data.employee_Name)}
                  </li>
                  <li className="nav-item px-2">
                      <img
                        src={profilepic}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="40px"
                        height="40px"
                      />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
