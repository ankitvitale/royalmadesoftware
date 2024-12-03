import React, { useState } from "react";
import "./Admin.css";
import logo from "../../assets/royal.png";
import { Link, Outlet } from "react-router-dom";
import { FaHeart, FaHospital, FaUser, FaBars } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import Aadi from "../../components/header/aadi";
import { RiCloseFill } from "react-icons/ri";

function Admin() {
  const [icon, setIcon] = useState(false);
  const [DropdownOpen, setIsDropdownOpen] = useState(false);

  const isDropdownOpen = () => {
    setIsDropdownOpen(!DropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // window.lo cation.href = '/login';
  };

  return (
    <>
      <header className="admin-header">
        <div className="header-icon">
          <img src={logo} alt="" />
        </div>

        {/* <div className="admin-logo">
                    <h5 onClick={() => isDropdownOpen()}><FaUser /> Admin@gmail.com</h5>
                    {DropdownOpen && (
                        <div className="dropdown-menu">

                            <button className='td' onClick={handleLogout}>Logout</button> 

                        </div>
                    )}
        </div> */}

        <div
          className="hidden"
          onClick={() => {
            setIcon(!icon);
          }}
        >
          {icon ? <RiCloseFill /> : <FaBars />}{" "}
        </div>
      </header>
      <aside>
        <div className="sidebar">
          <div className="items">
            <div className="hospital">
              <hr className="sc-dntaoT fviECa" />
              <Link to="">DashBoard</Link>
              <hr className="sc-dntaoT fviECa" />
              <Link to="">Lead Management</Link>
              <hr className="sc-dntaoT fviECa" />
              <Link to="flat">Flat Management</Link>
              <hr className="sc-dntaoT fviECa" />
              <Link to="lands">Land Management</Link>
              <hr className="sc-dntaoT fviECa" />
              <Link to="customer">Customer Details</Link>
              <hr className="sc-dntaoT fviECa" />
              <Link to="material">Material Management</Link>
              <hr className="sc-dntaoT fviECa" />
              <Link to="latter">Latter</Link>
            </div>
          </div>
        </div>
        {icon && (
          <div className="items1">
            <div className="hospital">
              <Link
                to=""
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                Lead Management
              </Link>
              <Link
                to="flat"
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                Flat Management
              </Link>
              <Link
                to="lands"
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                Land Management
              </Link>
              <Link
                to="customer"
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                Customer Details
              </Link>
              <Link
                to="material"
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                Material Management
              </Link>
              <Link
                to="latter"
                onClick={() => {
                  setIcon(!icon);
                }}
              >
                Latter
              </Link>
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
