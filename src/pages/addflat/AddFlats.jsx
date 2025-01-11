import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './AddFlat.css'
import { BsFillBuildingsFill } from "react-icons/bs";
function Flat() {
  const { id } = useParams()
  console.log(id)

  const [AddScheme, setAddScheme] = useState(false)
  const [selectStatus, setSelectStatus] = useState("")
  const [Schemename, setSchemeName] = useState("")
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [myLand, setMyLand] = useState([])
  const [showCount, setShowCount] = useState("")
  const navigate = useNavigate()
const [count ,setCount]=  ("0")

  function handlescheme(e) {
    e.preventDefault()
    setAddScheme(!AddScheme)
  }

  async function handleCreateScheme(e) {
    e.preventDefault()
    const obj = {
      name: Schemename,
      status: selectStatus,
      landId: id
    }
    if (!id) {
      return alert("project start from land")
    }
    try {
      const reponse = await axios.post("http://localhost:8080/createProject", obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(reponse)
      alert("add Scheme Successfully")
      setAddScheme("")
setCount(count+1)
    } catch (error) {
      console.log(error)
    }
  }

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
  }, [count])

  function handleclick(id,newname) {
    console.log(id)
    if (!id) {
      return alert("Project has not started yet"); // Custom alert message
    }
    console.log(id);
    navigate(`/flatlist/${id}`, { state: { newname } });

  }

  useEffect(() => {
    async function getingCount() {
      try {
        const reponse = await axios.get("http://localhost:8080/count", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        console.log(reponse.data)
        setShowCount(reponse.data)
      } catch (error) {
        console.log(error)
      }
    }

    getingCount()
  }, [])
  return (
    <>
      <div className="materialwrapper">
        <h1>Flat Scheme Management System</h1>
        <p>{id}</p>
        <form >
          <div className="add_seheme_btn">
            <button onClick={handlescheme} >Add Scheme</button>
          </div>
        </form>

        {/* fetch All scheme */}
        <div className="flatWrapper">
          {
            myLand.map((item, index) => {
              const countData = showCount[item.id];
              const availableCount = countData ? countData.AVAILABLE : 0;
              const bookedCount = countData ? countData.BOOKED : 0;

              return (
                <div key={index} onClick={() => handleclick(item.id, item.name)} className="flatcontainer">
                  <BsFillBuildingsFill size={80} color="rgb(6, 151, 177)" />
                  <p>{item.name}</p>
                  <p className="status">{item.status}</p>
                  <div className="span">
                    <span className="book">Booked <br /> {bookedCount || 0}</span>
                    <span className="available">Available <br /> {availableCount || 0}</span>
                  </div>
                </div>
              );
            })
          }
        </div>

        {/* Add Scheme Here */}
        {
          AddScheme && (
            <>
              <div className="AddSchemeForm" >
                <button className="add_scheme_cross_button" onClick={() => setAddScheme(!AddScheme)}>X</button>
                <form onSubmit={handleCreateScheme}>
                  <div>
                    <select name="" id="" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)}>
                      <option value="">
                        select
                      </option>
                      <option value="IN_PROGRESS">
                        IN_PROGRESS
                      </option>
                      <option value="IN_PROGRESS">
                        COMPLETE
                      </option>
                      <option value="IN_PROGRESS">
                        INACTIVE
                      </option>
                    </select>

                    <input type="text" value={Schemename} onChange={(e) => setSchemeName(e.target.value)}  placeholder="Create Your Project"/>
                  </div>
                  <button>Create Scheme</button>
                </form>

              </div>
            </>
          )
        }
      </div>
    </>
  );
}

export default Flat;
