import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./Lead.css";

function Lead() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [step, setStep] = useState("New Leads");
  const [process, setProcess] = useState(false);

  const steps = [
    "New Leads",
    "Follow-ups",
    "Under Review",
    "Demo",
    "Negotiation",
    "Won",
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newLead = {
      id: Date.now(),
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      jobTitle: form.jobTitle.value,
      email: form.email.value,
      phone: form.phone.value,
      company: form.company.value,
      step: "New Leads",
      dates: { "New Leads": new Date().toLocaleDateString() },
    };
    setLeads([...leads, newLead]);
    form.reset();
    closePopup();
  };

  const handleStepChange = (leadId, newStep) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              step: newStep,
              dates: {
                ...lead.dates,
                [newStep]: new Date().toLocaleDateString(),
              },
            }
          : lead
      )
    );
  };

  function fnProcess(id) {
    console.log(id);
    setProcess(!process);
  }
  
  return (
    <>
      <div className="leadwrapper">
        <h1>Lead Management Dashboard</h1>
        <button onClick={openPopup}>
          <FaPlus color="white" /> Add New Lead
        </button>
        {process && (
          <div className="steps">
            {steps.map((currentStep) => (
              <div key={currentStep} className="step">
                <h2>{currentStep}</h2>
                {leads
                  .filter(
                    (lead) => lead.status !== "Won" && lead.step === currentStep
                  )
                  .map((lead) => (
                    <div key={lead.id} className="lead">
                      <p>
                        {lead.firstName} {lead.lastName}
                      </p>
                      <select
                        value={lead.step}
                        onChange={(e) =>
                          handleStepChange(lead.id, e.target.value)
                        }
                      >
                        {steps
                          .slice(steps.indexOf(currentStep))
                          .map((stepOption) => (
                            <option key={stepOption} value={stepOption}>
                              {stepOption} (
                              {lead.dates[stepOption] || "Not started"})
                            </option>
                          ))}
                      </select>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="won-leads">
          <h2>All Leads</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Job Title</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Won Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.firstName}</td>
                  <td>{lead.lastName}</td>
                  <td>{lead.jobTitle}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.company}</td>
                  <td>{lead.step}</td>
                  <td>{lead.dates["Won"]}</td>
                  <td>
                    <button onClick={() => fnProcess(lead.id)}>Steps</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Lead</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-containerr">
                <input type="text" name="firstName" placeholder=" " required />
                <label>First Name</label>
              </div>
              <div className="input-containerr">
                <input type="text" name="lastName" placeholder=" " required />
                <label>Last Name</label>
              </div>
              <div className="input-containerr">
                <input type="text" name="jobTitle" placeholder=" " required />
                <label>Job Title</label>
              </div>
              <div className="input-containerr">
                <input type="email" name="email" placeholder=" " required />
                <label>Email</label>
              </div>
              <div className="input-containerr">
                <input type="text" name="phone" placeholder=" " required />
                <label>Phone</label>
              </div>
              <div className="input-containerr">
                <input type="text" name="company" placeholder=" " required />
                <label>Company Name</label>
              </div>
              <button type="submit">Submit Lead</button>
              <button type="button" onClick={closePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Lead;
