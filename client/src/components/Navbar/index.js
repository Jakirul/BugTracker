import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()

    const logout = (e) => {
        localStorage.clear();
        navigate("/")
    }

    return (

        <div className="Navbar">
            <div>
                <Link to="/">Home page</Link>
                <Link to="/create">Create Listing</Link>
            </div>
            {
                !localStorage.getItem("username")
                    
                    ?
                    
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                    :
                    
                    
                    <div>
                        <Link to="/" onClick={logout}>Logout</Link>
                    </div>
            }


        </div>
    )
}

export default Navbar