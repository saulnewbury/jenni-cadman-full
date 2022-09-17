import React from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
  return (
    <div>
      <Link to="/work/" className="link">
        Work
      </Link>
    </div>
  )
}

export default Home
