import React, { useEffect, useState } from "react";
import "./AddLand.css"
function AddLand() {
  const [view, setView] = useState("form"); // Tracks the current view
  const [flats, setFlats] = useState([]);
  const [runningProjects, setRunningProjects] = useState([]);
  const [isPartnership, setIsPartnership] = useState(false); // New state to track partnership selection




  // Handle form submission to add a new flat
  const handleAddFlat = (e) => {
    e.preventDefault();
    const form = e.target;
    const newFlat = { 
      purchaserName: form.purchaserName.value,
      address: form.address.value,
      owner: form.owner.value,
      area: form.area.value,
      totalAmount: form.totalAmount.value,
      tokenAmount: form.tokenAmount.value,
      arAmount: form.arAmount.value,
      sAmount: form.sAmount.value,
      purchaseType: form.purchaseType.value,
      partnerName: form.partnerName?.value || null,
      partnerNumber: form.partnerNumber?.value || null,
      partnerAmount: form.partnerAmount?.value || null,
    };
    setFlats([...flats, newFlat]);
    form.reset(); // Clear form after submission
    setView("list"); // Switch to Flat List view
  };

  // Handle starting a project for a flat
  const handleStartProject = (flatIndex, projectName) => {
    const project = {
      flat: flats[flatIndex],
      projectName,
    };
    setRunningProjects([...runningProjects, project]);
    alert("Project started successfully!");
  };
console.log(flats)
  return (
    <div className="materialwrapper">
      <h1>Land Management System</h1>
      <div className="button-group">
        <button onClick={() => setView("form")}>Add Land</button>
        <button onClick={() => setView("projects")}>Running Projects</button>
      </div>

      {/* Conditional rendering for form, flat list, or running projects */}
      {view === "form" && (
          <form onSubmit={handleAddFlat} className="land-form">
          <div className="form-grid">
            <div className="input-container">
              <input type="text" name="purchaserName" placeholder=" " required />
              <label>Purchaser Name</label>
            </div>
            <div className="input-container">
              <input type="text" name="address" placeholder=" " required />
              <label>Address</label>
            </div>
            <div className="input-container">
              <input type="text" name="owner" placeholder=" " required />
              <label>Owner Name</label>
            </div>
            <div className="input-container">
              <input type="text" name="area" placeholder=" " required />
              <label>Area (sq. ft.)</label>
            </div>
            <div className="input-container">
              <input type="text" name="totalAmount" placeholder=" " required />
              <label>Total Amount</label>
            </div>
            <div className="input-container">
              <input type="text" name="tokenAmount" placeholder=" " required />
              <label>Token Amount</label>
            </div>
            <div className="input-container">
              <input type="text" name="agreementAmount" placeholder=" " required />
              <label>Agreement Amount</label>
            </div>
            <div className="input-container">
              <input type="text" name="pincode" placeholder=" " required />
              <label>Pincode</label>
            </div>
            <div className="input-container">
              <input type="text" name="landmark" placeholder=" " required />
              <label>Landmark</label>
            </div>
            <div className="input-container">
              <input type="text" name="city" placeholder=" " required />
              <label>City</label>
            </div>
            <div className="input-container">
              <input type="text" name="state" placeholder=" " required />
              <label>State</label>
            </div>
            <div className="input-container">
              <input type="text" name="country" placeholder=" " required />
              <label>Country</label>
            </div>
            <div className="input-container">
              <select
                name="purchaseType"
                onChange={(e) => setIsPartnership(e.target.value === "Partnership")}
                required
              >
                <option value="" disabled selected>
                  Select Purchase Type
                </option>
                <option value="Individual">Individual</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>
          </div>
          
          {/* Conditionally render Partner fields if Partnership is selected */}
          {isPartnership && (
            <div className="form-grid">
              <div className="input-container">
                <input type="text" name="partnerName" placeholder=" " required />
                <label>Partner Name</label>
              </div>
              <div className="input-container">
                <input type="text" name="partnerEmail" placeholder=" " required />
                <label>Partner Email</label>
              </div>
              <div className="input-container">
                <input type="text" name="partnerPhoneNumber" placeholder=" " required />
                <label>Partner Phone Number</label>
              </div>
              <div className="input-container">
                <input type="text" name="partnerAmount" placeholder=" " required />
                <label>Partner Amount</label>
              </div>
            </div>
          )}
          
          <div className="input-btn">
            <button type="submit">Add Land</button>
          </div>
        </form>
      )}


      {view === "projects" && (
        <div>
          <h2>Running Projects</h2>
          {runningProjects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Purchaser Name</th>
                  <th>Address</th>
                  <th>Owner</th>
                  <th>Area (sq. ft.)</th>
                </tr>
              </thead>
              <tbody>
                {runningProjects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.projectName}</td>
                    <td>{project.flat.purchaserName}</td>
                    <td>{project.flat.address}</td>
                    <td>{project.flat.owner}</td>
                    <td>{project.flat.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No running projects yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AddLand;
