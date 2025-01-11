// import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import "./Lead.css";
// import axios from "axios";

// function Lead() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [leads, setLeads] = useState([]);
//   const [currentProcessId, setCurrentProcessId] = useState(null);
//   const currentDate = new Date();
//   const year = currentDate.getFullYear(); // Get the year
//   const month = currentDate.getMonth() + 1; // Get the month (0-indexed, so add 1)
//   const date = currentDate.getDate(); // Get the date

//   const mycurrentData=  (`${year} -${month}- ${date}`);
//   const steps = [
//     "New Leads",
//     "Follow-ups",
//     "Under Review",
//     "Demo",
//     "Negotiation",
//     "Won",
//   ];

//   useEffect(() => {
//     const getAllLeads = async () => {
//       try {
//         const url = 'http://localhost:8080/getAllLeads';
//         const response = await fetch(url, {
//           method: 'GET',
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const leads = await response.json();
//         setLeads(leads);
//         console.log('Leads:', leads);
//         return leads; // Return or use the leads as needed
//       } catch (error) {
//         console.error('Error fetching leads:', error);
//       }
//     };

//     // Call the function
//     getAllLeads();
//   }, []);

//   const handleStepChange = (leadId, newStep) => {
//     setLeads((prevLeads) =>
//       prevLeads.map((lead) =>
//         lead.id === leadId
//           ? {
//               ...lead,
//               step: newStep, // Update the 'step'
//               dates: {
//                 ...lead.dates,
//                 [newStep]: new Date().toLocaleDateString(),
//               },
//             }
//           : lead
//       )
//     );
//   };

//   const fnProcess =  (id) => {
//     console.log(id)
//     setCurrentProcessId((prevId) => (prevId === id ? null : id));

//   };

//   return (
//     <>
//       <div className="leadwrapper">

//         {currentProcessId && (
//           <div className="steps">
//             {steps.map((currentStep) => (
//               <div key={currentStep} className="step">
//                 <h2>{currentStep}</h2>
//                 {leads
//                   .filter(
//                     (lead) =>
//                       lead.id === currentProcessId && lead.step === currentStep // Filtering by currentProcessId and step
//                   )
//                   .map((lead) => (
//                     <div key={lead.id} className="lead">
//                       <p>
//                         {lead.name} {lead.lastName}
//                       </p>
//                       <select
//                         value={lead.step}
//                         onChange={(e) =>
//                           handleStepChange(lead.id, e.target.value)
//                         }
//                       >
//                         {steps
//                           .slice(steps.indexOf(currentStep))
//                           .map((stepOption) => (
//                             <option key={stepOption} value={stepOption}>
//                               {stepOption} (
//                               {lead.dates[stepOption] || "Not started"})
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   ))}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div>
//         <div className="won-leads">
//           <h2>All Leads</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Date</th>
//                 <th>Job Title</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Company</th>
//                 <th>Status</th>
//                 <th>Won Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead.id}>
//                   <td>{lead.name}</td>
//                   <td>{lead.foundOn}</td>
//                   <td>{lead.jobTitle}</td>
//                   <td>{lead.email}</td>
//                   <td>{lead.phoneNumber}</td>
//                   <td>{lead.companyName}</td>
//                   <td>{lead.status}</td>
//                   <td>{'NA'}</td>
//                   <td>
//                     <button onClick={() => fnProcess(lead.id)}>Steps</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//      <div className="stepform_container">
//       <form action="" className="step_from">
//         <input type="date" />
//         <select name="" id="">
//           <option value="NEW_LEAD">NEW_LEAD</option>
//           <option value="FOLLOW_UP">FOLLOW_UP</option>
//           <option value="UNDER_REVIEW">UNDER_REVIEW</option>
//           <option value="DEMO">DEMO</option>
//           <option value="NEGOTIATION">NEGOTIATION</option>
//           <option value="SUCCESS">SUCCESS</option>
//           <option value="INACTIVE">INACTIVE</option>
//         </select>
//         <button>submit</button>
//       </form>
//      </div>
//     </>
//   );
// }

// export default Lead;

// import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import "./Lead.css";
// import axios from "axios";
// *********************************************************************
// function Lead() {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [leads, setLeads] = useState([]);

//   const [currentProcessId, setCurrentProcessId] = useState(null);
//   const [formData, setFormData] = useState({
//     id: null,
//     date: "",
//     step: "",
//   });
//   const [card,setcard]=useState('')
//   const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
//   const myToken = token.token;

