import React, {useState, useEffect} from 'react'
import {Login, Register} from '../../components'

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
        <p style={{color: "green"}}>{data.status}</p>
        <p>{data.user}</p>
      </div>
    )
  })

  return (
    <div>
      {dataMap}
      
      
    </div>
  );
}

export default Home;
