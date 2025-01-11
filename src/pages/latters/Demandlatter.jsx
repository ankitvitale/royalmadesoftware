import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from "../../assets/royal.png"
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
function DemandLetter() {
    const letterRef = useRef()
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;
    const [showDemandlatter, setShowDemandlatter] = useState(false)
    const [singleDemadlatter, setsingleDemadlatter] = useState("")
    const [formData, setFormData] = useState({
        name: '',
        faltno: '',
        amount: '',
        sitename: '',
        favorOf: '',
        bankName: '',
        branch: '',
        acNo: ''
    });
    const [alldemandlattertable, setalldemandlattertable] = useState([])
    const [refreshkey, setrefreshKey] = useState("")
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/createDemandLetter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace with actual token
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
                setrefreshKey(refreshkey + 1)
                // Handle success (e.g., show success message, reset form, etc.)
            } else {
                console.log('Failed to submit the form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        async function getallDemand() {
            try {
                const response = await axios.get("http://localhost:8080/getAllDemandLetters", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(response.data)
                setalldemandlattertable(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getallDemand()
    }, [refreshkey])


    const handleDownload = () => {
        const element = letterRef.current;

        // Dynamically get the dimensions of the element
        const width = 750; // A4 width in points (595px for A4 in portrait orientation)
        const height = element.scrollHeight + 220; // Allow for some margin to avoid clipping

        // Adjust html2pdf options dynamically
        const options = {
            margin: [10, 10], // Optional margin for the PDF
            filename: "Demand_lette.pdf",
            image: { type: "jpeg", quality: 0.8 },
            html2canvas: {
                scale: 2, // High quality rendering
                useCORS: true, // Prevent cross-origin issues
            },
            jsPDF: {
                unit: "px",
                format: [width, height],
                orientation: "portrait",
            },
        };

        // Generate and save the PDF
        html2pdf().from(element).set(options).save();
    };
    async function handleDeleteDemand(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/deleteDemandLetter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            setrefreshKey(refreshkey + 1)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleShowdemadlatter(id) {
        try {
            const response = await axios.get(`http://localhost:8080/getDemandLetterById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)

            setsingleDemadlatter(response.data)
            setShowDemandlatter(true)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>


            <div>
                <p style={{ textAlign: "center", marginTop: "50px" }}>
                    Demand Letter
                </p>
                <div className="demand_latter_form_wrapper">
                    <form onSubmit={handleSubmit}  className='demad_latter_form'>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'
                        />
                        <input
                            type="text"
                            name="faltno"
                            placeholder="Falt No"
                            value={formData.faltno}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="sitename"
                            placeholder="Site Name"
                            value={formData.sitename}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="favorOf"
                            placeholder="Favor Of"
                            value={formData.favorOf}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="bankName"
                            placeholder="Bank Name"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="branch"
                            placeholder="Branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="acNo"
                            placeholder="Account No"
                            value={formData.acNo}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <button type="submit"  className='demad_latter_form_submit_button'>Submit</button>
                    </form>
                </div>

            </div>



            {/*  demand latter table   */}
            <div className="demand_latter_table_wrapper" style={{ marginLeft: "260px" }}>
                <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Falt No</th>
                            <th>Amount</th>
                            <th>Site Name</th>
                            <th>Favor Of</th>
                            <th>Bank Name</th>
                            <th>Branch</th>
                            <th>Account No</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alldemandlattertable.map((demand, index) => (
                            <tr key={index}>
                                <td>{demand.name}</td>
                                <td>{demand.faltno}</td>
                                <td>{demand.amount}</td>
                                <td>{demand.sitename}</td>
                                <td>{demand.favorOf}</td>
                                <td>{demand.bankName}</td>
                                <td>{demand.branch}</td>
                                <td>{demand.acNo}</td>
                                <td>
                                    <button onClick={() => handleShowdemadlatter(demand.id)} className='latter_show_button'> Show</button>
                                    <button onClick={() => handleDeleteDemand(demand.id)} className='latter_show_delete'> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* demand latter end */}

            {/* //   ****************** demand latter pdf data  */}
            {
                showDemandlatter && singleDemadlatter && (
                    <div
                        className="demand_latter_main_wrapper"
                        style={{ marginLeft: "260px" }}
                    >
                        <button onClick={handleDownload}> downlode</button>

                        <div className="demand_latter_container">
                            <div
                                ref={letterRef}
                                style={{
                                    fontFamily: "Arial, sans-serif",
                                    width: "100%",
                                    margin: "auto",
                                    padding: "20px",
                                    height: "auto",
                                    border: "1px solid #ccc",
                                    pageBreakAfter: "always",
                                }}
                            >
                                {/* Header */}
                                <div
                                    style={{
                                        textAlign: "right",
                                        marginBottom: "20px",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
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
                                        }}
                                    >
                                        {/* Address Section */}

                                        {/* Address */}
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
                                <hr
                                    style={{
                                        border: "1px solid rgb(167, 5, 86)",
                                        marginBottom: "2px",
                                    }}
                                />
                                <hr style={{ border: "3px solid rgb(167, 5, 86)" }} />

                                <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                                    DEMAND LETTER
                                </h2>
                                <p style={{ marginTop: "5px" }}> To,</p>
                                <p>Mr/Mrs,</p>
                                <b> {singleDemadlatter.name}</b>
                                <p> Address</p>
                                <p style={{ textAlign: "center" }}>
                                    Subject : Demand of Disbursement
                                </p>
                                <p style={{ marginTop: "20px" }}> Ref.Your Flat No <b>{singleDemadlatter.faltno}  </b> </p>

                                <p style={{ marginTop: "30px" }}> Dear Sir / Madam ,</p>
                                <p style={{ marginTop: "10px" }}>
                                    You will be pleased to know that the work the stage maintained
                                    below has been completed within its scheduled course of time.
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    You are requested to release the payment of Rs <b>{singleDemadlatter.amount}</b>
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    Due, against this stage of our site
                                </p>
                                <p style={{ marginTop: "10px" }}> In favor of <b>{singleDemadlatter.favorOf}    </b>  </p>
                                <p style={{ marginTop: "10px" }}> Bank Name <b>{singleDemadlatter.bankName}  </b> </p>
                                <p style={{ marginTop: "10px" }}> Bank Branch  <b> {singleDemadlatter.branch}</b></p>
                                <p style={{ marginTop: "10px" }}> A/c No. <b>  {singleDemadlatter.acNo}</b> </p>
                                <p style={{ marginTop: "10px" }}>
                                    Kindly arrange the same and please extend your esteemed
                                    co-operation to achieve the target in time
                                </p>
                                <p style={{ marginTop: "10px" }}> Thanking you anticipation </p>
                                <p style={{ marginTop: "10px" }}> Yours truly,</p>
                                <p style={{ marginTop: "50px" }}> ( Authorized Signatory)</p>
                            </div>
                        </div>
                    </div>


                )
            }






        </>

    );
}

export default DemandLetter;
