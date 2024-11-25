import React, { useState } from "react";

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

  return (
    <div className="materialwrapper">
      <h1>Land Management System</h1>
      <div className="button-group">
        <button onClick={() => setView("form")}>Add Land</button>
        <button onClick={() => setView("list")}>Land List</button>
        <button onClick={() => setView("projects")}>Running Projects</button>
      </div>

      {/* Conditional rendering for form, flat list, or running projects */}
      {view === "form" && (
        <form onSubmit={handleAddFlat}>
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
            <input type="text" name="arAmount" placeholder=" " required />
            <label>Ar Amount</label>
          </div>
          <div className="input-container">
            <input type="text" name="sAmount" placeholder=" " required />
            <label>S Amount</label>
          </div>

          {/* Purchase Type selection */}
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

          {/* Conditionally render Partner fields if Partnership is selected */}
          {isPartnership && (
            <>
              <div className="input-container">
                <input type="text" name="partnerName" placeholder=" " required />
                <label>Partner Name</label>
              </div>
              <div className="input-container">
                <input type="text" name="partnerNumber" placeholder=" " required />
                <label>Partner Phone Number</label>
              </div>
              <div className="input-container">
                <input type="text" name="partnerAmount" placeholder=" " required />
                <label>Partner Amount</label>
              </div>
            </>
          )}

          <div className="input-btn">
            <button type="submit">Add Land</button>
          </div>
        </form>
      )}

      {view === "list" && (
        <table>
          <thead>
            <tr>
              <th>Purchaser Name</th>
              <th>Address</th>
              <th>Owner</th>
              <th>Area (sq. ft.)</th>
              <th>Total Amount</th>
              <th>Token Amount</th>
              <th>Ar Amount</th>
              <th>S Amount</th>
              <th>Purchase Type</th>
              <th>Partner Name</th>
              <th>Partner Phone</th>
              <th>Partner Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flats.map((flat, index) => (
              <tr key={index}>
                <td>{flat.purchaserName}</td>
                <td>{flat.address}</td>
                <td>{flat.owner}</td>
                <td>{flat.area}</td>
                <td>{flat.totalAmount}</td>
                <td>{flat.tokenAmount}</td>
                <td>{flat.arAmount}</td>
                <td>{flat.sAmount}</td>
                <td>{flat.purchaseType}</td>
                <td>{flat.partnerName || "N/A"}</td>
                <td>{flat.partnerNumber || "N/A"}</td>
                <td>{flat.partnerAmount || "N/A"}</td>
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
