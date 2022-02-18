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

            {
                !localStorage.getItem("username")

                    ?
                    <div>
                        <div>
                            <Link to="/">Home page</Link>
                        </div>

                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                    :

                    <div>
                        <div>
                            <Link to="/">Home page</Link>
                            <Link to="/new">New Bug</Link>
                            <Link to="/profile">Your bugs</Link>
                        </div>

                        <div>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Navbar