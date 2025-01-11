import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsFillBuildingsFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


function Material() {

  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [myLand, setMyLand] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    async function getLand() {
      try {
        const response = await axios.get("http://localhost:8080/getAllProjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response)
        setMyLand(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getLand()
  }, [])


  function handleclick(id) {
    console.log(id)
    navigate(`/addmaterial/${id}`)

  }
  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "35px", marginBottom: "35px" }}>Material management</h2>

      <div className="flatWrapper">
        {
          myLand.map((item, index) => {
            return (
              <div key={index} onClick={() => handleclick(item.id)} className="flatcontainer">
                <BsFillBuildingsFill size={80} color="rgb(6, 151, 177)" />
                <p> <b> {item.name}  </b></p>
                <p className="status">{item.status}</p>

              </div>
            );
          })
        }
      </div>

    </>
  )
}

export default Material