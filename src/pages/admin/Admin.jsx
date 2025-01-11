// import React, { useState } from "react";
// import "./Admin.css";
// import logo from "../../assets/royal.png";
// import { Link, Outlet } from "react-router-dom";
// import { FaBars, FaPlus } from "react-icons/fa";
// import { RiCloseFill } from "react-icons/ri";

// function Admin() {
//   const [icon, setIcon] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState({
//     leadManagement: false,
//     flatManagement: false,
//     landManagement: false,
//     customerDetails: false,
//     materialManagement: false,
//     latter: false,
//   });

//   const toggleDropdown = (section) => {
//     setDropdownOpen((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     // window.location.href = '/login';
//   };

//   return (
//     <>
//       <header className="admin-header">
//         <div className="header-icon">
//           <img src={logo} alt="" />
//         </div>
//         <div
//           className="hidden"
//           onClick={() => {
//             setIcon(!icon);
//           }}
//         >
//           {icon ? <RiCloseFill /> : <FaBars />}
//         </div>
//       </header>

//       <aside>
//         <div className="sidebar">
//           <div className="items">
//             <div className="hospital">
//               <hr className="sc-dntaoT fviECa" />
//               <Link to="/">DashBoard</Link>
//               <hr className="sc-dntaoT fviECa" />
//               <div>
//                 <Link
//                   to="#"
//                   onClick={() => toggleDropdown("leadManagement")}
//                 >
//                   Lead Management
//                 </Link>
//                 {dropdownOpen.leadManagement && (
//                   <div className="dropdown-menu">
//                     <Link to="/addlead"> Add</Link>
//                     <Link to="lead">List</Link>
//                   </div>
//                 )}
//               </div>
//               <hr className="sc-dntaoT fviECa" />

//               <div>
//                 <Link
//                   to="#"
//                   onClick={() => toggleDropdown("flatManagement")}
//                 >
//                   Flat Management
//                 </Link>
//                 {dropdownOpen.flatManagement && (
//                   <div className="dropdown-menu">
//                     <Link to="/flat-management/add">Add</Link>
//                     <Link to="/flat-management/list">List</Link>
//                   </div>
//                 )}
//               </div>
//               <hr className="sc-dntaoT fviECa" />

//               <div>
//                 <Link
//                   to="#"
//                   onClick={() => toggleDropdown("landManagement")}
//                 >
//                   Land Management
//                 </Link>
//                 {dropdownOpen.landManagement && (
//                   <div className="dropdown-menu">
//                     <Link to="lands">Add</Link>
//                     <Link to="landpurchase">List</Link>
//                   </div>
//                 )}
//               </div>
//               <hr className="sc-dntaoT fviECa" />

//               <div>
//                 <Link
//                   to="#"
//                   onClick={() => toggleDropdown("customerDetails")}
//                 >
//                   Customer Details
//                 </Link>
//                 {dropdownOpen.customerDetails && (
//                   <div className="dropdown-menu">
//                     <Link to="/customer">Add</Link>
//                     <Link to="/clist">List</Link>
//                   </div>
//                 )}
//               </div>
//               <hr className="sc-dntaoT fviECa" />

//               <div>
//                 <Link
//                   to="#"
//                   onClick={() => toggleDropdown("materialManagement")}
//                 >
//                   Material Management
//                 </Link>
//                 {dropdownOpen.materialManagement && (
//                   <div className="dropdown-menu">
//                     <Link to="/material-management/add">Add</Link>
//                     <Link to="/material-management/list">List</Link>
//                   </div>
//                 )}
//               </div>
//               <hr className="sc-dntaoT fviECa" />

//               <div>
//                 <Link
//                   to="#"
//                   onClick={() => toggleDropdown("latter")}
//                 >
//                   Latter
//                 </Link>
//                 {dropdownOpen.latter && (
//                   <div className="dropdown-menu">
//                     <Link to="/latter/add">Add</Link>
//                     <Link to="/latter/list">List</Link>
//                   </div>
//                 )}
//               </div>
//               <hr className="sc-dntaoT fviECa" />
//             </div>
//           </div>
//         </div>

//         {icon && (
//           <div className="items1">
//             <div className="hospital">
//               {/* Mobile view links */}
//               {/* Similar links as above can be added here for smaller screen */}
//             </div>
//           </div>
//         )}

//         <section>
//           <Outlet />
//         </section>
//       </aside>
//     </>
//   );
// }

