import React, { useEffect, useState } from "react";

function AddCustomer() {
    const [customers, setCustomers] = useState([]);
    const [runningProjects, setRunningProjects] = useState([]);

    useEffect(() => {
        const getAllCustomers = async () => {
            try {
                const url = "http://localhost:8080/getAllcustomer";
                const response = await fetch(url, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setCustomers(data);
                console.log("Customers:", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getAllCustomers();
    }, []);

    const handleStartProject = (customerIndex, projectName) => {
        const project = {
            customer: customers[customerIndex],
            projectName,
        };
        setRunningProjects([...runningProjects, project]);
        alert("Project started successfully!");
    };

    return (
        <div className="materialwrapper">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                           <th>ID</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Aadhar Number</th>
                            <th>Agent Name</th>
                            <th>Brokerage</th>
                            {/* <th>Deal Price</th>
                            <th>Token Amount</th>
                            <th>Agreement Amount</th>
                            <th>Stamp Duty Amount</th>
                            <th>Registration Amount</th>
                            <th>GST Amount</th>
                            <th>Electric & Water Charges</th>
                            <th>Legal Charges</th>
                            <th>Booked On</th>
                            <th>Booking Status</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phoneNumber}</td>
                                <td>{customer.email}</td>
                                <td>{customer.aadharNumber}</td>
                                <td>{customer.agentName}</td>
                                <td>{customer.brokerage}</td>
                                {/* <td>{customer.booking?.dealPrice || "N/A"}</td>
                                <td>{customer.booking?.tokenAmount || "N/A"}</td>
                                <td>{customer.booking?.agreementAmount || "N/A"}</td>
                                <td>{customer.booking?.stampDutyAmount || "N/A"}</td>
                                <td>{customer.booking?.registrationAmount || "N/A"}</td>
                                <td>{customer.booking?.gstAmount || "N/A"}</td>
                                <td>{customer.booking?.electricWaterAmmount || "N/A"}</td>
                                <td>{customer.booking?.legalChargesAmmout || "N/A"}</td>
                                <td>{customer.booking?.bookedOn || "N/A"}</td>
                                <td>{customer.booking?.bookingStatus || "N/A"}</td> */}
                             
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AddCustomer;
