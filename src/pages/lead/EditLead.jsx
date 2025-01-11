// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// function EditLead() {
//   const [name, setName] = useState("");
//   const [lname, setlName] = useState("");
//   const [email, setEmail] = useState("");
//   const [job, setJob] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [componyname, setCompanyName] = useState("");
//   const [date, setdate] = useState("");

//   const {id } = useParams();
//   console.log(id);

//   const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
//   const myToken = token.token;
//   console.log(myToken)
//   useEffect(() => {
//     async function getAllData() {
//         try {
//             const response = await axios.get(`http://localhost:8080/getlead/${id}`, {
//                 method: "GET",
//                 headers: {
//                   Authorization: `Bearer ${myToken}`,
//                   "Content-Type": "application/json",
//                 },
//               });
//               console.log(response.data);
//              const {name,companyName,email,foundOn,jobTitle,phoneNumber}=(response.data);
//              setCompanyName(companyName)
//              setEmail(email)
//              setJob(jobTitle)
//              setName(name)
//              setdate(foundOn)
//              setPhoneNumber(phoneNumber)

//         } catch (error) {
//             console.log(error)
//         }

//     }
//     getAllData();
//   }, []);
//   return (
//     <>
//       <div className="popup">
//         <div className="popup-content">
//           <h2>Edit Lead</h2>
//           <form onSubmit={""}>
//             <div className="input-containerr">
//               <input type="text" name="name" placeholder=" " required  value={name}/>
//               <label>First Name</label>
//             </div>

//             <div className="input-containerr">
//               <input type="text" name="jobTitle" placeholder=" " required  value={job}/>
//               <label>Job Title</label>
//             </div>
//             <div className="input-containerr">
//               <input type="email" name="email" placeholder=" " required  value={email}/>
//               <label>Email</label>
//             </div>
//             <div className="input-containerr">
//               <input type="text" name="phoneNumber" placeholder=" " required value={phoneNumber} />
//               <label>Phone</label>
//             </div>
//             <div className="input-containerr">
//               <input type="text" name="companyName" placeholder=" " required value={componyname} />
//               <label>Company Name</label>
//             </div>


//             <div className="input-containerr">
//               <input type="date" name="foundOn" placeholder=" " required value={date}/>
//               <label>Found On</label>
//             </div>
//             <button type="submit">Update Lead</button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default EditLead;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function EditLead() {
//   const [name, setName] = useState("");
//   const [lname, setlName] = useState("");
//   const [email, setEmail] = useState("");
//   const [job, setJob] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [date, setDate] = useState("");
//   const [leadLogs, setLeadLogs] = useState([]);
//   const [newLog, setNewLog] = useState({
//     logDate: "",
//     status: "",
//   });
//   const [logdate,setLogdate]=useState("")

