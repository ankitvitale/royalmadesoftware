import React, { useState } from "react";
import "./Customer.css";

function Customer() {
  // State to control the view and store customer data
  const [showForm, setShowForm] = useState(true);
  const [customers, setCustomers] = useState([]);
 
  // Handle form submission to add a new customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    const form = e.target;
    const newCustomer = {
      name: form.customerName.value,
      email: form.customerEmail.value,
      phone: form.phoneNumber.value,
      address: form.address.value,
      purchase: form.purchase.value,
      agentName: form.agentName.value,
      agentcommision: form.agentcommision.value,
      date: form.date.value,
      totalcost: form.totalcost.value,
      booking: form.booking.value,
      arramt: form.arramt.value,
      installment: form.installment.value,
      other: form.other.value,
    };
    setCustomers([...customers, newCustomer]);
    form.reset(); 
    setShowForm(false); 
  };

  return (
    <>
      <div className="materialwrapper">
        <h1>Customer Management System</h1>
        <div className="button-group">
          <button onClick={() => setShowForm(true)}>Add Customer</button>
          <button onClick={() => setShowForm(false)}>Customer List</button>
        </div>

        
        {showForm ? (
          <form onSubmit={handleAddCustomer}>
            <div className="input-container">
              <input type="text" name="customerName" placeholder=" " required />
              <label>Customer Name</label>
            </div>
            <div className="input-container">
              <input type="email" name="customerEmail" placeholder=" " required />
              <label>Customer Email</label>
            </div>
            <div className="input-container">
              <input type="text" name="phoneNumber" placeholder=" " required />
              <label>Phone Number</label>
            </div>
            <div className="input-container">
              <input type="text" name="address" placeholder=" " required />
              <label>Address</label>
            </div>
            <div className="input-container">
              <input list="purchases" name="purchase" placeholder=" " required />
              <label>Purchase</label>
              <datalist id="purchases">
                <option value="Flat" />
                <option value="Land" />
              </datalist>
            </div>
            <div className="input-container">
              <input type="text" name="agentName" placeholder=" " required />
              <label>Agent Name</label>
            </div>
            <div className="input-container">
              <input type="text" name="agentcommision" placeholder=" " required />
              <label>Agent Co.</label>
            </div>
            <div className="input-container">
              <input type="date" name="date" placeholder=" " required />
              <label>Date</label>
            </div>
            <div className="input-container">
              <input type="text" name="totalcost" placeholder=" " required />
              <label>Total Cost</label>
            </div>
            <div className="input-container">
              <input type="text" name="booking" placeholder=" " required />
              <label>Booking Amt.</label>
            </div>
            <div className="input-container">
              <input type="text" name="arramt" placeholder=" " required />
              <label>Arr. Amt.</label>
            </div>
            <div className="input-container">
              <input type="text" name="installment" placeholder=" " required />
              <label>Installment</label>
            </div>
            <div className="input-container">
              <input type="text" name="other" placeholder=" " required />
              <label>Other</label>
            </div>
            <div className="input-btn">
              <button type="submit">Add Customer</button>
            </div>
          </form>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Purchase</th>
                <th>Agent Name</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Installment</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={index}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>{customer.purchase}</td>
                  <td>{customer.agentName}</td>
                  <td>{customer.date}</td>
                  <td>{customer.totalcost}</td>
                  <td>{customer.installment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Customer;
