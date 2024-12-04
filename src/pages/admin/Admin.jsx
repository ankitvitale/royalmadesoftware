import React, { useState } from "react";
import "./Admin.css";
import logo from "../../assets/royal.png";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaPlus } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";

function Admin() {
  const [icon, setIcon] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    leadManagement: false,
    flatManagement: false,
    landManagement: false,
    customerDetails: false,
    materialManagement: false,
    latter: false,
  });

  const toggleDropdown = (section) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // window.location.href = '/login';
  };

  return (
    <>
      <header className="admin-header">
        <div className="header-icon">
          <img src={logo} alt="" />
        </div>
        <div
          className="hidden"
          onClick={() => {
            setIcon(!icon);
          }}
        >
          {icon ? <RiCloseFill /> : <FaBars />}
        </div>
      </header>

      <aside>
        <div className="sidebar">
          <div className="items">
            <div className="hospital">
              <hr className="sc-dntaoT fviECa" />
              <Link to="">DashBoard</Link>
              <hr className="sc-dntaoT fviECa" />
              <div>
                <Link
                  to="#"
                  onClick={() => toggleDropdown("leadManagement")}
                >
                  Lead Management
                </Link>
                {dropdownOpen.leadManagement && (
                  <div className="dropdown-menu">
                    <Link to="/addlead"> Add</Link>
                    <Link to="">List</Link>
                  </div>
                )}
              </div>
              <hr className="sc-dntaoT fviECa" />

              <div>
                <Link
                  to="#"
                  onClick={() => toggleDropdown("flatManagement")}
                >
                  Flat Management
                </Link>
                {dropdownOpen.flatManagement && (
                  <div className="dropdown-menu">
                    <Link to="/flat-management/add">Add</Link>
                    <Link to="/flat-management/list">List</Link>
                  </div>
                )}
              </div>
              <hr className="sc-dntaoT fviECa" />

              <div>
                <Link
                  to="#"
                  onClick={() => toggleDropdown("landManagement")}
                >
                  Land Management
                </Link>
                {dropdownOpen.landManagement && (
                  <div className="dropdown-menu">
                    <Link to="lands">Add</Link>
                    <Link to="landpurchase">List</Link>
                  </div>
                )}
              </div>
              <hr className="sc-dntaoT fviECa" />

              <div>
                <Link
                  to="#"
                  onClick={() => toggleDropdown("customerDetails")}
                >
                  Customer Details
                </Link>
                {dropdownOpen.customerDetails && (
                  <div className="dropdown-menu">
                    <Link to="/customer">Add</Link>
                    <Link to="/clist">List</Link>
                  </div>
                )}
              </div>
              <hr className="sc-dntaoT fviECa" />

              <div>
                <Link
                  to="#"
                  onClick={() => toggleDropdown("materialManagement")}
                >
                  Material Management
                </Link>
                {dropdownOpen.materialManagement && (
                  <div className="dropdown-menu">
                    <Link to="/material-management/add">Add</Link>
                    <Link to="/material-management/list">List</Link>
                  </div>
                )}
              </div>
              <hr className="sc-dntaoT fviECa" />

              <div>
                <Link
                  to="#"
                  onClick={() => toggleDropdown("latter")}
                >
                  Latter
                </Link>
                {dropdownOpen.latter && (
                  <div className="dropdown-menu">
                    <Link to="/latter/add">Add</Link>
                    <Link to="/latter/list">List</Link>
                  </div>
                )}
              </div>
              <hr className="sc-dntaoT fviECa" />
            </div>
          </div>
        </div>

        {icon && (
          <div className="items1">
            <div className="hospital">
              {/* Mobile view links */}
              {/* Similar links as above can be added here for smaller screen */}
            </div>
          </div>
        )}

        <section>
          <Outlet />
        </section>
      </aside>
    </>
  );
}

export default Admin;