//   useEffect(() => {
//     const getAllLeads = async () => {
//       try {
//         const url = "http://localhost:8080/getAllLeads";
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${myToken}`, // Adding the token in the Authorization header
//             "Content-Type": "application/json", // Optional, but good practice
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const leads = await response.json();
//         setLeads(leads);
//         console.log("Leads:", leads);
//       } catch (error) {
//         console.error("Error fetching leads:", error);
//       }
//     };

//     getAllLeads();
//   }, [isPopupOpen]);

//   // const handleStepChange = (leadId, newStep) => {
//   //   setLeads((prevLeads) =>
//   //     prevLeads.map((lead) =>
//   //       lead.id === leadId
//   //         ? {
//   //             ...lead,
//   //             step: newStep,
//   //             dates: {
//   //               ...lead.dates,
//   //               [newStep]: new Date().toLocaleDateString(),
//   //             },
//   //           }
//   //         : lead
//   //     )
//   //   );
//   // };

//   // const fnProcess = (id) => {
//   //   setCurrentProcessId((prevId) => (prevId === id ? null : id));

//   // };

//   const openPopup = (id) => {
//     setFormData({ ...formData, id }); // Set the selected lead ID in formData
//     setIsPopupOpen(true);
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false);
//     setFormData({
//       id: null,
//       date: "",
//       step: "",
//     });
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     const { id, date, step } = formData;

//     console.log("Form Submitted with ID:", id);
//     console.log("Date:", date);
//     console.log("Step:", step);

//     // Retrieve the token from localStorage (make sure it's correctly stored there)
//     // or sessionStorage.getItem('authToken')

//     // Check if token exists
//     if (!token) {
//       console.error("No token found. Please log in.");
//       return;
//     }

//     // Construct the logs payload as per your API requirements
//     const leadLogs = [{ logDate: date, status: step }];

//     // Send data to the backend with token in the header
//     axios
//       .post(
//         `http://localhost:8080/${id}/addLogs`,
//         leadLogs, // Send leadLogs instead of { id, date, step }
//         {
//           headers: {
//             Authorization: `Bearer ${myToken}`, // Pass token in the header
//             "Content-Type": "application/json", // Optional, but good practice
//           },
//         }
//       )
//       .then((response) => {
//         console.log("Lead updated successfully:", response.data);

//         // Update the local leads state with the new data
//         setLeads((prevLeads) =>
//           prevLeads.map((lead) =>
//             lead.id === id
//               ? { ...lead, step, dates: { ...lead.dates, [step]: date } }
//               : lead
//           )
//         );

//         closePopup(); // Close the popup
//       })
//       .catch((error) => {
//         console.error("Error updating lead:", error);
//         // Display error message based on status code
//         if (error.response && error.response.status === 401) {
//           console.error(
//             "Unauthorized access. Please check your authentication."
//           );
//         }
//       });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   async function handlegetNewLead(id) {
//     console.log(id);
//     try {
//       const newLead = await axios.get(`http://localhost:8080/getlead/${id}`, {
//         headers: {
//           Authorization: `Bearer ${myToken}`, // Pass token in the header
//           "Content-Type": "application/json", // Optional, but good practice
//         },
//       });
//       console.log("afterClick",newLead.data)
//       setcard(newLead.data)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <div className="leadwrapper">
//         {currentProcessId && (
//           <div className="steps">
//             <h2>Lead Steps</h2>
//             <button onClick={() => openPopup(currentProcessId)}>
//               Open Form
//             </button>
//           </div>
//         )}
//       </div>

//       <div>
//         <div className="won-leads">
//           <h2>All Leads</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Date</th>
//                 <th>Job Title</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Company</th>
//                 <th>Status</th>
//                 <th>Won Date</th>
//                 <th>Action</th>
//                 <th>View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead.id}>
//                   <td>{lead.name}</td>
//                   <td>{lead.foundOn}</td>
//                   <td>{lead.jobTitle}</td>
//                   <td>{lead.email}</td>
//                   <td>{lead.phoneNumber}</td>
//                   <td>{lead.companyName}</td>
//                   <td>{lead.status}</td>
//                   <td>{"NA"}</td>

