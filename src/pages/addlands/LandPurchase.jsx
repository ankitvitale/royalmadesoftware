// import React, { useEffect, useState } from 'react';

// function LandPurchase() {
//     const [flats, setFlats] = useState([]);
//     const [runningProjects, setRunningProjects] = useState([]);
//     const [isPartnership, setIsPartnership] = useState(false);

//     useEffect(() => {
//         const getAllLeads = async () => {
//             try {
//                 const url = 'http://localhost:8080/getAllland';
//                 const response = await fetch(url, {
//                     method: 'GET',
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }

//                 const leads = await response.json();
//                 setFlats(leads);
//                 console.log('Leads:', leads);
//                 return leads; // Return or use the leads as needed
//             } catch (error) {
//                 console.error('Error fetching leads:', error);
//             }
//         };

//         // Call the function
//         getAllLeads();
//     }, []);

//     const handleStartProject = (flatIndex, projectName) => {
//         const project = {
//             flat: flats[flatIndex],
//             projectName,
//         };
//         setRunningProjects([...runningProjects, project]);
//         alert("Project started successfully!");
//     };

//     return (
//         <>
//             <div className="materialwrapper">
//                 <div className="table-container">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Purchaser Name</th>
//                                 <th>Address</th>
//                                 <th>Owner Name</th>
//                                 <th>Owner Aadhar Number</th>
//                                 <th>Owner Email</th>
//                                 <th>Owner Phone Number</th>
//                                 <th>Area (sq. ft.)</th>
//                                 <th>Total Amount</th>
//                                 <th>Token Amount</th>
//                                 <th>Agreement Amount</th>
//                                 <th>Sold Amount</th> {/* Added Sold Amount column */}
//                                 <th>Landmark</th>
//                                 <th>City</th>
//                                 <th>State</th>
//                                 <th>Pincode</th>
//                                 <th>Country</th>
//                                 {/* <th>Purchase Type</th> */}
//                                 <th>Partner Name</th>
//                                 <th>Partner Phone</th>
//                                 <th>Partner Amount</th>
//                                 <th>Project Name</th>
//                                 <th>Project Status</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {flats.map((flat, index) => {
//                                 console.log(flat.partners.name)

//                                 const soldAmount = flat.totalAmount - (flat.agreementAmount + flat.tokenAmount);
//                                 const partnerNames = flat.partners?.map(partner => partner.name).join(', ') || "N/A";
//                                 const partnerNumber = flat.partners?.map(partner => partner.phoneNumber).join(', ') || "N/A";
//                                 const partnerAmount = flat.partners?.map(partner => partner.amount).join(', ') || "N/A";

//                                 return (
//                                     <tr key={index}>