// export default Admin;
// **********************************************
// import React from 'react';
// import { FaTachometerAlt, FaUsers, FaBuilding, FaLandmark, FaBoxes, FaFileAlt } from 'react-icons/fa';
// import './Admin.css';
// import logo from "../../assets/royal.png";
// import { useState } from 'react';
// import { CgProfile } from "react-icons/cg";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useNavigate } from "react-router-dom"
// import { AiOutlineSearch } from 'react-icons/ai';
// import { RiFilePaper2Fill } from "react-icons/ri";
// import { useDrawer } from '../../DrawerContext';
// import { MdCancel } from "react-icons/md";
// import { Link } from 'react-router-dom';
// const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role;
//  console.log(role)

// const Admin = () => {
//   const menuItems = [
//     { text: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
//     { text: 'Lead Management', icon: <FaFileAlt />, path: '/lead' },
//     { text: 'Flat Management', icon: <FaBuilding />, path: '/flat' },
//     { text: 'Land Management', icon: <FaLandmark />, path: '/landpurchase' },
//     { text: 'Customer Details', icon: <FaUsers />, path: '/clist' },
//     { text: 'Material Management', icon: <FaBoxes />, path: '/material' },
//     { text: 'Letter', icon: <RiFilePaper2Fill />, path: '/letter' },
//   ];


//   const { isOpen, openDrawer, setIsOpen } = useDrawer();
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className='header'>
//         <GiHamburgerMenu size={40} color=' #0dada5' onClick={openDrawer} />
//         <div className='searchBar'>
//           <input
//             type='text'
//             placeholder="Search"

//           />
//           <AiOutlineSearch className='icon' />
//         </div>

//         <div className='profile'>
//           <CgProfile size={30} color=' #0dada5' />
//           <span>Royalmede</span>
//         </div>
//       </div>

//       {isOpen &&
//         <div className="sidebar">
//           <div style={{ display: "flex", justifyContent: "right" }}>
//             <MdCancel className='cancel' onClick={() => setIsOpen(!isOpen)} />
//           </div>
//           <div className="sidebar-header">

//             <img height={90} width={200} src={logo} alt="" />

//           </div>
//           <ul className="sidebar-menu">
//             {menuItems.map((item, index) => (
//               <li key={index} className="menu-item">
//                 <Link to={item.path}>
//                   <span className="hicon">{item.icon}</span>
//                   <span className="text">{item.text}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       }

//     </>
//   );
// };

// export default Admin;
// 

// import React, { useState, useEffect } from "react";
// import "./Admin.css";
// import logo from "../../assets/royal.png";
// import { Link, Outlet } from "react-router-dom";
// import { FaBars, FaPlus } from "react-icons/fa";
// import { RiCloseFill } from "react-icons/ri";

// function Admin() {
//   const [icon, setIcon] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState({
//     leadManagement: false,
//     flatManagement: false,
//     landManagement: false,
//     customerDetails: false,
//     materialManagement: false,
//     latter: false,
//   });
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const gettingRole = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
//     setRole(gettingRole.role); // Assuming role is in the fetched data
//   }, []);

//   const toggleDropdown = (section) => {
//     setDropdownOpen((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     // window.location.href = '/login';
//   };

//   return (
//     <>
//       <header className="admin-header">
//         <div className="header-icon">
//           <img src={logo} alt="" />
//         </div>
//         <div
//           className="hidden"
//           onClick={() => {
//             setIcon(!icon);
//           }}
//         >
//           {icon ? <RiCloseFill /> : <FaBars />}
//         </div>
//       </header>

//       <aside>
//         <div className="sidebar">
//           <div className="items">
//             <div className="hospital">
//               <hr className="sc-dntaoT fviECa" />
//               <Link to="/">DashBoard</Link>
//               <hr className="sc-dntaoT fviECa" />

//               {/* Render based on the role */}
//               {role === "Admin" && (
//                 <>
//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("leadManagement")}>
//                       Lead Management
//                     </Link>
//                     {dropdownOpen.leadManagement && (
//                       <div className="dropdown-menu">
//                         <Link to="/addlead">Add</Link>
//                         <Link to="lead">List</Link>
//                         {/* <Link to="editlead"> Edit</Link> */}
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />

//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("flatManagement")}>
//                       Flat Management
//                     </Link>
//                     {dropdownOpen.flatManagement && (
//                       <div className="dropdown-menu">
//                         <Link to="/flat-management/add">Add</Link>
//                         <Link to="/flat-management/list">List</Link>
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />

