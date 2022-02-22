import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import jwt_decode from 'jwt-decode'
import { Home, ErrorPage, NewBug, Login, Register, YourBugs, ShowPage } from './pages'
import './styling/App.css'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {

  }, [localStorage.getItem("username")])

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token1 = localStorage.getItem("token");
      let decodedToken = jwt_decode(token1);
      const d = new Date(0);
      d.setUTCSeconds(decodedToken.exp);
      let currentDate = new Date();
      let result = false;

      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.clear()
      } else {
        result = true;
      }
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/new" element={<NewBug />} />
        <Route exact path="/profile" element={<YourBugs />} />
        <Route exact path="/view/:id" element={<ShowPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App