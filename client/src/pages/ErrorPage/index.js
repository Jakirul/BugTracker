import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
        <p>Oops! This route does not exist, click here to go back to the home page</p>
        <Link to="/">Let's go back home</Link>
    </div>
  )
}

export default ErrorPage