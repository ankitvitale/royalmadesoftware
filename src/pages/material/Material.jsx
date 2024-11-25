import React, { useState } from "react";
import "./Material.css";

function Material() {
  // States
  const [showForm, setShowForm] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [vendors, setVendors] = useState(["Vendor A", "Vendor B", "Vendor C"]);
  const [vendorInput, setVendorInput] = useState("");

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const form = e.target;

    const qty = parseFloat(form.qty.value);
    const price = parseFloat(form.price.value);
    const payment = parseFloat(form.payment.value);

    const totalAmount = qty * price;
    const balanceAmount = totalAmount - payment;

    const newMaterial = {
      name: form.materialName.value,
      qty,
      price,
      vendor: vendorInput,
      date: form.date.value,
      totalAmount,
      payment,
      balanceAmount,
    };

    if (!vendors.includes(vendorInput)) {
      setVendors([...vendors, vendorInput]);
    }

    setMaterials([...materials, newMaterial]);
    form.reset(); 
    setVendorInput(""); 
    setShowForm(false); 
  };

  // Handle vendor input change
  const handleVendorInputChange = (e) => {
    setVendorInput(e.target.value);
  };

  // Handle selecting a vendor from the dropdown
  const handleVendorSelect = (vendor) => {
    setVendorInput(vendor); // Set the selected vendor
  };

  return (
    <>
      <div className="materialwrapper">
        <h1>Material Management System</h1>
        <div className="button-group">
          <button onClick={() => setShowForm(true)}>Add Material</button>
          <button onClick={() => setShowForm(false)}>Material List</button>
        </div>

        {/* Conditional rendering for form or material list */}
        {showForm ? (
          <form onSubmit={handleAddMaterial}>
            <div className="input-container">
              <input type="text" name="materialName" placeholder=" " required />
              <label>Material Name</label>
            </div>
            <div className="input-container">
              <input type="number" name="qty" placeholder=" " required />
              <label>Qty</label>
            </div>
            <div className="input-container">
              <input type="number" name="price" placeholder=" " required />
              <label>Price</label>
            </div>
            <div className="input-container vendor-field">
              <input
                type="text"
                value={vendorInput}
                onChange={handleVendorInputChange}
                placeholder=" "
                list="vendorOptions"
                required
              />
              <label>Vendor</label>
              {/* Datalist for vendor suggestions */}
              <datalist id="vendorOptions">
                {vendors.map((vendor, index) => (
                  <option key={index} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="input-container">
              <input type="date" name="date" placeholder=" " required />
              <label>Date</label>
            </div>
            <div className="input-container">
              <input type="number" name="payment" placeholder=" " required />
              <label>Payment</label>
            </div>
            <div className="input-btn">
              <button type="submit">Add Material</button>
            </div>
          </form>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Material Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Balance Amount</th>
                <th>Vendor Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index}>
                  <td>{material.name}</td>
                  <td>{material.qty}</td>
                  <td>{material.price}</td>
                  <td>{material.totalAmount}</td>
                  <td>{material.payment}</td>
                  <td>{material.balanceAmount}</td>
                  <td>{material.vendor}</td>
                  <td>{material.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Material;
