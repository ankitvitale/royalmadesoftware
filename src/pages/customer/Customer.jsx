// import React, { useState } from "react";
// import "./Customer.css";
// import axios from "axios";

// function Customer() {
//   const [name, setName] = useState("")
//   const [number, setNumber] = useState("")
//   const [email, setEmail] = useState("")
//   const [address, setAddress] = useState("")
//   const [adhar, setAdhar] = useState("")
//   const [panNumber, setPanNumber] = useState("")
//   const [agentName, setAgentName] = useState("")
//   const [brockrage, setBrockrage] = useState("")

//   // Handle form submission to add a new customer
//   const handleAddCustomer = async (e) => {
//     e.preventDefault();
//     const obj = {
//       name,
//       phoneNumber: number,
//       email,
//       aadharNumber: adhar,
//       agentName: agentName,
//       brokerage: brockrage,
//       address: address,
//       panCard: panNumber

//     }
//     console.log(`my obj ${obj}`)
//     try {
//       const response = await axios.post("http://localhost:8080/addCustomer", {
//         obj
//       })
//       console.log(response)
//     } catch (error) {
//       console.log(error)
//     }

//   };

//   return (
//     <>
//       <div className="materialwrapper">
//         <h1>Customer Management System</h1>
//         <div className=" customer_button_group">
//         </div>



//         <form onSubmit={handleAddCustomer} className="customer_form">
//           <div className="customer_input_container">
//             <input type="text" name="customerName" placeholder=" " required value={name} onChange={(e) => setName(e.target.value)} />
//             <label>Customer Name</label>
//           </div>
//           <div className="customer_input_container">
//             <input type="email" name="customerEmail" placeholder=" " required value={email} onChange={(e) => setEmail(e.target.value)} />
//             <label>Customer Email</label>
//           </div>
//           <div className="customer_input_container">
//             <input type="number" name="phoneNumber" placeholder=" " required value={number} onChange={(e) => setNumber(e.target.value)} />
//             <label>Phone Number</label>
//           </div>
//           <div className="customer_input_container">
//             <input type="text" name="address" placeholder=" " required value={address} onChange={(e) => setAddress(e.target.value)} />
//             <label>Address</label>
//           </div>

//           <div className="customer_input_container">
//             <input type="text" name="agentName" placeholder=" " required value={agentName} onChange={(e) => setAgentName(e.target.value)} />
//             <label>Agent Name</label>
//           </div>
//           <div className="customer_input_container">
//             <input type="number" name="adharNumber" placeholder=" " required value={adhar} onChange={(e) => setAdhar(e.target.value)} />
//             <label>Adhar Number</label>
//           </div>
//           <div className="customer_input_container">
//             <input type="number" name="panNumber" placeholder=" " required value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
//             <label>Pan Number</label>
//           </div>
//           <div className="customer_input_container">
//             <input type="number" name="panNumber" placeholder=" " required value={brockrage} onChange={(e) => setBrockrage(e.target.value)} />
//             <label>Brokerage </label>
//           </div>

//           <div className="customer_input_btn">
//             <button type="submit">Add Customer</button>
//           </div>
//         </form>


//       </div>
//     </>
//   );
// }

// export default Customer;

import React, { useState } from "react";
import "./Customer.css";
import axios from "axios";

function Customer() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [adhar, setAdhar] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [agentName, setAgentName] = useState("");
  const [brokerage, setBrokerage] = useState("");

  // Handle form submission to add a new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();

    // Prepare the data object
    const obj = {
      name,
      phoneNumber: number,
      email,
      aadharNumber: adhar,
      address,
      panCard: panNumber,
      agentName,
      brokerage,
    };

    console.log("Sending data:", obj); // Debugging log
    try {
      // Sending the data to the backend
      const response = await axios.post(
        "http://localhost:8080/addCustomer",
        obj
      );
      console.log("Response from server:", response.data);
      alert("Customer added successfully!");
      
      // Optionally reset form fields after successful submission
      setName("");
      setNumber("");
      setEmail("");
      setAddress("");
      setAdhar("");
      setPanNumber("");
      setAgentName("");
      setBrokerage("");
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer. Please try again.");
    }
  };

  return (
    <>
      <div className="materialwrapper">
        <h1>Customer Management System</h1>
        <form onSubmit={handleAddCustomer} className="customer_form">
          <div className="customer_input_container">
            <input
              type="text"
              name="customerName"
              placeholder=" "
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Customer Name</label>
          </div>

          <div className="customer_input_container">
            <input
              type="email"
              name="customerEmail"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Customer Email</label>
          </div>

          <div className="customer_input_container">
            <input
              type="number"
              name="phoneNumber"
              placeholder=" "
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <label>Phone Number</label>
          </div>

          <div className="customer_input_container">
            <input
              type="text"
              name="address"
              placeholder=" "
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Address</label>
          </div>

          <div className="customer_input_container">
            <input
              type="text"
              name="agentName"
              placeholder=" "
              required
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
            />
            <label>Agent Name</label>
          </div>

          <div className="customer_input_container">
            <input
              type="number"
              name="aadharNumber"
              placeholder=" "
              required
              value={adhar}
              onChange={(e) => setAdhar(e.target.value)}
            />
            <label>Aadhar Number</label>
          </div>

          <div className="customer_input_container">
            <input
              type="text"
              name="panCard"
              placeholder=" "
              required
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
            />
            <label>Pan Card</label>
          </div>

          <div className="customer_input_container">
            <input
              type="number"
              name="brokerage"
              placeholder=" "
              required
              value={brokerage}
              onChange={(e) => setBrokerage(e.target.value)}
            />
            <label>Brokerage</label>
          </div>

          <div className="customer_input_btn">
            <button type="submit">Add Customer</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Customer;
