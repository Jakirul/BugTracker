import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { Home, ErrorPage, NewBug, Login, Register, YourBugs } from './pages'
import './styling/App.css'

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("username") && !localStorage.getItem("token")) {
      localStorage.clear();
      navigate("/")
    }

  }, [localStorage.getItem("username")])
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/new" element={<NewBug />} />
        <Route exact path="/profile" element={<YourBugs />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App