//                   <td>
//                     <button onClick={() => openPopup(lead.id)}>Steps</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handlegetNewLead(lead.id)}>
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isPopupOpen && (
//         <div className="stepform_container">
//           <div className="popup">
//             <button className="close-btn" onClick={closePopup}>
//               X
//             </button>
//             <form className="step_from" onSubmit={handleFormSubmit}>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleFormChange}
//                 required
//               />
//               <select
//                 name="step"
//                 value={formData.step}
//                 onChange={handleFormChange}
//                 required
//               >
//                 <option value="">Select Step</option>
//                 <option value="FOLLOW_UP">FOLLOW_UP</option>
//                 <option value="UNDER_REVIEW">UNDER_REVIEW</option>
//                 <option value="DEMO">DEMO</option>
//                 <option value="NEGOTIATION">NEGOTIATION</option>
//                 <option value="SUCCESS">SUCCESS</option>
//                 <option value="INACTIVE">INACTIVE</option>
//               </select>
//               <button type="submit">Submit</button>
//             </form>
//           </div>
//         </div>
//       )}

// {
//   card && (
//     <div className="card-details">
//       <h3>Lead Details</h3>
//       <p><strong>Name:</strong> {card.name}</p>
//       <p><strong>Found On:</strong> {card.foundOn}</p>
//       <p><strong>Job Title:</strong> {card.jobTitle}</p>
//       <p><strong>Email:</strong> {card.email}</p>
//       <p><strong>Phone:</strong> {card.phoneNumber}</p>
//       <p><strong>Company:</strong> {card.companyName}</p>
//       <p><strong>Status:</strong> {card.status}</p>

//       {/* Render Lead Logs */}
//       {card.leadLogs && card.leadLogs.length > 0 && (
//         <div className="lead-logs">
//           <h4>Lead Logs:</h4>
//           <ul>
//             {card.leadLogs.map((log) => (
//               <li key={log.id}>
//                 <p><strong>Log Date:</strong> {log.logDate}</p>
//                 <p><strong>Status:</strong> {log.status}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   )
// }
//     </>
//   );
// }

// export default Lead;

// *ha maza code ahe**********************************************************************************************


import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../lead/Lead.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from 'react-icons/ai';
import AddLead from "./AddLead";
import ReactPaginate from "react-paginate";
import Swal from 'sweetalert2';


function Lead() {
  const [showAddlead, setShowAddlead] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [currentProcessId, setCurrentProcessId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    date: "",
    step: "",
  });
  const [card, setCard] = useState(null);
  console.log(`481 ${card}`)
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
  const myToken = token.token;
  const navigate = useNavigate()
  const [review, setreview] = useState(false)
  const [getLeadId, setGetleadId] = useState("")
  console.log(getLeadId)
  const [reviewdata, setReviewdate] = useState("")
  const [Addreview, setAddreview] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;


  useEffect(() => {
    const getAllLeads = async () => {
      try {
        const url = "http://localhost:8080/getAllLeads";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${myToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const leads = await response.json();


        setLeads(leads);
        setFilter(leads);

        console.log("Leads:", leads);

      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    getAllLeads();
  }, [isPopupOpen, showAddlead]);

  const openPopup = (id) => {
    setFormData({ ...formData, id });
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      id: null,
      date: "",
      step: "",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { id, date, step } = formData;

    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    const leadLogs = [{ logDate: date, status: step }];

    axios
      .post(
        `http://localhost:8080/${id}/addLogs`,
        leadLogs,
        {
          headers: {
            Authorization: `Bearer ${myToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Lead updated successfully:", response.data);

        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === id
              ? { ...lead, step, dates: { ...lead.dates, [step]: date } }
              : lead
          )
        );

        closePopup();
      })
      .catch((error) => {
        console.error("Error updating lead:", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access. Please check your authentication.");
        }
      });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  async function handlegetNewLead(id) {
    try {
      const newLead = await axios.get(`http://localhost:8080/getlead/${id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(newLead.data)
      setCard(newLead.data);
    } catch (error) {
      console.log(error);
    }
  }

  // async function handledelete(id) {
  //   try {
  //     await axios.delete(`http://localhost:8080/deleteLead/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${myToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     alert("Lead deleted successfully.")
  //     setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async function handledelete(id) {
    // Show confirmation dialog before proceeding with deletion
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
        try {
            // Make the delete request
            await axios.delete(`http://localhost:8080/deleteLead/${id}`, {
                headers: {
                    Authorization: `Bearer ${myToken}`,
                    "Content-Type": "application/json",
                },
            });

            // Remove the lead from the state after successful deletion
            setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));

            // Show success message
            Swal.fire('Deleted!', 'Your lead has been deleted.', 'success');
        } catch (error) {
            console.log(error);
            Swal.fire('Error!', 'There was a problem deleting the lead.', 'error');
        }
    }
}

  function handleEditLead(id) {

    navigate(`/editlead/ ${id}`)
  }

  async function handleAddReview(id) {
    console.log(id)
    setGetleadId(id)
    setreview(true)
  }
  function handleClosereview() {
    setreview(false)
  }

  async function handleAddreview(e) {
    e.preventDefault();
    const obj = {
      remark: Addreview,
      remarkdate: reviewdata
    }
    try {
      const reponse = await axios.post(`http://localhost:8080/remark/${getLeadId}/remark`, obj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`
        }
      })
      console.log(reponse)
      alert("review add")
      setAddreview("")
      setReviewdate("")
      setreview(false)

    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    const searchdata = leads.filter((item, index) => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    setFilter(searchdata)
  }, [search, leads])


  function closeAddLead() {
    setShowAddlead(false)
  }

  //  Pagination logic
  const offset = currentPage * itemsPerPage;
  const currentItems = filter.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filter.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <>
      <div className="leadwrapper">
        {currentProcessId && (
          <div className="steps">
            <h2>Lead Steps</h2>
            <button onClick={() => openPopup(currentProcessId)}>Open Form</button>
          </div>
        )}
      </div>
      <div className="lead_show_table">
        <div className="won-leads" style={{ padding: "30px" }}>
          <h2 >All Leads</h2>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div className='searchBar'>
              <input
                type="search" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)}

              />
              <AiOutlineSearch className='icon' />
            </div>
            <button className="lead-btn" onClick={() => setShowAddlead(!showAddlead)}>Add Lead</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Date</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                {/* <th>Won Date</th> */}
                <th>Action</th>
                <th>View</th>
                <th> delete</th>
                <th>Add Review</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((lead) => (

                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.foundOn}</td>
                  <td>{lead.jobTitle}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phoneNumber}</td>
                  <td>{lead.companyName}</td>
                  <td>{lead.status}</td>
                  {/* <td>{"NA"}</td> */}

                  <td>
                    <button className="step1" onClick={() => openPopup(lead.id)}>Steps</button>
                  </td>
                  <td>
                    <button className="view" onClick={() => handlegetNewLead(lead.id)}>View</button>
                  </td>
                  <td>
                    <button className="delete" onClick={() => handledelete(lead.id)}> Delete</button>
                    <button className="edit" onClick={() => handleEditLead(lead.id)}>Edit</button>
                  </td>
                  <td> <button className="review" onClick={() => handleAddReview(lead.id)}>Add Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}  // You can adjust the range
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            breakLabel={"..."}
            previousLabel={null}  // Remove previous button
            nextLabel={null}  // Remove next button
          />

        </div>
      </div>

      {isPopupOpen && (
        <div className="stepform_container">
          <div className="stepForm_popup">
            <button className="StepForm_close_btn" onClick={closePopup}>
              X
            </button>
            <form className="step_from" onSubmit={handleFormSubmit}>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
              <select
                name="step"
                value={formData.step}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Step</option>
                <option value="FOLLOW_UP">FOLLOW_UP</option>
                <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                <option value="DEMO">DEMO</option>
                <option value="NEGOTIATION">NEGOTIATION</option>
                <option value="SUCCESS">SUCCESS</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
      <div className="main_card_wrapper">
        {card && (
          <div className="final_card_details">
            <div className="Final_card_popup">
              <button className="finalCardClose" onClick={() => setCard(null)}>
                X
              </button>
              <h3>Lead Details</h3>
              <div className="lead_detail_wrapper">
                <p><strong>Name:</strong> {card.name}</p>
                <p><strong>Found On:</strong> <br /> {card.foundOn}</p>
                <p><strong>Job Title:</strong> <br /> {card.jobTitle}</p>
                <p><strong>Email:</strong> {card.email}</p>
                <p><strong>Phone:</strong> {card.phoneNumber}</p>
                <p><strong>Company:</strong> {card.companyName}</p>
                <p><strong>Status:</strong> {card.status}</p>
              </div>
              {/* Render Lead Logs */}
              {card.leadLogs && card.leadLogs.length > 0 && (
                <div className="lead_logs">
                  <h4>Lead Logs:</h4>
                  <ul className="lead_logs_line">
                    {card.leadLogs.map((log) => (
                      <li key={log.id} >
                        <p><strong>Log Date:</strong> {log.logDate}</p>
                        <p><strong>Status:</strong> {log.status}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {
                <div className="rematk">
                  <h4> Customer Remark</h4>
                  <ul className="lead_logs_line">
                    <li>
                      <p><strong> Customer Remark :</strong> {card.remark}</p>
                      <p><strong> Customer Remark Date :</strong> {card.remarkdate}</p>

                    </li>
                  </ul>
                </div>
              }
            </div>
          </div>
        )}

      </div>
      {
        review && (
          <div className="stepform_container" >
            <div className="stepForm_popup">
              <p>add review</p>
              <button className="StepForm_close_btn" onClick={handleClosereview}> X</button>
              <form className="step_from" onSubmit={handleAddreview}>
                <input type="date" value={reviewdata} onChange={(e) => setReviewdate(e.target.value)} />
                <input type="text" placeholder="Add Remark" value={Addreview} onChange={(e) => setAddreview(e.target.value)} />
                <button type="submit">Add Review</button>
              </form>
            </div>
          </div>
        )
      }

      {
        showAddlead && (
          <>
            <div className="addleadformShow">
              <AddLead props={closeAddLead} />

            </div>
          </>
        )
      }
    </>
  );
}

export default Lead;


//*************************************************ankit code */
// import React, { useEffect, useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import AddLead from "./AddLead";
// import "../lead/Lead.css";
// import axios from "axios";
// import ReactPaginate from "react-paginate";

// function Lead() {
//   const [showAddlead, setShowAddlead] = useState(false);
//   const [leads, setLeads] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState([]);
//   const [review, setReview] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 5;

//   // Token for authentication
//   const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
//   const myToken = token.token;

//   // Fetch leads
//   useEffect(() => {
//     const getAllLeads = async () => {
//       try {
//         const url = "http://localhost:8080/getAllLeads";
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${myToken}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const leads = await response.json();
//         setLeads(leads);
//         setFilter(leads);
//       } catch (error) {
//         console.error("Error fetching leads:", error);
//       }
//     };

//     getAllLeads();
//   }, [showAddlead]);

//   // Search functionality
//   useEffect(() => {
//     const searchData = leads.filter((item) =>
//       item.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilter(searchData);
//   }, [search, leads]);

//   // Handlers for missing functions
//   const openPopup = (id) => {
//     alert(`Popup for lead with ID: ${id}`);
//   };

//   const handlegetNewLead = (id) => {
//     alert(`Getting new lead with ID: ${id}`);
//   };

//   const handledelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/deleteLead/${id}`, {
//         headers: {
//           Authorization: `Bearer ${myToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       alert("Lead deleted successfully.");
//       setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEditLead = (id) => {
//     alert(`Editing lead with ID: ${id}`);
//   };

//   const handleAddReview = (id) => {
//     alert(`Adding review for lead with ID: ${id}`);
//     setReview(true);
//   };

//   const closeAddLead = () => {
//     setShowAddlead(false);
//   };

//   // Pagination logic
//   const offset = currentPage * itemsPerPage;
//   const currentItems = filter.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(filter.length / itemsPerPage);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   return (
//     <>
//       <div className="lead_show_table">
//         <div className="won-leads" style={{ padding: "30px" }}>
//           <h2>All Leads</h2>

//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <div className="searchBar">
//               <input
//                 type="search"
//                 placeholder="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//               <AiOutlineSearch className="icon" />
//             </div>
//             <button
//               className="lead-btn"
//               onClick={() => setShowAddlead(!showAddlead)}
//             >
//               Add Lead
//             </button>
//           </div>

//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Date</th>
//                 <th>Job Title</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Company</th>
//                 <th>Status</th>
//                 <th>Action</th>
//                 <th>View</th>
//                 <th>Delete</th>
//                 <th>Add Review</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((lead) => (
//                 <tr key={lead.id}>
//                   <td>{lead.name}</td>
//                   <td>{lead.foundOn}</td>
//                   <td>{lead.jobTitle}</td>
//                   <td>{lead.email}</td>
//                   <td>{lead.phoneNumber}</td>
//                   <td>{lead.companyName}</td>
//                   <td>{lead.status}</td>
//                   <td>
//                     <button className="step1" onClick={() => openPopup(lead.id)}>
//                       Steps
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="view"
//                       onClick={() => handlegetNewLead(lead.id)}
//                     >
//                       View
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="delete"
//                       onClick={() => handledelete(lead.id)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="edit"
//                       onClick={() => handleEditLead(lead.id)}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="review"
//                       onClick={() => handleAddReview(lead.id)}
//                     >
//                       Add Review
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <ReactPaginate
//             previousLabel={"Previous"}
//             nextLabel={"Next"}
//             breakLabel={"..."}
//             pageCount={pageCount}
//             marginPagesDisplayed={2}
//             pageRangeDisplayed={3}
//             onPageChange={handlePageClick}
//             containerClassName={"pagination"}
//             activeClassName={"active"}
//           />
//         </div>
//       </div>

//       {showAddlead && (
//         <div className="addleadformShow">
//           <AddLead props={closeAddLead} />
//         </div>
//       )}
//     </>
//   );
// }

// export default Lead;

