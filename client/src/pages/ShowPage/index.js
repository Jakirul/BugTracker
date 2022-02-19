import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ShowPage.css'

const ShowPage = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await fetch(`http://localhost:3001/view/${id}`)
            const jsonData = await data.json();
            setData(jsonData)
        }

        fetchInfo()
    }, [])



    return (
        <div className="ShowPage">
            <div className="information">
                <h2>{data.title}</h2>
                <p>Opened by: <span>{data.user}</span></p>
                {data.status != "Complete" ? <p>Status: <span style={{color: "red"}}>{data.status}</span></p> : <p>Status: <span style={{color: "green"}}>{data.status}</span></p>}
                <textarea value={data.description} readOnly></textarea>
            </div>

            <div className="comments">
                <h2>Comment down below...</h2>
            </div>
        </div>
    )
}

export default ShowPage