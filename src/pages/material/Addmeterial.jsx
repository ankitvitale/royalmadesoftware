import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../material/Material.css"
import { Fa0 } from 'react-icons/fa6';

function Addmeterial() {
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
    console.log(token)
    const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role;
    const [showAddMaterial, setShowAddMaterial] = useState(false)
    const [showMaterialInstallMentForm, setshowMaterialInstallMentForm] = useState(false)
    const { id } = useParams();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [vendorName, setVendorName] = useState("");
    const [price, setPrice] = useState("");
    const [vendorAmountPaid, setVendorAmountPaid] = useState("");
    const [addedOn, setAddedOn] = useState("");
    const [materialtable, setMaterialtable] = useState([]);
    const [mybillImg, setmyBillImage] = useState("")
    const [refreshKey, setrefreshKey] = useState("")
    const [materialId, setmaterialId] = useState("")
    const [materialinstallmentdate, setmaterialinstallmentdate] = useState("")
    const [materialinstallmentamount, setmaterialinstallmentamount] = useState("")
    const [materialinstallmentSelect, setmaterialinstallmentSelect] = useState("")

    const [materialBillImg, setmaterialBillimg] = useState("")
    const [billId, setBillId] = useState("")
    const [showImg, setShowImg] = useState(false)
    const [displaymaterialcard, setdisplaymaterialcard] = useState(false)
    const [materialcardData, setmaterialcardData] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            type,
            quantity,
            vendorName,
            price,
            vendorAmountPaid,
            addedOn,
            billImg: mybillImg
        };
        try {
            const response = await axios.post(`http://localhost:8080/projects/${id}/add-expense`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response);
            alert("Form successfully submitted");
            setName("");
            setType("");
            setQuantity("");
            setVendorAmountPaid("");
            setVendorName("");
            setPrice("");
            setAddedOn("");
            setrefreshKey(refreshKey + 1)
            setmyBillImage("")
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        async function getExpense() {
            try {
                const response = await axios.get(`http://localhost:8080/${id}/expenses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
                console.log(response.data);
                setMaterialtable(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getExpense();
    }, [id, token, refreshKey]);


    async function handleDeletematerial(id) {

        try {
            await axios.delete(`http://localhost:8080/deleteExpense/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            setMaterialtable((prev) => prev.filter((expense) => expense.id !== id));
            setrefreshKey((prev) => prev + 1);
            // window.location.reload(); 
        } catch (error) {
            console.log(error);
        }
    }

    function addmaterialInstallment(id) {
        setshowMaterialInstallMentForm(true)
        setmaterialId(id)
    }

    async function handleadmaterialinstallment(e) {
        e.preventDefault();

        const formdata = [{
            expensePayDate: materialinstallmentdate,
            expenseAmount: materialinstallmentamount,
            expensePayStatus: materialinstallmentSelect
        }]
        try {
            const response = await axios.post(`http://localhost:8080/${materialId}/expenseInstallment`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            setrefreshKey(refreshKey + 1)
            alert("Material installment Added ")
            setmaterialinstallmentSelect("")
            setmaterialinstallmentamount("")
            setmaterialinstallmentdate("")
        } catch (error) {
            console.log(error)
        }
    }

    function Showbills(id) {
        setShowImg(true)
        setBillId(id)
    }


    useEffect(() => {
        // / Ensure a valid billId is set
        async function getBillImg() {
            try {
                const response = await axios.get(`http://localhost:8080/ExpenseById/${billId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data); // Check the API response structure here
                setmaterialBillimg(response.data); // Adjust based on the API response structure
            } catch (error) {
                console.log(error);
            }
        }
        getBillImg();

    }, [billId, token]);

    async function showmaterialcard(id) {
        setdisplaymaterialcard(true)
        try {
            const response = fetch(`http://localhost:8080/ExpenseById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                }
            })
            const data = await (await response).json()
            console.log(data)
            setmaterialcardData(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>Add Meterial  </h1>
            <div className="Addmaterialbutton_wrapper">
                <button onClick={() => setShowAddMaterial(!showAddMaterial)} >Add Material</button>

            </div>

            {
                showAddMaterial && (

                    <div className="addMeterialformwrapper">
                        <div className="hideAddmaterial_button">
                            <button onClick={() => setShowAddMaterial(!showAddMaterial)} className='crossMetetialform_btn'>X</button>
                        </div>
                        <form onSubmit={handleSubmit} className="addMeterialform">
                            <div>
                                <label className="addMeteriallable">
                                    Name:
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder='Meterial Name'
                                        onChange={(e) => setName(e.target.value)}
                                        className="addMeterialinput"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Type:
                                </label>
                                <select name="" id="" value={type} onChange={(e) => setType(e.target.value)} required className="addMeterialselect">
                                    <option value="">Select Type</option>
                                    <option value="MATERIAL">MATERIAL</option>
                                    <option value="LABOUR">LABOUR</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Quantity:
                                    <input
                                        type="number"
                                        value={quantity}
                                        placeholder='Meterial quantity'
                                        className="addMeterialinput"
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        required
                                    />
                                </label >
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Vendor Name:
                                    <input
                                        type="text"
                                        value={vendorName}
                                        placeholder='Enter Vendor Name'
                                        className="addMeterialinput"
                                        onChange={(e) => setVendorName(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Price:
                                    <input
                                        type="number"
                                        value={price}
                                        placeholder='Enter price'
                                        className="addMeterialinput"
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Vendor Amount Paid:
                                    <input
                                        type="number"
                                        value={vendorAmountPaid}
                                        className="addMeterialinput"
                                        placeholder='Enter Vendor Paid Amount'
                                        onChange={(e) => setVendorAmountPaid(Number(e.target.value))}
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="addMeteriallable">
                                    Added On:
                                    <input
                                        type="date"
                                        value={addedOn}
                                        className="addMeterialinput"
                                        onChange={(e) => setAddedOn(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Added Bill Image:
                                    <input
                                        type="file"
                                        // value={mybillImg}
                                        multiple
                                        className="addMeterialinput"
                                        onChange={(e) => setmyBillImage(e.target.files[0])}
                                        required
                                    />
                                </label>
                            </div>
                            <button type="submit" className="addMeterialsubmitbutton">Submit</button>
                        </form>
                    </div>

                )
            }

            {/* Display Material Table */}
            <div className="material_table_wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Material Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Vendor Name</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Vendor Amount Paid</th>
                            <th>Reaming Amount </th>
                            <th>Added On</th>
                            {role === "Admin" && (
                                <th> Action</th>

                            )}
                            <th> Action</th>
                            <th> Action</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materialtable.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.name}</td>
                                <td>{expense.type}</td>
                                <td>{expense.quantity}</td>
                                <td>{expense.vendorName}</td>
                                <td>{expense.price}</td>
                                <td>{expense.totalPrice}</td>
                                <td>{expense.vendorAmountPaid}</td>
                                <td>{expense.reamingAmount}</td>
                                <td>{expense.addedOn}</td>
                                {
                                    role === "Admin" && (
                                        <td> <button className='meterialDelete' onClick={() => handleDeletematerial(expense.id)}> Delete</button></td>

                                    )
                                }
                                <td> <button className='addmeterialinstallment' onClick={() => addmaterialInstallment(expense.id)}> material installment</button></td>
                                <td> <button className='showemeterialBill' onClick={() => Showbills(expense.id)}> Show Bills</button></td>
                                <td> <button onClick={() => showmaterialcard(expense.id)}> Show material card</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {/*   show add material installment */}
            {
                showMaterialInstallMentForm && (
                    <>
                        <div className="addmaterial_inatallment_form_wrapper">
                            <form className="addmaterial_inatallment_form" onSubmit={handleadmaterialinstallment}>
                                <button onClick={() => setshowMaterialInstallMentForm(false)} className="addmaterial_inatallment_form_closebutton"> X</button>

                                <input type="date" className="addmaterial_inatallment_form_input" value={materialinstallmentdate} onChange={(e) => setmaterialinstallmentdate(e.target.value)} />
                                <input type="number" placeholder='Enter Amount' className="addmaterial_inatallment_form_input" value={materialinstallmentamount} onChange={(e) => setmaterialinstallmentamount(e.target.value)} />
                                <select className="addmaterial_inatallment_form_select" value={materialinstallmentSelect} onChange={(e) => setmaterialinstallmentSelect(e.target.value)}>
                                    <option value=""> Select Method</option>
                                    <option value="CASH">CASH</option>
                                    <option value="CHECK"> CHECK</option>
                                    <option value="UPI">UPI</option>
                                    <option value="RTGS">RTGS</option>
                                    <option value="NEFT">NEFT</option>
                                </select>
                                <button className="addmaterial_inatallment_form_submit_button"> Submit</button>
                            </form>
                        </div>

                    </>
                )
            }



            {/* Show bill image */}
            {
                showImg && materialBillImg && (
                    <div className='material_bills_image_wrapper'>
                        <p onClick={() => setShowImg(false)} className='material_bills_image_close_button'>X</p>
                        {/* <p>{materialBillImg.billImg}</p> */}
                        <img src={materialBillImg.billImg} alt="" className='material_bills_image' />
                    </div>
                )
            }



            {/*   Material Card */}
            {
                displaymaterialcard && materialcardData && (
                    <>
                        <div className="material_card_main_wrapper">
                            <p onClick={() => setdisplaymaterialcard(false)} className='material_card_close_button'>X</p>
                            <p>Project Name: {materialcardData.project.name}</p>
                            <p>Project Status: {materialcardData.project.status}</p>
                            <p>Material Name: {materialcardData.name}</p>
                            <p>Material Type: {materialcardData.type}</p>
                            <p>Quantity: {materialcardData.quantity}</p>
                            <p>Price: {materialcardData.price}</p>
                            <p>Total Price: {materialcardData.totalPrice}</p>
                            <p>Remaining Amount: {materialcardData.reamingAmount}</p>
                            <p>Vendor Name: {materialcardData.vendorName}</p>
                            <p>Vendor Amount Paid: {materialcardData.vendorAmountPaid}</p>
                            <p>Added On: {materialcardData.addedOn}</p>
                            <h3 className='material_card_h3'>material Installments:</h3>
                            {materialcardData.expenseInstallments?.length > 0 ? (
                                materialcardData.expenseInstallments.map((installment, index) => (
                                    <div key={index} className='material_card_installment_section'>
                                        <p>material Amount: {installment.expenseAmount}</p>
                                        <p>material Pay Date: {installment.expensePayDate}</p>
                                        <p>material Pay Status: {installment.expensePayStatus}</p>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p>No Expense Installments Available</p>
                            )}
                        </div>

                    </>
                )
            }


        </>
    );
}

export default Addmeterial;
