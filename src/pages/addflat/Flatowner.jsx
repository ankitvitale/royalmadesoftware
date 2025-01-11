import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import infraLogo from "../../assets/Royalmedeinfra Logo.svg"
import { useRef } from 'react';
import html2pdf from "html2pdf.js";

function Flatowner() {
  const letterref = useRef()
  const { id } = useParams();
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [customerDetail, setCustomerDetail] = useState(null);
  const [bankName, setbankName] = useState("")
  const [LoanAmount, setLoanAmount] = useState("")
  const [customerid, setCustomerId] = useState("")
  const [refreshKey, setRefreshKey] = useState(0);
  const [showBankDetailForm, setshowBankDetailForm] = useState(false)
  const [showInstallmentForm, setShowInstallmentForm] = useState(false)
  const [installmentData, setInstallmentDate] = useState("")
  const [installmentAmount, setInstallMentAmount] = useState("")
  const [selectinstallmentType, setselectinstallmentType] = useState("")
  const [showCustomerInstallMentcard, setshowCustomerInstallMentcard] = useState(false)
  const [customerInstallMentDeta, setcustomerInstallMentDeta] = useState("")
  console.log(customerInstallMentDeta)
  const [customerSlip, setcustomerSlip] = useState(false)
  useEffect(() => {
    async function customerProfile() {
      try {
        const response = await axios.get(`http://localhost:8080/booking/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response?.data)
        setCustomerId(response?.data?.customer?.id)
        setCustomerDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    customerProfile();
  }, [id, token, refreshKey]);

  async function handleSubmitloan(e) {
    e.preventDefault()

    const formdata = {
      bankName: bankName,
      loanAmount: LoanAmount
    }
    try {
      const response = await axios.post(`http://localhost:8080/addLoanDetails/${customerid}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response)

      //alert("successfully bank detail added")
      setRefreshKey((prev) => prev + 1);
      setbankName("")
      setLoanAmount("")
    } catch (error) {
      console.log(error)
    }

  }


  async function handleCancleBooking() {
    console.log(id)
    try {
      const response = await axios.put(`http://localhost:8080/cancelBooking/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      alert("booking Delete Successfully")

    } catch (error) {
      console.log(error)
    }
  }
  const showAlert = () => {
    Swal.fire({
      title: 'thank You',
      text: 'Bank Details Added Successfully...!',
      icon: 'success',
      confirmButtonText: 'Okay',
    });
  };

  async function handleAddflatinstallment(e) {
    e.preventDefault()
    const formdata = [{
      installmentDate: installmentData,
      installmentAmount: installmentAmount,
      installmentStatus: selectinstallmentType
    }]
    try {
      const response = await axios.post(`http://localhost:8080/${id}/addInstallment`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response)
      alert("payment Added")
      setInstallmentDate("")
      setInstallMentAmount("")
      selectinstallmentType("")
      setRefreshKey(refreshKey + 1)

    } catch (error) {
      console.log(error)
    }

  }

  async function handleShowInstallment() {
    setshowCustomerInstallMentcard(true)
    try {
      const response = await axios.get(`http://localhost:8080/BookingSummary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response.data)
      setcustomerInstallMentDeta(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDownload = () => {
    const element = letterref.current;
    const options = {
      margin: 0.5,
      filename: "Relieving_letter.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };


  return (
    <>
      <h2 style={{ textAlign: "center" }} >Flatowner Details</h2>

      <div className="flat_owener_multi_button_wrapper">
        <button className='AddBankAccount' onClick={() => setshowBankDetailForm(true)}> Add Bank Account</button>
        <button className='AddFlatInstallment' onClick={() => setShowInstallmentForm(true)}  > Add Flat Installment</button>

        <button className='CancleBooking' onClick={handleCancleBooking}> Cancle Booking</button>


        <button className='ShowCustomerInstallment' onClick={handleShowInstallment}> Show Customer installment</button>
        <button className='CustomerSlip' onClick={() => setcustomerSlip(!customerSlip)}> Customer Slip</button>
      </div>


      {customerDetail ? (
        <div className='customer_data_card'>
          <h3>1. Customer Data</h3>
          <p><strong>Name:</strong> {customerDetail.customer?.name || "NA"}</p>
          <p><strong>Phone Number:</strong> {customerDetail.customer?.phoneNumber || "NA"}</p>
          <p><strong>Email:</strong> {customerDetail.customer?.email || "NA"}</p>
          <p><strong>Address:</strong> {customerDetail.customer?.address || "NA"}</p>
          <p><strong>Aadhar Number:</strong> {customerDetail.customer?.aadharNumber || "NA"}</p>
          <p><strong>PAN Card:</strong> {customerDetail.customer?.panCard || "NA"}</p>
          <p><strong>Loan:</strong> {customerDetail.customer?.loan || "NA"}</p>
          <p><strong>Loan Amount:</strong> {customerDetail.customer?.loanAmount || "N/A"}</p>
          <p><strong>Agent Name:</strong> {customerDetail.customer?.agentName || "NA"}</p>
          <p><strong>Bank Name:</strong> {customerDetail.customer?.bankName || "N/A"}</p>
          <p><strong>Brokerage:</strong> {customerDetail.customer?.brokerage || "NA"}</p>


          <h3>2. Residency Data</h3>
          <p><strong>Residency Name:</strong> {customerDetail.residency?.name || "NA"}</p>
          <p><strong>Flat Type:</strong> {customerDetail.residency?.flatType || "NA"}</p>
          <p><strong>Residency Type:</strong> {customerDetail.residency?.residencyType || "NA"}</p>
          <p><strong>Floor Number:</strong> {customerDetail.residency?.floorNumber || "NA"}</p>
          <p><strong>Identifier:</strong> {customerDetail.residency?.identifier || "NA"}</p>
          <p><strong>Price:</strong> {customerDetail.residency?.price || "NA"}</p>
          <p><strong>Availability Status:</strong> {customerDetail.residency?.availabilityStatus || "NA"}</p>

          <h3>3. Other Data</h3>
          <p><strong>Deal Price:</strong> {customerDetail.dealPrice || "NA"}</p>
          <p><strong>Token Amount:</strong> {customerDetail.tokenAmount || "NA"}</p>
          <p><strong>Agreement Amount:</strong> {customerDetail.agreementAmount || "NA"}</p>
          <p><strong>Booked On:</strong> {customerDetail.bookedOn || "NA"}</p>
          <p><strong>Booking Status:</strong> {customerDetail.bookingStatus || "NA"}</p>
          <p><strong>Stamp Duty Amount:</strong> {customerDetail.stampDutyAmount || "NA"}</p>
          <p><strong>Registration Amount:</strong> {customerDetail.registrationAmount || "NA"}</p>
          <p><strong>GST Amount:</strong> {customerDetail.gstAmount || "NA"}</p>
          <p><strong>Electric/Water Amount:</strong> {customerDetail.electricWaterAmmount || "NA"}</p>
          <p><strong>Legal Charges:</strong> {customerDetail.legalChargesAmmout || "NA"}</p>

        </div>
      ) : (
        <p>Loading details...</p>
      )}


      {/* bank details form start */}
      {
        showBankDetailForm && (
          <div className="customer_bank_details_form_wrapper">
            <button onClick={() => setshowBankDetailForm(false)}> X</button>
            <form className='customer_bank_name' onSubmit={handleSubmitloan}>
              <label htmlFor=""> Bank name</label>
              <input type="text" value={bankName} onChange={(e) => setbankName(e.target.value)} />
              <label htmlFor=""> Loan Amount</label>
              <input type="number" value={LoanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
              <div className="bank_detail_submit_button">
                <button onClick={showAlert}> Submit</button>
              </div>
            </form>
          </div>

        )
      }

      {/* bank details form end */}




      {/* Add customet installment Form */}
      {
        showInstallmentForm && (
          <div className='installment_form_wrapper'>
            <button onClick={() => setShowInstallmentForm(false)} className='installment_form_close_button'> X</button>
            <form action="" onSubmit={handleAddflatinstallment} className='installment_form'>
              <input type="date" placeholder='Enter Installment Date' value={installmentData} onChange={(e) => setInstallmentDate(e.target.value)} className='installment_form_input' />
              <input type="number" placeholder='Enter Installment Amount' value={installmentAmount} onChange={(e) => setInstallMentAmount(e.target.value)} className='installment_form_input' />
              <select value={selectinstallmentType} onChange={(e) => setselectinstallmentType(e.target.value)} className='installment_form_select'>
                <option value=""> Select Payment Method</option>
                <option value="CASH">Cash</option>
                <option value="CHECK">Check</option>
                <option value="UPI">UPI</option>
                <option value="RTGS">RTGS</option>
                <option value="NEFT">NEFT</option>
              </select>
              <button className='installment_form_submit_button'>Submit</button>
            </form>

          </div>
        )
      }
      {/* End customet installment Form */}



      {/*   show Customer installment Card */}
      {
        showCustomerInstallMentcard && customerInstallMentDeta && (
          <div className='customer_installment_card_wrapper'>
            <p onClick={() => setshowCustomerInstallMentcard(false)} className='customer_installment_card_close_button'> X</p>
            <p> Residency Name : {customerInstallMentDeta.residencyName}</p>
            <p> Customer name : {customerInstallMentDeta?.customerName}</p>
            <p> Plot No : {customerInstallMentDeta.identifier}</p>
            <p>  Flat Price : {customerInstallMentDeta.dealPrice}</p>
            <p> Token Amount : {customerInstallMentDeta.tokenAmount}</p>
            <p> Agreement price: {customerInstallMentDeta.agreementAmount}</p>
            <p> Customer Remaining Amount : {customerInstallMentDeta.remainingAmount}</p>
            <p> {customerInstallMentDeta.bookingInstallments.map((item, index) => {
              return <>
                <table className='customer_installment_card_table'>
                  <tr className='customer_installment_card_tr'>
                    <th className='customer_installment_card_th'> Installment Date </th>
                    <th className='customer_installment_card_th'> Installment Amount</th>
                    <th className='customer_installment_card_th'> Installment Status</th>
                  </tr>
                  <tr className='customer_installment_card_tr'>
                    <td className='customer_installment_card_td'>{item.installmentDate}  </td>
                    <td className='customer_installment_card_td'>{item.installmentAmount} </td>
                    <td className='customer_installment_card_td'>
                      {item.installmentStatus}

                    </td>
                  </tr>
                </table>

              </>
            })}</p>

          </div>
        )
      }


      {/*   customer Slip */}

      {
        customerSlip && customerDetail && (
          <>
            <div className="customer_final_slip_main_wrapper">

              <button onClick={() => setcustomerSlip(!customerSlip)}>X</button>


              <button onClick={handleDownload}> Downlode</button>
              <div className="royaal_patment_slip_main_wrapper" ref={letterref}>
                <div className="payment_slip_header" style={{ marginLeft: "25px" }}>
                  <img src={infraLogo} alt="" height={"80px"} width={"150px"} />
                  <p style={{ fontSize: "12px" }}>
                    Address : 28, GOVIND PRABHU NAGAR , RAJAPETH HUDKESHWAR ROAD ,
                    NAGPUR - 34
                  </p>
                  <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                    CONTACT: + 91-9028999253 | 9373450092
                  </p>
                </div>
                <hr
                  style={{
                    border: "2px solid green",
                  }}
                />

                <p style={{ marginTop: "10px", marginLeft: "25px", fontSize: "12px" }}>
                  Date :
                </p>

                <div
                  className="payment_slip_first_table"
                  style={{ marginLeft: "25px", marginTop: "10px" }}
                >
                  <table
                    style={{ border: "1px solid gray", borderCollapse: "collapse" ,width:"400px"}}
                  >
                    <tr>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          Flat No / Plot No{" "}
                        </b>
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}> {customerDetail.residency.identifier}</b>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}> Area</b>
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          {" "}
                          pardidfghjrtyudfghjrtghjhgvygxcvbn
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          Location
                        </b>
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          plot no 50
                        </b>
                      </td>
                    </tr>
                  </table>
                </div>
                <p
                  style={{
                    marginLeft: "25px",
                    marginTop: "25px",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  RECEIVED with thanks from <b>{customerDetail.customer.name} </b>
                  the sum of Rupees  <b> {customerDetail.residency.price} </b> by Cheque / Cash / Draft No.{" "}
                   <b>{customerDetail.residency.identifier}</b> flat / plot address <b> manewada road 440018 </b> in
                  part / full / advance payment.
                </p>

                <div
                  className="payment_slip_container"
                  style={{
                    border: "2px solid black",
                    width: "150px",
                    borderRadius: "50px",
                    marginLeft: "25px",
                    marginTop: "15px",
                  }}
                >
                  <p style={{ fontSize: "15px", marginLeft: "5px" }}>
                    ₹ : <b> {customerDetail.residency.price}</b>
                  </p>
                </div>
                <p style={{ marginLeft: "25px", marginTop: "5px", fontSize: "15px" }}>
                  <b> Balance Amount : 858541 </b>
                </p>
                <p style={{ marginLeft: "25px", marginTop: "5px", fontSize: "15px" }}>
                  <b> Total Payable : 858541 </b>
                </p>

                <div
                  className="payment_slip_signature_wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <b style={{ marginLeft: "25px", fontSize: "15px" }}>
                    Customer Signature
                  </b>
                  <b style={{ marginRight: "30px", fontSize: "15px" }}>
                    Authorised Signature
                  </b>
                </div>

                <hr style={{ border: "2px solid green" }} />

                <div
                  className="payment_slip_secound_slip"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: "25px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      margin: "20px 0",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color:"black"
                        }}
                      >
                        S.No.
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color:"black"

                        }}
                      >
                        Other Charges
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color:"black"

                        }}
                      >
                        Percentage
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color:"black"

                        }}
                      >
                        Amount
                      </th>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        0
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Total Price
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        -
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                      {customerDetail.residency.price}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        1
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Stamp Duty
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > {customerDetail.stampDutyAmount}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        2
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Registration
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      >  {customerDetail.registrationAmount}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        3
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        GST
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > {customerDetail.gstAmount}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        4
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Electric Meter and Water Charges
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      >  {customerDetail.electricWaterAmmount}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        5
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Legal Charges / Documentation Charges
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > {customerDetail.legalChargesAmmout}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        6
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Maintenance Charges for 5 Years
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        Total of Overhead Charges:
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        Basic Cost of Flat:
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        Grand Total:
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                    </tr>
                  </table>
                </div>
                <h3 style={{ fontFamily: "Arial, sans-serif", marginLeft: "25px" }}>
                  Terms and Conditions:
                </h3>
                <hr style={{ border: "1px solid green" }} />
                <ol style={{ fontFamily: "Arial, sans-serif" }}>
                  <li style={{ fontSize: "12px" }}>
                    1 .Elevation changes not allowed.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    {" "}
                    2. Extra item work charges to be paid in advance.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    3. If purchaser has to change any item like tiles, he has to
                    purchase it from market, and variable it on site for its own cost,
                    no deduction allowed for this condition. This condition is for all
                    material.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    3. If purchaser has to change any item like wise tiles he has to
                    purchase it from market and available it on site for use at his own
                    cost, no deduction allowed for this (This condition is for all
                    material).
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    4. Agreement of Development for sale will be executed within 10 days
                    from the date of Booking and aftersanctioning the Bank Loan.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    5. Stampduty & Registration Charges will be taken at Registration of
                    Agreement to Sell
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    6. GST charges will be taken accordingly with payment schedule.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    7. The Rate of GST or any taxes may vary as per Govt. policies
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    8. Maintenance, MSEB charges will be taken at the time of Sale Deed/
                    Possession.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    9. If any cancellations happens then 30% amount will be deducted.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    10. Builder reserve all right to change planning and elevation.
                  </li>
                </ol>
              </div>
            </div>

          </>
        )
      }
    </>
  );
}

export default Flatowner;
