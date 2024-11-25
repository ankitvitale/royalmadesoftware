import React from 'react'
import './Latter.css'
function Latter() {
  const Latters = ["Offer Latter", "Salary Certificate", "Demand Latter", "Relieving Latter"];

  return (
    <>
<div className="latters">
{
  Latters.map((e)=>(

    <div className="latter">

      <h3>{e}</h3>
    </div>
  ))
}
</div>

    </>
  )
}

export default Latter