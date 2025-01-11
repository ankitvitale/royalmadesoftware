import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Latter.css'
function Latter() {
  const navigate = useNavigate()
  function handleofferLatter() {
    navigate("/offerlatter")
  }

  function handleRelievinglatter() {
    navigate("/Relievinglatter")
  }
  function handleSalarySlip() {
    navigate("/SalarySlip")
  }
  function handleallotment() {
    navigate("/allotment")
  }

  function handleDemand() {
    navigate("/demand")
  }
  function handleLetterhead() {
    navigate("/letterhead")
  }
  return (
    <>
      <div className="latters">
        <button onClick={handleofferLatter} className='letter_buttons'> Offer Latter</button>
        <button onClick={handleRelievinglatter} className='letter_buttons'>Riveling Latter</button>
        <button onClick={handleSalarySlip} className='letter_buttons'>Salary Slip</button>
        <button onClick={handleallotment} className='letter_buttons'>  Allotment Latter</button>
        <button onClick={handleDemand} className='letter_buttons'> Demand Latter</button>
        <button onClick={handleLetterhead} className='letter_buttons'> Letter Heades</button>

      </div>

    </>
  )
}

export default Latter