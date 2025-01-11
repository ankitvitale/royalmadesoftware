// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";

// function AddCustomer() {
//     const [customers, setCustomers] = useState([]);
//     const [search, setSearch] = useState("")
//     const [filter, setFilter] = useState([])
//     const navigate = useNavigate();
//     const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
//     const myToken = token.token;
//     console.log(myToken);
//     const [currentPage, setCurrentPage] = useState(0);
//     const itemsPerPage = 7;

//     useEffect(() => {
//         async function getBookedCustomer() {
//             try {
//                 const response = await axios.get("http://localhost:8080/bookings/complete", {
//                     headers: {
//                         Authorization: `Bearer ${myToken}`,
//                         "Content-Type": "application/json"
//                     }
//                 });
//                 console.log(response.data);
//                 setFilter(response.data)
//                 setCustomers(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         getBookedCustomer();
//     }, [myToken]);

//     function handleShowmydata(id) {
//         navigate(`/flatowner/${id}`)
//     }

//     useEffect(() => {
//         const searchdata = customers.filter((item, index) => {
//             return item.customer.name.toLowerCase().includes(search.toLowerCase())
//         })
//         setFilter(searchdata)
//     }, [search, customers])

//     const offset = currentPage * itemsPerPage;
//     const currentItems = filter.slice(offset, offset + itemsPerPage);
//     const pageCount = Math.ceil(filter.length / itemsPerPage);

//     const handlePageClick = ({ selected }) => {
//         setCurrentPage(selected);
//     };
//     return (
//         <>

//             <div className="booked_customer_search">
//                 <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Enter Customer Name" />
//             </div>
//             <div className="booked_customer_list_main_wrapper">

//                 <table border="1" cellPadding="10" className="booked_customer_list_wrapper">
//                     <thead className="booked_customer_list_thead">
//                         <tr className="booked_customer_list_tr">
//                             <th className="booked_customer_list_th">Sr. No.</th>
//                             <th className="booked_customer_list_th">Residency Name</th>
//                             <th className="booked_customer_list_th">Customer Name</th>
//                             <th className="booked_customer_list_th">Flat No</th>
//                             <th className="booked_customer_list_th">Availability Status</th>
//                             <th className="booked_customer_list_th">Show Card</th>
//                         </tr>
//                     </thead>
//                     <tbody className="booked_customer_list_tbody">
//                         {currentItems.map((item, index) => (
//                             <tr key={item.id} className="booked_customer_list_tr">
//                                 <td className="booked_customer_list_td">{index + 1}</td>
//                                 <td className="booked_customer_list_td">{item.residency.name}</td>
//                                 <td className="booked_customer_list_td">{item.customer.name}</td>
//                                 <td className="booked_customer_list_td">{item.residency.identifier}</td>
//                                 <td>{item.residency.availabilityStatus}</td>
//                                 <td className="booked_customer_list_td">
//                                     <button onClick={() => handleShowmydata(item.id)} className="booked_customer_list_button"> Show </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 <ReactPaginate
//                     pageCount={pageCount}
//                     pageRangeDisplayed={5}  // You can adjust the range
//                     marginPagesDisplayed={2}
//                     onPageChange={handlePageClick}
//                     containerClassName={"pagination"}
//                     activeClassName={"active"}
//                     breakLabel={"..."}
//                     previousLabel={null}  // Remove previous button
//                     nextLabel={null}  // Remove next button
//                 />

//             </div>


//         </>
//     );
// }

// export default AddCustomer;


import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddCustomer() {
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
    const [residencyName, setResidencyName] = useState([]);
    const [customerBook, setCustomerBooked] = useState([]);
    const [showCustomerTable, setShowCustomerTable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function gettingResidency() {
            try {
                const response = await axios.get("http://localhost:8080/getAllProjects", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setResidencyName(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        gettingResidency();
    }, [token]);

    async function residencyCustomerName(id) {
        try {
            const response = await axios.get(`http://localhost:8080/residenciesByProject/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            setCustomerBooked(response.data);
            setShowCustomerTable(true); // Ensure this is called after data is set
        } catch (error) {
            console.log(error);
        }
    }

    function handleShowDetail(id) {
        console.log(id);
        navigate(`/flatowner/${id}`);
    }

    return (
        <>
            <p style={{ textAlign: "center" }}>AddCustomer</p>

            {/* Residency Name List */}
            <div className="residency_container">
                {residencyName.map((item, index) => (
                    <div
                        key={index}
                        className="customer_residency_name"
                        onClick={() => residencyCustomerName(item.id)} // Fixed the function call
                    >
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>

            {/* Customer Booked List */}
            {showCustomerTable && (
                <div className="booked_customer_main_table_wrapper">
                    <button onClick={() => setShowCustomerTable(false)} className="booked_customer_data_table_close_button" > Close </button>
                    {customerBook.filter((item) => item.availabilityStatus === "BOOKED").length > 0 ? (
                        customerBook
                            .filter((item) => item.availabilityStatus === "BOOKED")
                            .map((item, index) => (
                                <div key={index}>
                                    <table className="booked_customer_data_table">
                                        <thead>
                                            <tr>
                                                <th>Project Name</th>
                                                <th>Flat No</th>
                                                <th>Flat Price</th>
                                                <th>Availability</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{item.project.name}</td>
                                                <td>{item.identifier}</td>
                                                <td>{item.price}</td>
                                                <td>{item.availabilityStatus}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleShowDetail(item.booking.id)}
                                                        className="booked_customer_data_show_button"
                                                    >
                                                        Show Details
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                    ) : (
                        <p className="booked_customer_data_not_found">No Data Found</p>
                    )}
                </div>
            )}
        </>
    );
}

export default AddCustomer;
