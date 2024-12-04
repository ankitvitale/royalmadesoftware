

import React, { useEffect, useState } from 'react';

function LandPurchase() {
    const [flats, setFlats] = useState([]);
    const [runningProjects, setRunningProjects] = useState([]);
    const [isPartnership, setIsPartnership] = useState(false);
    useEffect(() => {
        const getAllLeads = async () => {
            try {
                const url = 'http://localhost:8080/getAllland';
                const response = await fetch(url, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const leads = await response.json();
                setFlats(leads);
                console.log('Leads:', leads);
                return leads; // Return or use the leads as needed
            } catch (error) {
                console.error('Error fetching leads:', error);
            }
        };

        // Call the function
        getAllLeads();
    }, []);
    const handleStartProject = (flatIndex, projectName) => {
        const project = {
            flat: flats[flatIndex],
            projectName,
        };
        setRunningProjects([...runningProjects, project]);
        alert("Project started successfully!");
    };
    return (
        <>
            <div className="materialwrapper">


                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Purchaser Name</th>
                                <th>Address</th>
                                <th>Owner Name</th>
                                <th>Owner Aadhar Number</th>
                                <th>Owner Email</th>
                                <th>Owner Phone Number</th>
                                <th>Area (sq. ft.)</th>
                                <th>Total Amount</th>
                                <th>Token Amount</th>
                                <th>Agreement Amount</th>
                                <th>Landmark</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Pincode</th>
                                <th>Country</th>
                                <th>Purchase Type</th>
                                <th>Partner Name</th>
                                <th>Partner Phone</th>
                                <th>Partner Amount</th>
                                <th>Project Name</th>
                                <th>Project Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flats.map((flat, index) => (
                                <tr key={index}>
                                    <td>{flat.purchaser?.name}</td>
                                    <td>{flat.address?.landmark}</td>
                                    <td>{flat.owner?.name}</td>
                                    <td>{flat.owner?.aadharNumber}</td>
                                    <td>{flat.owner?.email}</td>
                                    <td>{flat.owner?.phoneNumber}</td>
                                    <td>{flat.area}</td>
                                    <td>{flat.totalAmount}</td>
                                    <td>{flat.tokenAmount}</td>
                                    <td>{flat.agreementAmount}</td>
                                    <td>{flat.address?.landmark}</td>
                                    <td>{flat.address?.city}</td>
                                    <td>{flat.address?.state}</td>
                                    <td>{flat.address?.pincode}</td>
                                    <td>{flat.address?.country}</td>
                                    <td>{flat.purchaseType}</td>
                                    <td>{flat.partners?.[0]?.name || "N/A"}</td>
                                    <td>{flat.partners?.[0]?.phoneNumber || "N/A"}</td>
                                    <td>{flat.partners?.[0]?.amount || "N/A"}</td>
                                    <td>{flat.project?.name}</td>
                                    <td>{flat.project?.status}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                const projectName = prompt("Enter project name:");
                                                if (projectName) handleStartProject(index, projectName);
                                            }}
                                        >
                                            Start Project
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>

    );
}

export default LandPurchase;