//                                         <td>{flat.purchaser?.name}</td>
//                                         <td>{flat.address?.landmark}</td>
//                                         <td>{flat.owner?.name}</td>
//                                         <td>{flat.owner?.aadharNumber}</td>
//                                         <td>{flat.owner?.email}</td>
//                                         <td>{flat.owner?.phoneNumber}</td>
//                                         <td>{flat.area}</td>
//                                         <td>{flat.totalAmount}</td>
//                                         <td>{flat.tokenAmount}</td>
//                                         <td>{flat.agreementAmount}</td>
//                                         <td>{soldAmount}</td> {/* Display Sold Amount */}
//                                         <td>{flat.address?.landmark}</td>
//                                         <td>{flat.address?.city}</td>
//                                         <td>{flat.address?.state}</td>
//                                         <td>{flat.address?.pincode}</td>
//                                         <td>{flat.address?.country}</td>
//                                         {/* <td>{flat.purchaseType}</td> */}
//                                         <td>{partnerNames}</td>
//                                         <td>{partnerNumber}</td>
//                                         <td>{partnerAmount}</td>
//                                         <td>{flat.project?.name}</td>
//                                         <td>{flat.project?.status}</td>
//                                         <td>
//                                             <button
//                                                 onClick={() => {
//                                                     const projectName = prompt("Enter project name:");
//                                                     if (projectName) handleStartProject(index, projectName);
//                                                 }}
//                                             >
//                                                 Start Project
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default LandPurchase;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function LandPurchase() {

  const [getLand, setGetLand] = useState([]);
  const [showCard, setShowCard] = useState(null); // State for single land data
  const navigate = useNavigate();
  const [search, setsearch] = useState("")
  const [filter, setFilter] = useState([])
  const [patnerpay, setpatnerPay] = useState(false)
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [addPatnerPay, setaddPatnerPay] = useState("")
  console.log(addPatnerPay)

  // const [partnerName, setPartnerName] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [refreshKey, setrefreshkey] = useState("")
  useEffect(() => {
    async function getAllLand() {
      const response = await axios.get("http://localhost:8080/getAllland", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setGetLand(response.data);
      setFilter(response.data)
    }
    getAllLand();
  }, [token, refreshKey]);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Data deleted");
      setGetLand((prevLands) => prevLands.filter((land) => land.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(id) {
    console.log(id);
    navigate(`/editland/${id}`);
  }

  function handleShowAllData(id) {
    const singleData = getLand.find((item) => item.id === id);
    setShowCard(singleData);
  }

  function handleCloseCard() {
    setShowCard(null); // Close the card by resetting showCard state
  }
  useEffect(() => {
    const searchfilter = getLand.filter((item) => {
      // Safely check if item.name is defined before calling toLowerCase
      return item.owner.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(searchfilter);
  }, [search, getLand]); // Also add getLand as a dependency to avoid stale closures

  function handlestartProject(id) {
    console.log(id)
    navigate(`/flat/${id}`)
  }
  function handleAddland() {
    navigate("/lands")
  }

  function handleAddPatnerpay(id) {
    // console.log(id)
    setpatnerPay(true)
    setaddPatnerPay(id)
  }

  async function handlepaymentpantner(e) {
    e.preventDefault();

    const formdata = {
      name: stateName,
      city: cityName,
      phoneNumber: phoneNumber,
      amount,
      paymentDate: paymentDate,
      // landId : addPatnerPay
    }
    try {
      const response = await axios.post(`http://localhost:8080/partnerpayment/${addPatnerPay}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response)
      setrefreshkey(refreshKey + 1)
      alert("patner paymet add")
      setStateName("")
      setCityName("")
      setPhoneNumber("")
      setAmount("")
      setPaymentDate("")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="add_land_search">
        <input type="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search ...." />
      </div>
      <div className="addLandButton">
        <button onClick={handleAddland}> Add land</button>
      </div>
      <div className="landperches_wrapper">
        <h1>Land Purchase Details</h1>

        {/* Table for Land Data */}
        <table
          border="1"
          style={{
            width: "100%",
            marginBottom: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th colSpan={1}>Owner Details</th>
              <th colSpan={1}>Royaalmede</th>
              <th colSpan={1}>Partners</th>
              <th colSpan={1}>Address Details</th>
              <th colSpan={1}>Total Amount</th>
              <th colSpan={1}>Token Amount</th>
              <th colSpan={1}>Aggrement Amount</th>
              <th colSpan={1}>Remaining Amount</th>
              <th colSpan={2}>Action</th>
              <th colSpan={1}> Patners Patment</th>
            </tr>
          </thead>
          <tbody>
            {
              filter.map((land, index) => (
                <tr key={index}>
                  <td>{land.owner?.name}</td>
                  {/* <td>{land.owner?.phoneNumber}</td> */}
                  <td>{land.purchaser?.name}</td>
                  {/* <td>{land.purchaser?.phoneNumber}</td> */}
                  <td colSpan={1}>
                    <ul>
                      {land.partners.map((partner) => (
                        <li key={partner.id}>
                          {partner.name} - {partner.amount}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {land.address?.city}, {land.address?.state}
                  </td>
                  <td>{land.totalAmount}</td>
                  <td>{land.tokenAmount}</td>
                  <td>{land.agreementAmount}</td>
                  <td>{Math.max(0, land.totalAmount - (land.agreementAmount + land.tokenAmount))}</td>
                  <td>
                    <button onClick={() => handleEdit(land.id)} className="add_land_edit_button">Edit</button>
                  </td>
                  <td className="mixed_button_add_land">
                    <button onClick={() => handleDelete(land.id)} className="add_land_delete_button">Delete</button>
                    <button onClick={() => handleShowAllData(land.id)} className="add_land_show_button">Show</button>
                    {land.project === null && ( // Show the button only if project is null
                      <button onClick={() => handlestartProject(land.id)} className="add_land_start_button">Start</button>
                    )}
                  </td>
                  <td> <button onClick={() => handleAddPatnerpay(land.id)} className="add_land_add_payment"> Add payment</button></td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Card for Displaying Selected Land Data */}
        {showCard && (
          <div className="card-container">
            <button className="card-close-button" onClick={handleCloseCard}>
              X
            </button>
            <div className="card-header">Land Details</div>
            <div className="card-content">
              <p>
                <strong>Owner Name:</strong> {showCard.owner?.name}
              </p>
              <p>
                <strong>Owner Phone:</strong> {showCard.owner?.phoneNumber}
              </p>
              <p>
                <strong>Purchaser Name:</strong> {showCard.purchaser?.name}
              </p>
              <p>
                <strong>Purchaser Phone:</strong> {showCard.purchaser?.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {showCard.address?.city},{" "}
                {showCard.address?.state}
              </p>
              <p>
                <strong>Agreement Amount:</strong> {showCard.agreementAmount}
              </p>
              <p>
                <strong>Partners Details:</strong>
              </p>
              <hr /> 
              <ul>
                {showCard.partners.map((partner) => (
                  <>
                    <li key={partner.id}>
                      {`Name : ${partner.name} - Amount : ${partner.amount}  `}
                    </li>
                    <li> Patner Number : {partner.phoneNumber}</li>
                    <li> patner City : {partner.city}</li>
                    <li>Patner Payment Date : {partner.paymentDate}</li>
              <hr /> 

                  </>

                ))}
              </ul>
            </div>
          </div>
        )}
      </div>


      {/* patners payment form */}
      {

        patnerpay && (
          <>
            
           
            <div className="add_patner_payment_form_wrapper">
            <div className="close_patner_payment_form">
              <p onClick={() => setpatnerPay(false)}>X</p>
            </div>
              <form onSubmit={handlepaymentpantner} className="add_patner_payment_form">
                <input type="text" placeholder="Enter patner name" value={stateName} onChange={(e) => setStateName(e.target.value)} className="add_patner_payment_form_input" />
                <input type="text" placeholder="Enter city name" value={cityName} onChange={(e) => setCityName(e.target.value)}  className="add_patner_payment_form_input" />
                <input type="number" placeholder="Enter phoneNumber name" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}  className="add_patner_payment_form_input" />
                <input type="number" placeholder="Enter amount name" value={amount} onChange={(e) => setAmount(e.target.value)}  className="add_patner_payment_form_input" />
                <input type="date" placeholder="Enter paymentDate name" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)}  className="add_patner_payment_form_input" />
                <button  className="add_patner_payment_form_submit_button"> submit</button>
              </form>
            </div>
          </>
        )

      }


      {/*  patners payment form end */}
    </>

  );
}

export default LandPurchase;