//   const { id } = useParams();
//   const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
//   const myToken = token.token;
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getAllData() {
//       try {
//         const response = await axios.get(`http://localhost:8080/getlead/${id}`, {
//           headers: {
//             Authorization: `Bearer ${myToken}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log(response.data)
//         const { name, companyName, email, foundOn, jobTitle, phoneNumber, leadLogs } = response.data;
//         const extractedLogDates = leadLogs.map(log => log.logDate); 
//         setLogdate(extractedLogDates)
//         setCompanyName(companyName);
//         setEmail(email);
//         setJob(jobTitle);
//         setName(name);
//         setDate(foundOn);
//         setPhoneNumber(phoneNumber);
//         setLeadLogs(leadLogs || []);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getAllData();
//   }, [id]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const updatedLead = {
//       name,
//       jobTitle: job,
//       email,
//       phoneNumber,
//       companyName,
//       foundOn: date,
//       leadLogs: leadLogs.length ? leadLogs : [newLog], // If leadLogs exist, update them; otherwise, add the new one.
//     };

//     try {
//       const response = await axios.put(
//         `http://localhost:8080/updateLead/${id}`,
//         updatedLead,
//         {
//           headers: {
//             Authorization: `Bearer ${myToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("Lead updated successfully:", response.data);
//       navigate("/leads"); // Navigate to the leads page or wherever appropriate after update
//     } catch (error) {
//       console.error("Error updating lead:", error);
//     }
//   };

//   const handleLogChange = (e) => {
//     const { name, value } = e.target;
//     setNewLog((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="popup">
//       <div className="popup-content">
//         <h2>Edit Lead</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="input-containerr">
//             <input
//               type="text"
//               name="name"
//               placeholder=" "
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <label>First Name</label>
//           </div>

//           <div className="input-containerr">
//             <input
//               type="text"
//               name="jobTitle"
//               placeholder=" "
//               required
//               value={job}
//               onChange={(e) => setJob(e.target.value)}
//             />
//             <label>Job Title</label>
//           </div>
//           <div className="input-containerr">
//             <input
//               type="email"
//               name="email"
//               placeholder=" "
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label>Email</label>
//           </div>
//           <div className="input-containerr">
//             <input
//               type="text"
//               name="phoneNumber"
//               placeholder=" "
//               required
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             <label>Phone</label>
//           </div>
//           <div className="input-containerr">
//             <input
//               type="text"
//               name="companyName"
//               placeholder=" "
//               required
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//             />
//             <label>Company Name</label>
//           </div>

//           <div className="input-containerr">
//             <input
//               type="date"
//               name="foundOn"
//               placeholder=" "
//               required
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//             <label>Found On</label>
//           </div>

//           {/* Render Lead Logs Form if any logs are available */}
//           {leadLogs.length > 0 && (
//             <div>
//             <div className="input-containerr">
//               <input
//                 type="date"
//                 name="logDate"
//                 required
//                 value={logdate}
//                 onChange={handleLogChange}
//               />
//               <label>Log Date</label>
//             </div>

//             <div className="input-containerr">
//               <select
//                 name="status"
//                 required
//                 value={newLog.status}
//                 onChange={handleLogChange}
//               >
//                 <option value="">Select Status</option>
//                 <option value="FOLLOW_UP">FOLLOW_UP</option>
//                 <option value="UNDER_REVIEW">UNDER_REVIEW</option>
//                 <option value="DEMO">DEMO</option>
//                 <option value="NEGOTIATION">NEGOTIATION</option>
//                 <option value="SUCCESS">SUCCESS</option>
//                 <option value="INACTIVE">INACTIVE</option>
//               </select>
//               <label>Status</label>
//             </div>
//           </div>
//           )}



//           <button type="submit">Update Lead</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditLead;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditLead() {
    const [name, setName] = useState("");
    const [lname, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [job, setJob] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [date, setDate] = useState("");
    const [leadLogs, setLeadLogs] = useState([]);
    const [newLog, setNewLog] = useState({
        logDate: "",
        status: "",
    });

    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
    const myToken = token.token;
    const navigate = useNavigate();
    const [reviewdate,setreviewDate]= useState("")
const [customerreview,setCustomerReview]= useState("")
    useEffect(() => {
        async function getAllData() {
            try {
                const response = await axios.get(`http://localhost:8080/getlead/${id}`, {
                    headers: {
                        Authorization: `Bearer ${myToken}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(response.data);
                const { name, companyName, email, foundOn, jobTitle, phoneNumber, leadLogs,remark,remarkdate } = response.data;
                setCompanyName(companyName);
                setEmail(email);
                setJob(jobTitle);
                setName(name);
                setDate(foundOn);
                setPhoneNumber(phoneNumber);
                setLeadLogs(leadLogs || []);
                setreviewDate(remarkdate)
                setCustomerReview(remark)
            } catch (error) {
                console.log(error);
            }
        }
        getAllData();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const updatedLead = {
            name,
            jobTitle: job,
            email,
            phoneNumber,
            companyName,
            foundOn: date,
            leadLogs: leadLogs.length ? leadLogs : [newLog],
            remark:customerreview,
            remarkdate:reviewdate
        };

        try {
            const response = await axios.put(
                `http://localhost:8080/updateLead/${id}`,
                updatedLead,
                {
                    headers: {
                        Authorization: `Bearer ${myToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Lead updated successfully:", response.data);
            navigate("/lead"); // Navigate to the leads page or wherever appropriate after update
        } catch (error) {
            console.error("Error updating lead:", error);
        }
    };

    const handleLogChange = (index, e) => {
        const { name, value } = e.target;
        const updatedLogs = [...leadLogs];  // Create a copy of the current logs
        updatedLogs[index] = { ...updatedLogs[index], [name]: value };  // Update the specific log's status
        setLeadLogs(updatedLogs);  // Update the state with the new leadLogs array
    };


    const addNewLog = () => {
        setLeadLogs([...leadLogs, { logDate: "", status: "" }]);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Edit Lead</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="input-containerr">
                        <input
                            type="text"
                            name="name"
                            placeholder=" "
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label>First Name</label>
                    </div>

                    <div className="input-containerr">
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder=" "
                            required
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                        <label>Job Title</label>
                    </div>
                    <div className="input-containerr">
                        <input
                            type="email"
                            name="email"
                            placeholder=" "
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-containerr">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder=" "
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label>Phone</label>
                    </div>
                    <div className="input-containerr">
                        <input
                            type="text"
                            name="companyName"
                            placeholder=" "
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                        <label>Company Name</label>
                    </div>

                    <div className="input-containerr">
                        <input
                            type="date"
                            name="foundOn"
                            placeholder=" "
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <label>Found On</label>
                    </div>

                    {/* Render Lead Logs Form if any logs are available */}
                    {leadLogs.length > 0 && (
                        <div>
                            {leadLogs.map((log, index) => (
                                <div key={index}>
                                    <div className="input-containerr">
                                        <input
                                            type="date"
                                            name="logDate"
                                            required
                                            value={log.logDate}
                                            onChange={(e) => handleLogChange(index, e)}
                                        />
                                        <label>Log Date</label>
                                    </div>

                                    <div className="input-containerr">
                                        <select
                                            className="editSelect"
                                            required
                                            name="status"  // Ensure the name is correctly set to "status"
                                            value={log.status}
                                            onChange={(e) => handleLogChange(index, e)} // Make sure the function updates the correct field
                                        >
                                            <option value="">Select Status</option>
                                            <option value="FOLLOW_UP">FOLLOW_UP</option>
                                            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                                            <option value="DEMO">DEMO</option>
                                            <option value="NEGOTIATION">NEGOTIATION</option>
                                            <option value="SUCCESS">SUCCESS</option>
                                            <option value="INACTIVE">INACTIVE</option>
                                        </select>

                                        {/* <label>Status</label> */}
                                    </div>
                                </div>
                            ))}
                            {/* <button type="button" onClick={addNewLog}>Add New Log</button> */}
                        </div>
                    )}
    
                 
                    <p>  Customer review</p>
                    <input type="date" placeholder="review date" value={reviewdate}  onChange={(e)=>setreviewDate(e.target.value)}/>
                    <input type="text" placeholder="customer review" value={customerreview}  onChange={(e)=>setCustomerReview(e.target.value)}/>

                    <button type="submit">Update Lead</button>
                </form>
            </div>
        </div>
    );
}

export default EditLead;
