import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./Lead.css";

function Lead() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [currentProcessId, setCurrentProcessId] = useState(null);

  const steps = [
    "New Leads",
    "Follow-ups",
    "Under Review",
    "Demo",
    "Negotiation",
    "Won",
  ];

  useEffect(() => {
    const getAllLeads = async () => {
      try {
        const url = 'http://localhost:8080/getAllLeads';
        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const leads = await response.json();
        setLeads(leads);
        console.log('Leads:', leads);
        return leads; // Return or use the leads as needed
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    // Call the function
    getAllLeads();
  }, []);

  const handleStepChange = (leadId, newStep) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              step: newStep, // Update the 'step'
              dates: {
                ...lead.dates,
                [newStep]: new Date().toLocaleDateString(),
              },
            }
          : lead
      )
    );
  };

  const fnProcess = (id) => {
    setCurrentProcessId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="leadwrapper">
       
        {currentProcessId && (
          <div className="steps">
            {steps.map((currentStep) => (
              <div key={currentStep} className="step">
                <h2>{currentStep}</h2>
                {leads
                  .filter(
                    (lead) =>
                      lead.id === currentProcessId && lead.step === currentStep // Filtering by currentProcessId and step
                  )
                  .map((lead) => (
                    <div key={lead.id} className="lead">
                      <p>
                        {lead.name} {lead.lastName}
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
                <th>Date</th>
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
                  <td>{lead.name}</td>
                  <td>{lead.foundOn}</td>
                  <td>{lead.jobTitle}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phoneNumber}</td>
                  <td>{lead.companyName}</td>
                  <td>{lead.status}</td>
                  <td>{'NA'}</td>
                  <td>
                    <button onClick={() => fnProcess(lead.id)}>Steps</button>
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

export default Lead;
