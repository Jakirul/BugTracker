import React from 'react'
import { useNavigate } from 'react-router-dom'
import './FlashWarning.css'

const FlashWarning = ({warning, setHideFlash}) => {
  const navigate = useNavigate()
  console.log(window.location.pathname)
  const hideBtn = (e) => {
    setHideFlash(true)

    if (window.location.pathname === "/login") {
      navigate("/login", {replace: true})
    } else if (window.location.pathname === "/") {
      navigate("/", {replace: true})
    }
    
  }
  return (
    <div className="FlashWarning">
        <div>
          <h1>{warning}</h1>
        </div>
        <button onClick={hideBtn}>X</button>
    </div>
  )
}

export default FlashWarning