//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("landManagement")}>
//                       Land Management
//                     </Link>
//                     {dropdownOpen.landManagement && (
//                       <div className="dropdown-menu">
//                         <Link to="lands">Add</Link>
//                         <Link to="landpurchase">List</Link>
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />

//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("customerDetails")}>
//                       Customer Details
//                     </Link>
//                     {dropdownOpen.customerDetails && (
//                       <div className="dropdown-menu">
//                         <Link to="/customer">Add</Link>
//                         <Link to="/clist">List</Link>
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />

//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("materialManagement")}>
//                       Material Management
//                     </Link>
//                     {dropdownOpen.materialManagement && (
//                       <div className="dropdown-menu">
//                         <Link to="/material-management/add">Add</Link>
//                         <Link to="/material-management/list">List</Link>
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />

//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("latter")}>
//                       Latter
//                     </Link>
//                     {dropdownOpen.latter && (
//                       <div className="dropdown-menu">
//                         <Link to="/latter/add">Add</Link>
//                         <Link to="/latter/list">List</Link>
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />
//                 </>
//               )}

//               {role === "Employee" && (
//                 <>
//                   <div>
//                     <Link to="#" onClick={() => toggleDropdown("leadManagement")}>
//                       Lead Management
//                     </Link>
//                     {dropdownOpen.leadManagement && (
//                       <div className="dropdown-menu">
//                         <Link to="/addlead">Add</Link>
//                         <Link to="lead">List</Link>
//                       </div>
//                     )}
//                   </div>
//                   <hr className="sc-dntaoT fviECa" />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {icon && (
//           <div className="items1">
//             <div className="hospital">
//               {/* Mobile view links */}
//               {/* Similar links as above can be added here for smaller screens */}
//             </div>
//           </div>
//         )}

//         <section>
//           <Outlet />
//         </section>
//       </aside>
//     </>
//   );
// }

// export default Admin;


import React from 'react';
import { FaTachometerAlt, FaUsers, FaBuilding, FaLandmark, FaBoxes, FaFileAlt } from 'react-icons/fa';
import './Admin.css';
import logo from "../../assets/royal.png";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from 'react-icons/ai';
import { RiFilePaper2Fill } from "react-icons/ri";
import { useDrawer } from '../../DrawerContext';
import { MdCancel } from "react-icons/md";
import { Link } from 'react-router-dom';

// Fetch the role from localStorage
const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role;

const Admin = () => {
  const navigate = useNavigate();
  const { isOpen, openDrawer, setIsOpen } = useDrawer();

  // Define menu items
  const menuItems = [
    { text: 'Dashboard', icon: <FaTachometerAlt />, path: '/', roles: ['Admin','AppUser'] },
    { text: 'Lead Management', icon: <FaFileAlt />, path: '/lead', roles: ['Admin'] },
    { text: 'Land Management', icon: <FaLandmark />, path: '/landpurchase', roles: ['Admin'] },
    { text: 'Flat Management', icon: <FaBuilding />, path: '/flat', roles: ['Admin'] },
    { text: 'Customer Details', icon: <FaUsers />, path: '/clist', roles: ['Admin'] },
    { text: 'Material Management', icon: <FaBoxes />, path: '/material', roles: ['Admin', 'AppUser'] },
    { text: 'Letter', icon: <RiFilePaper2Fill />, path: '/letter', roles: ['Admin'] },
  ];

  // Filter menu items based on the user's role
  const filteredMenuItems = menuItems.filter((item) => item.roles.includes(role));

  return (
    <>
      <div className='header'>
        <GiHamburgerMenu size={40} color=' #0dada5' onClick={openDrawer} />
        {/* <div className='searchBar'>
          <input
            type='text'
            placeholder="Search"
          />
          <AiOutlineSearch className='icon' />
        </div> */}
        <div className='profile'>
          <CgProfile size={30} color=' #0dada5' />
          <span>Royalmede</span>
        </div>
      </div>

      {isOpen &&
        <div className="sidebar">
          <div style={{ display: "flex", justifyContent: "right" }}>
            <MdCancel className='cancel' onClick={() => setIsOpen(!isOpen)} />
          </div>
          <div className="sidebar-header">
            <img height={90} width={200} src={logo} alt="Logo" />
          </div>
          <ul className="sidebar-menu">
            {filteredMenuItems.map((item, index) => (
              <li key={index} className="menu-item">
                <Link to={item.path}>
                  <span className="hicon">{item.icon}</span>
                  <span className="text">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    </>
  );
};

export default Admin;
