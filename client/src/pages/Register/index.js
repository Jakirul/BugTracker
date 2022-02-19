import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault();

        const body = {
            "username": username,
            "password": password
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { "Content-type": "application/json" },
        }

        const login = await fetch("http://localhost:3001/register", options)
        const json = await login.json();

        if (json.Error) {
            setSuccess()
            setError(json.Error)
        } else {
            setError()
            setSuccess("Successfully registered!")
            setTimeout(() => navigate("/login"), 500)
        }
    }

    return (
        <div className="Register">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)} />

                <input type="submit" />

                <p>Already have an account? <span onClick={() => navigate("/login")}>Login here</span></p>
                {success ? <p className="success">{success}</p> : <p className="error">{error}</p>}

            </form>
            
        </div>
    )
}

export default Login