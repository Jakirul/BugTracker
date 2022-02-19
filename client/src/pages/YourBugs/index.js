import React, {useState, useEffect} from 'react'
import './YourBugs.css'

const YourBugs = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getBugs = async () => {
      const data = await fetch(`http://localhost:3001/get?user=${localStorage.getItem("username")}`)
      const jsons = await data.json();
      setData(jsons)
    }

    getBugs()
  }, [])

  const dataMap = data.map((data, key) => {
    return (
      <div key={key}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        
        {data.status !== "Complete" ? <p style={{color: "red"}}>{data.status}</p> : <p style={{color: "green"}}>{data.status}</p>}
        <p>{data.user}</p>
      </div>
    )
  })

  return (
    <div className="YourBugs">
        <h1>Your bugs</h1>
        <hr />
        {data.length ? dataMap : <p>You haven't reported any bugs!</p>}
    </div>
  )
}

export default YourBugs