import React, {useState, useEffect} from 'react'
import './Home.css'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const bugsData = async () => {
      const data = await fetch("http://localhost:3001/");
      const dataJson = await data.json();
      setData(dataJson)
    }

    bugsData()
  }, [])

  const dataMap = data.map((data, key) => {
    return (
      <div key={key}>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        
        {data.status != "Complete" ? <p style={{color: "red"}}>{data.status}</p> : <p style={{color: "green"}}>{data.status}</p>}
        <p>{data.user}</p>
      </div>
    )
  })

  return (
    <div className="Home">
      {dataMap}
      
      
    </div>
  );
}

export default Home;
