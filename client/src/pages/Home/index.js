import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FlashWarning } from '../../components'
import './Home.css'

const Home = () => {
  const [data, setData] = useState([])
  const [hideFlash, setHideFlash] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [value, currentValue] = useState("")
  const navigate = useNavigate()
  const {state} = useLocation();

  useEffect(() => {
    const bugsData = async () => {
      const data = await fetch("http://localhost:3001/");
      const dataJson = await data.json();
      setData(dataJson)
      setLoading(false)
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
      <div key={key} className="bugs"  onClick={() => navigate(`/view/${data._id}`)}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>

        {data.status != "Resolved" ? <p style={{ color: "red" }}>{data.status}</p> : <p style={{ color: "green" }}>{data.status}</p>}
        <p>{data.user}</p>
      </div>
    )
  })

  return (
    <div className="Home">
      {state ? !hideFlash ? <FlashWarning warning={state.error} setHideFlash={setHideFlash} /> : null : null}
      
      <form onSubmit={filterSearch}>
        <button onClick={() => currentValue("All")}>Show All</button>
        <button onClick={() => currentValue("Unresolved")}>Show Unresolved</button>
        <button onClick={() => currentValue("Resolved")}>Show Resolved</button>
      </form>
      {isLoading ? <h1>Loading....</h1> : !data.length ? <h1>Nothing found as of yet...</h1> : dataMap}


    </div>
  );
}

export default Home;
