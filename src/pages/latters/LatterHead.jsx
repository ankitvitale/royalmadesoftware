import React, { useState } from 'react'
import logo from "../../assets/Royalmedeinfra Logo.svg"
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Logo2 from "../../assets/RoyalmedeLOAN  Logo.svg"
function LatterHead() {
    const [infraletterHead, setinfraletterHead] = useState(false)
    const [LoanLeterhead, setLoanLeterhead] = useState(false)
    const letterref = useRef()
    const loanref = useRef()
    function handleDownlodeInfra() {
        const element = letterref.current;
        const options = {
            margin: 0.5,
            filename: "Letter_Head_infra.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    function handleDownlodeLoan() {
        const element = loanref.current;
        const options = {
            margin: 0.5,
            filename: "Letter_Head_Loan.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    }
    return (
        <>
            <h2 className='letter_head_heading'>
                LatterHeads
            </h2>

            <div className="letter_heads_buttons" >
                <button onClick={() => setinfraletterHead(!infraletterHead)}  > Royaal Infra</button>
                <button onClick={() => setLoanLeterhead(!LoanLeterhead)}> Royaal Loan</button>
            </div>


            {
                infraletterHead && (
                    <>
                        <div className="infra_letter_head_main_wrapper">
                            <div className="downlode_button">
                                <button onClick={handleDownlodeInfra}> DownLode</button>
                            </div>
                            <div className="infraletter_head_wrapper" ref={letterref}>
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
                            </div>
                        </div>




                    </>
                )
            }


            {
                LoanLeterhead && (
                    <>
                        <div className="loan_letter_head_main_wrapper">
                            <div className="downlode_button">
                                <button onClick={handleDownlodeLoan}> DownLode</button>
                            </div>
                            <div className="infraletter_head_wrapper" ref={loanref}>
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
                                        src={Logo2}
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
                            </div>

                        </div>




                    </>
                )
            }


        </>
    )
}

export default LatterHead