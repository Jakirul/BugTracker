import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const [data, setData] = useState([])
  const [value, currentValue] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const bugsData = async () => {
      const data = await fetch("http://localhost:3001/");
      const dataJson = await data.json();
      setData(dataJson)
    }

    bugsData()
  }, [])

  const filterSearch = async (e) => {
    e.preventDefault();
    const filterSearch = await fetch(`http://localhost:3001/filter/${value}`)
    const jsonFilter = await filterSearch.json();
    setData(jsonFilter)

  }

  const dataMap = data.map((data, key) => {
    return (
      <div key={key}>
        <h1 onClick={() => navigate(`/view/${data._id}`)}>{data.title}</h1>
        <p>{data.description}</p>

        {data.status != "Resolved" ? <p style={{ color: "red" }}>{data.status}</p> : <p style={{ color: "green" }}>{data.status}</p>}
        <p>{data.user}</p>
      </div>
    )
  })

  return (
    <div className="Home">
      <form onSubmit={filterSearch}>
        <button onClick={() => currentValue("All")}>Show All</button>
        <button onClick={() => currentValue("Low Priority")}>Show Low Priority</button>
        <button onClick={() => currentValue("Resolved")}>Show Resolved</button>
      </form>
      {!data.length ? <h1>Nothing found as of yet...</h1> : dataMap}


    </div>
  );
}

export default Home;
