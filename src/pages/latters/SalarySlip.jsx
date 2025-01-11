import axios from 'axios';
import React, { useState } from 'react';
import "./Latter.css";

function SalarySlip() {
    // Defining state variables for the salary slip form fields
    const [employeeName, setEmployeeName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [todayDate, setTodayDate] = useState("");
    const [salaryFrom, setSalaryFrom] = useState("");
    const [salaryTo, setSalaryTo] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Collect form data
        const formdata = {
            employeeName,
            branchName,
            todayDate,
            salaryFrom,
            salaryTo,
            amount,
            status,
        };

        try {
            // Sending data to the Salary Slip API
            const response = await axios.post("http://localhost:8080/createsalarySlip", formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            alert("Form submitted successfully!");

            // Reset form fields
            setEmployeeName("");
            setBranchName("");
            setTodayDate("");
            setSalaryFrom("");
            setSalaryTo("");
            setAmount("");
            setStatus("");
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center",marginTop:"50px" }}>Salary Slip</h1>

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
                        <label className="offer_latter_lable">Branch Name:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={branchName}
                            onChange={(e) => setBranchName(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Today's Date:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={todayDate}
                            onChange={(e) => setTodayDate(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Salary From:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={salaryFrom}
                            onChange={(e) => setSalaryFrom(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Salary To:</label>
                        <input
                            type="date"
                            className="offer_latter_input"
                            value={salaryTo}
                            onChange={(e) => setSalaryTo(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Amount:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <label className="offer_latter_lable">Status:</label>
                        <input
                            type="text"
                            className="offer_latter_input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </div>

                    <div className="offer_latter_div">
                        <button type="submit" className="offer_latter_button">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SalarySlip;
