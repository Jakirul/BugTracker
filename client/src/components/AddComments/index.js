import React from 'react'
import './AddComments.css'

const AddComments = ({ comment }) => {
    let randomNumber = Math.floor(Math.random() * 1000)
    let parseDate = new Date(comment.timestamp).toLocaleString()
    return (
        <div>
            <div key={randomNumber}>
                <div>
                    <h3>User: {comment.user}</h3>
                    <p>Posted: <span style={{fontWeight: "bold"}}>{parseDate}</span></p>
                </div>
                <p>{comment.comment}</p>

            </div>
            
        </div>
    )
}

export default AddComments