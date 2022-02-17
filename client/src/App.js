import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Login, Register, Navbar } from './components'
import { Home, ErrorPage, CreateListing } from './pages'
import './styling/App.css'

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/create" element={<CreateListing />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App