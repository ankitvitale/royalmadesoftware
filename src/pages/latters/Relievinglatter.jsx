import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import "./Latter.css";
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import logo from "../../assets/royal.png"
import html2pdf from "html2pdf.js";

function Relievinglatter() {

    const letterRef = useRef();
    const [employeeName, setEmployeeName] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [resignationDate, setResignationDate] = useState("");
    const [lastWorkingDate, setLastWorkingDate] = useState("");
    const [designation, setDesignation] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [Revilingtabledata, setRevilingtabledata] = useState("")
    const [refreshKey, setrefreshKey] = useState("")
    const [showrelivinglatter, setShowRelivinglatter] = useState(false)
    const [myrelivinglatter, setMyrelivinglatter] = useState([])
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Collect form data
        const formdata = {
            employeeName,
            currentDate,
            resignationDate,
            lastWorkingDate,
            designation,
            department,
            location,
        };

        try {
            // Sending data to the Relieving Latter API
            const response = await axios.post("http://localhost:8080/createRelievinglatter", formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            alert("Form submitted successfully!");

            // Reset form fields
            setEmployeeName("");
            setCurrentDate("");
            setResignationDate("");
            setLastWorkingDate("");
            setDesignation("");
            setDepartment("");
            setLocation("");
            setrefreshKey(refreshKey + 1)
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    useEffect(() => {
        async function getrileving() {
            try {
                const response = await axios.get("http://localhost:8080/getAllRelievingLatter", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(response.data)
                setRevilingtabledata(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getrileving()
    }, [refreshKey])

    async function handleshowrevilingletter(id) {
        try {
            const response = await axios.get(`http://localhost:8080/getAllRelievingLatterbyid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            setMyrelivinglatter(response.data)
            setShowRelivinglatter(true)
        } catch (error) {
            console.log(error)
        }
    }
    async function handledeleteRelivingLatter(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/deleteRelievingLatter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            setrefreshKey(refreshKey + 1)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDownload = () => {
        const element = letterRef.current;
        const options = {
            margin: 0.5,
            filename:`Relieving_letter_ ${myrelivinglatter.employeeName}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <>
            <h1 style={{ textAlign: "center" ,marginTop:"50px" }}>Relieving Latter</h1>

            <div className="offer_latter_form_wrapper">
                <form onSubmit={handleSubmit} className="offer_latter_form">
                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Employee Name:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Current Date:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Resignation Date:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={resignationDate}
                            onChange={(e) => setResignationDate(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Last Working Date:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={lastWorkingDate}
                            onChange={(e) => setLastWorkingDate(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Designation:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Department:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Location:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <button type="submit" className="offer_latter_button">Submit</button>
                    </div>
                </form>
            </div>

            {
                <div className="reveling_table_wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Employee Name</th>
                                <th>Current Date</th>
                                <th>Resignation Date</th>
                                <th>Last Working Date</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Location</th>
                                <th> Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Revilingtabledata && Revilingtabledata.length > 0 ? (
                                Revilingtabledata.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index}</td>
                                        <td>{item.employeeName}</td>
                                        <td>{item.currentDate}</td>
                                        <td>{item.resignationDate}</td>
                                        <td>{item.lastworkingdate}</td>
                                        <td>{item.designation}</td>
                                        <td>{item.department}</td>
                                        <td>{item.location}</td>
                                        <td>
                                            <button onClick={() => handleshowrevilingletter(item.id)} className='latter_show_button'> Show</button>
                                            <button onClick={() => handledeleteRelivingLatter(item.id)} className='latter_show_delete'> Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: "center" }}>
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }

            {
                showrelivinglatter && myrelivinglatter && (


                    <div className="relieving_latter_main_container">

                        <button style={{ padding: "10px 20px", cursor: "pointer", marginRight: "10px" }} onClick={handleDownload}>Download Offer Letter</button>
                        <button onClick={() => setShowRelivinglatter(false)}>close</button>
                        <div className="relieving_letter_container"  ref={letterRef}>
                            <div
                                style={{
                                    textAlign: "right",
                                    marginBottom: "20px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    color: "#000",
                                    alignItems: "center"

                                }}
                            >
                                <div className="reliveling_logo_wrapper">
                                    <img
                                        style={{
                                            height: "100px", // Set desired height
                                            width: "auto", // Auto to maintain aspect ratio
                                            objectFit: "contain", // Prevent distortion
                                        }}
                                        src={logo}
                                        alt=""
                                    />
                                    <p>ROYAALMEDE LOAN SOLUTION
                                        ROYAALMEDE JAN DHAN MUILTI URBAN NIDHI LID
                                        (CIN-U65999MH2021PLN356405)</p>
                                </div>

                                <div
                                    style={{
                                        fontFamily: "Arial, sans-serif",
                                        lineHeight: "20px",
                                        width: "100%",
                                        margin: "auto",
                                        padding: "20px",
                                        color: "#000",

                                    }}
                                >
                                    {/* Address Section */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "5px",

                                        }}
                                    >
                                        <div style={{ lineHeight: "30px", marginRight: "30px", width:"100%"}}>
                                            <p>Plot No. 28, 1st Floor, Govind Prabhau Nagar,</p>
                                            <p>Hudkeshwar Road, Nagpur - 440034</p>
                                        </div>
                                        <div
                                            style={{
                                                backgroundColor: "#d34508",
                                                padding: "10px",
                                                borderRadius: "1px",
                                                height: "40px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FaMapMarkerAlt size={18} color="#ffff" />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "5px",

                                        }}
                                    >
                                        <p style={{ marginRight: "30px" }}>royaalmede@gmail.com</p>
                                        <div
                                            style={{
                                                backgroundColor: "#d34508",
                                                padding: "10px",
                                                borderRadius: "1px",
                                                height: "40px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FaEnvelope size={18} color="#ffff" />
                                        </div>
                                    </div>

                                    {/* Website */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <p style={{ marginRight: "30px" }}>www.royaalmede.co.in</p>
                                        <div
                                            style={{
                                                backgroundColor: "#d34508",
                                                padding: "10px",
                                                borderRadius: "1px",
                                                height: "40px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FaGlobe size={18} color="#ffff" />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "5px",

                                        }}
                                    >
                                        <p style={{ marginRight: "30px" }}>9028999253 | 9373450092</p>
                                        <div
                                            style={{
                                                backgroundColor: "#d34508",
                                                padding: "10px",
                                                borderRadius: "1px",
                                                height: "40px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FaPhoneAlt size={18} color="#ffff" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr style={{ border: "1px solid rgb(167, 5, 86)", marginBottom: "2px" }} />
                            <hr style={{ border: "3px solid rgb(167, 5, 86)" }} />

                            <h2 style={{ marginTop: "10px" ,textAlign:"center" }}> Subject - Relieving Letter Cum Experience  Letter</h2>




                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: "5px",
                                padding: "30px",
                                marginLeft: '100px'
                            }}>
                                <p>
                                    Date: <strong> {myrelivinglatter.currentDate}</strong>
                                </p>
                                <p>
                                    Name: <strong> {myrelivinglatter.employeeName}</strong>
                                </p>
                                <p>
                                    Emp ID-: <strong>{myrelivinglatter.empId}</strong>
                                </p>
                            </div>
                            <p style={{ marginLeft: '150px', marginTop: '15px' }}>
                                Dear <span>Somesh Dutta</span>,
                            </p>
                            <p style={{ marginLeft: "150px", marginTop: "20px" }}>
                                With reference to your resignation dated   <b> {myrelivinglatter.resignationDate}   </b>
                                the same has been accepted, and you are relieved from your services
                                w.e.f the close of business hours of  <b>{myrelivinglatter.lastworkingdate || "N/A"}   </b>
                            </p>
                            <p style={{ marginLeft: "150px", marginTop: "15px" }}>The details of your employment with Royaalmede Jan Dhan Multi Urban Nidhi LID are as below:</p>
                            <ul style={{ display: 'flex', flexDirection: "column", gap: "10px", marginLeft: "150px", marginTop: '30px' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                                    <span>Date of Joining:</span> <span className="dynamic">{myrelivinglatter.dateOfjoing || "N/A"} </span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                                    <span>Last Working Date:</span> <span className="dynamic">{myrelivinglatter.lastworkingdate || "N/A"} </span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                                    <span>Designation at the time of exit:</span> <span className="dynamic">{myrelivinglatter.designation}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                                    <span>Department at the time of exit:</span> <span className="dynamic">{myrelivinglatter.department}</span>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', width: '400px' }}>
                                    <span>Location at the time of exit:</span> <span className="dynamic">{myrelivinglatter.location}</span>
                                </li>
                            </ul>

                            <p style={{ marginTop: "20px", marginLeft: "150px" }}>
                                We wish you all the best for your future endeavors.
                            </p>
                            <p style={{ marginTop: "20px", marginLeft: "150px" }}>Thank you.</p>
                            <p style={{ marginTop: "10px", marginLeft: "150px" }}>For Royaalmede Jan Dhan Multi Urban Nidhi LID</p>
                            <div className="signature" style={{ marginLeft: "150px", marginTop: "60px" }}>

                                <p><b>Ankkit Malviya</b></p>
                                <p>Chief Executive Officer</p>
                            </div>

                        </div>

                    </div>

                )
            }


        </>
    );
}

export default Relievinglatter;

