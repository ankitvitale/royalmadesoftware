import React, { useState } from 'react';

function AddLead() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to open and close the popup
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Collect form data
    const newLead = {
      name: form.name.value,
      jobTitle: form.jobTitle.value,
      companyName: form.companyName.value,
      email: form.email.value,
      phoneNumber: form.phoneNumber.value,
      foundOn: form.foundOn.value,  // Date field from form
      status: "NEW_LEAD",  // Fixed status value
    };

    try {
      // Send POST request to your backend API
      const response = await fetch('http://localhost:8080/createNewLead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure content type is set to JSON
        },
        body: JSON.stringify(newLead),  // Convert the object to JSON string
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Lead created successfully:', data);
        // Optionally, reset form or show success message
        form.reset();
        closePopup();
      } else {
        console.error('Failed to create lead');
      }
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  return (
    <>
      <div className="popup">
        <div className="popup-content">
          <h2>Add New Lead</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-containerr">
              <input type="text" name="name" placeholder=" " required />
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
              <input type="text" name="phoneNumber" placeholder=" " required />
              <label>Phone</label>
            </div>
            <div className="input-containerr">
              <input type="text" name="companyName" placeholder=" " required />
              <label>Company Name</label>
            </div>
            <div className="input-containerr">
              <input type="date" name="foundOn" placeholder=" " required />
              <label>Found On</label>
            </div>
            <button type="submit">Submit Lead</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddLead;
