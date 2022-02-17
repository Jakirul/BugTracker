import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateListing = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("username") && !localStorage.getItem("token")) {
            navigate("/login")
        }
    }, [])

    return (
        <div>CreateListing</div>
    )
}

export default CreateListing