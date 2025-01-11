import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Latter.css"
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import logo from "../../assets/royal.png"
import { jsPDF } from "jspdf";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import "@fontsource/roboto"; // Default weight

function Offerlatter() {
    const letterRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cureentDate, setCurrentDate] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [position, setPosition] = useState("");
    const [ctc, setCtc] = useState("");
    const [offerData, setOfferdata] = useState([])
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;
    const [singleOffer, setSingleOffer] = useState("")
    const [showMyofferLatter, setShowMyOfferlatter] = useState(false)
    const [refreshKey,setRefreshKey]= useState("")
    const handleSubmit = async (event) => {
        event.preventDefault();
        // You can process the form data here
        const formdata = {
            name,
            email,
            address,
            phoneNumber,
            cureentDate,
            joiningDate,
            position,
            ctc,
        };
        try {
            const response = await axios.post("http://localhost:8080/createOfferLatter", formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            alert("form Submit Successfully")
            setAddress("")
            setName("")
            setEmail("")
            setPhoneNumber("")
            setCurrentDate("")
            setJoiningDate("")
            setPosition("")
            setCtc("")
        } catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        async function getoffer() {
            try {
                const rsponse = await axios.get("http://localhost:8080/getOfferlatter", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(rsponse.data)
             
                setOfferdata(rsponse.data)
            } catch (error) {
                console.log(error)
            }
        }
        getoffer()
    }, [refreshKey])

    async function ShowofferLatter(id) {
        try {
            const response = await axios.get(`http://localhost:8080/singleOfferlatter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)

            setSingleOffer(response.data)
            setShowMyOfferlatter(true)
        } catch (error) {
            console.log(error)
        }

    }

    async function deleteofferLatter(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/deleteOfferlatter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            setRefreshKey(refreshKey+1)
        } catch (error) {
            console.log(error)
        }

    }
    const handleDownload = () => {
        const element = letterRef.current;
        const options = {
            margin: 0.5,
            filename: `offer_letter_${singleOffer.name}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <>
            <h1 style={{ textAlign: "center",marginTop:"50px" }}>
                Offerlatter
            </h1>

            <div className="offer_latter_form_wrapper">
                <form onSubmit={handleSubmit} className="offer_latter_form">
                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Name:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Email:</label>
                        <input
                            type="email"
                            className="offer_latter_input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Address:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Phone Number:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Current Date:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={cureentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Joining Date:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Position:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">CTC:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={ctc}
                            onChange={(e) => setCtc(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <button type="submit" className="offer_latter_button">Submit</button>
                    </div>
                </form>
            </div>


            <h1>   Offer Table</h1>
            <div className="offer_table_wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Current Date</th>
                            <th>Joining Date</th>
                            <th>Position</th>
                            <th>CTC</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offerData.map((offer,index) => (
                            <tr key={offer.id}>
                                <td>{index}</td>
                                <td>{offer.name}</td>
                                <td>{offer.email}</td>
                                <td>{offer.address}</td>
                                <td>{offer.phoneNumber}</td>
                                <td>{offer.cureentDate}</td>
                                <td>{offer.joiningDate}</td>
                                <td>{offer.position}</td>
                                <td>{offer.ctc}</td>
                                <td>
                                    <button onClick={() => ShowofferLatter(offer.id)} className='latter_show_button'> Show</button>
                                    <button onClick={() => deleteofferLatter(offer.id)} className='latter_show_delete'> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {
                showMyofferLatter && singleOffer && (
                    <div className='offer_latter_main_wrapper'>
                        {/* <button
                            // onClick={handlePrint}
                            style={{ marginRight: "10px", padding: "10px 20px" ,cursor:"pointer" }}
                            onClick={handlePrint}
                        >
                            Print Offer Letter
                        </button> */}
                        <button style={{ padding: "10px 20px", cursor: "pointer", marginRight: "10px" }} onClick={handleDownload}>Download Offer Letter</button>
                        <button style={{ padding: "10px 20px", cursor: "pointer" }} onClick={() => setShowMyOfferlatter(false)}>Close</button>

                        {/* Offer Letter Container */}
                        <div
                            ref={letterRef}
                            style={{
                                fontFamily: "Roboto",
                                width: "100%",
                                margin: "auto",
                                padding: "20px",
                                height: "auto",
                                border: "1px solid #ccc",
                                pageBreakAfter: "always",
                                color: "#000",
                            }}>
                            {/* Header */}
                            <div
                                style={{
                                    textAlign: "right",
                                    marginBottom: "20px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    color: "#000",

                                }}
                            >
                                <img
                                    style={{
                                        height: "120px", // Set desired height
                                        width: "auto", // Auto to maintain aspect ratio
                                        objectFit: "contain", // Prevent distortion
                                    }}
                                    src={logo}
                                    alt=""
                                />
                                <div
                                    style={{
                                        fontFamily: "Arial, sans-serif",
                                        lineHeight: "40px",
                                        width: "80%",
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
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <div style={{ lineHeight: "30px", marginRight: "30px" }}>
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
                                            <FaMapMarkerAlt size={21} color="#ffff" />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "10px",
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
                                            <FaEnvelope size={21} color="#ffff" />
                                        </div>
                                    </div>

                                    {/* Website */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "10px",
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
                                            <FaGlobe size={21} color="#ffff" />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            marginBottom: "10px",
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
                                            <FaPhoneAlt size={21} color="#ffff" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr style={{ border: "1px solid rgb(167, 5, 86)", marginBottom: "2px" }} />
                            <hr style={{ border: "3px solid rgb(167, 5, 86)" }} />
                            <div style={{ lineHeight: "30px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flex: "row",
                                        justifyContent: "space-between",
                                        padding: "30px",
                                    }}
                                >
                                    <div>
                                        <p>
                                            Address: <strong>{singleOffer.address}</strong>
                                        </p>
                                        <p>
                                            Contact No.: <strong>{singleOffer.phoneNumber}</strong>
                                        </p>
                                        <p>
                                            Email: <strong>{singleOffer.email}</strong>
                                        </p>
                                    </div>
                                    <p>Date: {new Date(singleOffer.cureentDate).toLocaleDateString()}</p>
                                </div>

                                {/* Offer Letter Content */}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <h2>OFFER LETTER</h2>
                                </div>

                                <p>
                                    Dear <strong>{singleOffer.name}</strong>,
                                </p>
                                <p>
                                    We are pleased to inform you that you have been selected for a position in
                                    our company. We are offering you the following role in ROYAALMEDE JAN DHAN MULTIURBAN NIDHI LIMITED under the terms and conditions specified below:
                                </p>

                                <ol style={{ marginLeft: "22px", listStyleType: "decimal" }}>
                                    <li>
                                        Your designation/position will be: <strong>{singleOffer.position}</strong>
                                    </li>
                                    <li>
                                        Joining Date: You may join on <strong>{singleOffer.joiningDate}</strong>
                                    </li>
                                    <li>
                                        Compensation & Benefits: Your annual salary will be{" "}
                                        <strong>{singleOffer.ctc}</strong>
                                    </li>
                                </ol>

                                <p>Kindly submit the following documents at the time of joining: </p>
                                <ol style={{ marginLeft: "22px", listStyleType: "decimal" }}>
                                    <li>Self-attested PAN Card copy.</li>
                                    <li>Self-attested copy of Address Proof.</li>
                                    <li>
                                        Self-attested certificates in support of your educational
                                        professional qualifications.
                                    </li>
                                    <li>2 copies of your recent passport-size photographs.</li>
                                    <li>Bank Details (Copy of Passbook/Cancelled Cheque).</li>
                                </ol>

                                <p>
                                    Your position is a whole-time employment with the Company, and you shall devote yourself exclusively to the business and interests of the company. You need to provide a 30-day notice prior to your resignation during your probation period. You will not take up any other work for remuneration or be interested directly or indirectly in any other trade or business during your employment without permission in writing from the company.
                                </p>
                                <p>
                                    We look forward to an exciting journey in the growth of the Company and a successful and rewarding association.
                                </p>
                                <p>Sincerely Yours,</p>

                                {/* Signature Section */}
                                <div style={{ marginTop: "40px" }}>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <strong>ACKNOWLEDGEMENT AND ACCEPTANCE</strong>
                                    </div>
                                    <p>
                                        I have carefully read, considered, and understand the terms and
                                        conditions under which this position is being offered to me and
                                        I hereby signify my acceptance of all the terms and conditions
                                        by returning the duplicate copy of this offer letter.
                                    </p>
                                    <br />
                                    {singleOffer.name}
                                    <p>Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }




        </>

    )
}

export default Offerlatter