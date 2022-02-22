import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './NewBug.css'

const NewBug = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("Low Priority")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!localStorage.getItem("username") && !localStorage.getItem("token")) {
            console.log("here")
            navigate("/login", {state: {error: "Please login to add a new bug post!"} })
        }
    }, [])

    const submitBug = async (e) => {
        e.preventDefault();

        const body = {
            "title": title,
            "description": description,
            "status": status,
            "user": localStorage.getItem("username")
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json" },
        }

        const submitForm = await fetch("http://localhost:3001/new", options)
        const jsonData = await submitForm.json();

        if (jsonData.Error) {
            setSuccess()
            setError(jsonData.Error)
        } else {
            setError()
            setSuccess(jsonData)
            setTimeout(() => navigate("/"), 500)
        }
    }

    return (
        <div className="NewBug">
            <h1>New bug report</h1>

            <form onSubmit={submitBug}>
                <label htmlFor="title">Title</label>
                <input name="title" type="text" onChange={e => setTitle(e.target.value)} />

                <label htmlFor="description">Description</label>
                <textarea name="description" type="text" onChange={e => setDescription(e.target.value)} />

                <label htmlFor="status">Status</label>
                <select onChange={e => setStatus(e.target.value)}>
                    <option value="Low Priority">Low Priority</option>
                    <option value="Urgent">Urgent</option>
                </select>

                <input type="submit" />

                {success || error 
                    ?
                        success 
                            ? 
                                <p className="success">{success}</p> 
                            : 
                                <p className="error">{error}</p>
                    :
                    null
                }
                

            </form>
        </div>
    )
}

export default NewBug