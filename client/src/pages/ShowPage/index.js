import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Comments } from '../../components'
import './ShowPage.css'

const ShowPage = () => {
    const [data, setData] = useState([])
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const { id } = useParams()

    useEffect(() => {
        const fetchInfo = async () => {
            const data = await fetch(`http://localhost:3001/view/${id}`)
            const jsonData = await data.json();
            setData(jsonData)
        }

        fetchInfo()
    }, [])

    const markAsComplete = async (e) => {
        e.preventDefault()

        const options = {
            method: 'PUT',
            headers: { "Content-type": "application/json", "Authorization": localStorage.getItem("token") },
        }

        const resolve = await fetch(`http://localhost:3001/bug/${id}`, options)
        const resolveJson = await resolve.json();

        console.log(resolveJson)
        if (resolveJson.Error) {
            setError("Could not mark this as resolved, please try again later")
            setSuccess()
        } else {
            setSuccess(resolveJson)
            setError()
            setTimeout(() => window.location.reload(), 500)
        }
    
    }

    return (
        <div className="ShowPage">
            <div className="information">
                <h2>{data.title}</h2>
                <p>Opened by: <span>{data.user}</span></p>
                {data.status !== "Resolved" ? <p>Status: <span style={{ color: "red" }}>{data.status}</span></p> : <p>Status: <span style={{ color: "green" }}>{data.status}</span></p>}
                <textarea value={data.description} readOnly></textarea>
                {localStorage.getItem("username") && localStorage.getItem("token") && localStorage.getItem("username") == data.user && data.status !== "Resolved"
                    ?
                        <form onSubmit={markAsComplete}>
                            <button type="submit">Mark as resolved?</button>
                            {error || success ? success ? <p className="success">{success}</p> : <p className="error">{error}</p> : null}
                        </form>
                    :
                        null
                
                }
                
            </div>

            <div className="comments">
                <Comments id={id} data={data} />

            </div>


        </div>
    )
}

export default ShowPage