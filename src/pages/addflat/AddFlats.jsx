import React, { useState } from "react";

function Flat() {
  // State to control the view and store flat data
  const [showForm, setShowForm] = useState(true);
  const [flats, setFlats] = useState([]);

  // Handle form submission to add a new flat
  const handleAddFlat = (e) => {
    e.preventDefault();
    const form = e.target;
    const newFlat = {
      flatSchemeName: form.flatSchemeName.value,
      address: form.address.value,
      floorNumber: form.floorNumber.value,
      flatNumber: form.flatNumber.value,
      flatType: form.flatType.value,
      flatArea: form.flatArea.value,
      flatAmount: form.flatAmount.value,
      flatStatus: 'Available', // Default status
    };
    setFlats([...flats, newFlat]);
    form.reset(); // Clear form after submission
    setShowForm(false); // Switch to Flat List view
  };

  return (
    <>
      <div className="materialwrapper">
        <h1>Flat Scheme Management System</h1>
        <div className="button-group">
          <button onClick={() => setShowForm(true)}>Add Flat</button>
          <button onClick={() => setShowForm(false)}>Flat List</button>
        </div>

        {/* Conditional rendering for form or flat list */}
        {showForm ? (
          <form onSubmit={handleAddFlat}>
            <div className="input-container">
              <input type="text" name="flatSchemeName" placeholder=" " required />
              <label>Flat Scheme Name</label>
            </div>
            <div className="input-container">
              <input type="text" name="address" placeholder=" " required />
              <label>Address</label>
            </div>
            <div className="input-container">
              <input type="number" name="floorNumber" placeholder=" " required />
              <label>Floor Number</label>
            </div>
            <div className="input-container">
              <input type="text" name="flatNumber" placeholder=" " required />
              <label>Flat Number</label>
            </div>
            <div className="input-container">
              <input list="flatTypes" name="flatType" placeholder=" " required />
              <label>Flat Type</label>
              <datalist id="flatTypes">
                <option value="1BHK" />
                <option value="2BHK" />
                <option value="3BHK" />
                <option value="4BHK" />
              </datalist>
            </div>
            <div className="input-container">
              <input type="number" name="flatArea" placeholder=" " required />
              <label>Flat Area/Carpet Area (sq ft)</label>
            </div>
            <div className="input-container">
              <input type="number" name="flatAmount" placeholder=" " required />
              <label>Flat Amount</label>
            </div>

            <div className="input-btn">
              <button type="submit">Add Flat</button>
            </div>
          </form>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Flat Scheme Name</th>
                <th>Address</th>
                <th>Floor Number</th>
                <th>Flat Number</th>
                <th>Flat Type</th>
                <th>Flat Area</th>
                <th>Flat Amount</th>
                <th>Flat Status</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((flat, index) => (
                <tr key={index}>
                  <td>{flat.flatSchemeName}</td>
                  <td>{flat.address}</td>
                  <td>{flat.floorNumber}</td>
                  <td>{flat.flatNumber}</td>
                  <td>{flat.flatType}</td>
                  <td>{flat.flatArea}</td>
                  <td>{flat.flatAmount}</td>
                  <td>{flat.flatStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Flat;
