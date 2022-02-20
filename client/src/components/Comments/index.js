import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AddComments from '../AddComments';
import './Comments.css'

const Comments = ({ id, data }) => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState()
    const [error, setError] = useState()
    const [comment, setComment] = useState("")

    const addComment = async (e) => {
        e.preventDefault();

        const body = {
            "user": localStorage.getItem("username"),
            "comment": comment.trim()
        }

        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json" },
        }

        const addComment = await fetch(`http://localhost:3001/comment/${id}`, options);
        const jsonComment = await addComment.json();

        if (jsonComment.Error) {
            setError("Cannot add a new comment - please don't leave the comment field empty!")
            setSuccess()
        } else {
            setSuccess("Successfully added a new comment!")
            setError()
            setTimeout(() => window.location.reload(), 500)
        }

    }

    return (
        <div className="Comments">
            {
                localStorage.getItem("username")
                    ?
                    data.status !== "Resolved" ?
                        
                
                        <form onSubmit={addComment}>
                            <h2>Comment down below...</h2>
                            <textarea onChange={e => setComment(e.target.value)} ></textarea>
                            <input type="submit" />
                            {error || success ? success ? <p className="success">{success}</p> : <p className="error">{error}</p> : null}
                        </form>
                    :
                        null
                    :
                    <p style={{ color: "red", fontWeight: "bold" }}>Please <span style={{ textDecoration: "underline" }} onClick={() => navigate("/login")}>login</span> to add a new comment!</p>
            }

            {
                data.comment
                    ?
                    data.comment.sort((a,b) => b.timestamp - a.timestamp).map((comment, key) => {
                        return (
                            <AddComments comment={comment} key={key} />
                        )
                    })
                    :
                    null
            }


        </div>
    )
}

export default Comments