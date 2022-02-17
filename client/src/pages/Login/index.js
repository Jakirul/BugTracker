import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const loginUser = async (e) => {
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

        const login = await fetch("http://localhost:3001/login", options)
        const json = await login.json();

        if (json.Error) {
            setSuccess()
            setError(json.Error)
            localStorage.clear()
        } else {
            setError()
            setSuccess("Successfully logged in!")
            localStorage.setItem("username", username)
            localStorage.setItem("token", json.token)
            navigate("/")
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e => setUsername(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={e => setPassword(e.target.value)} />

                <input type="submit" />

            </form>
            <p>{error}</p>
            <p>{success}</p>
        </div>
    )
}

export default Login