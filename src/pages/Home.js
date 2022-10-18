import React from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
  return (
    <div>
      <Link to="/01/" className="link">
        01
      </Link>
      <Link to="/02/" className="link">
        02
      </Link>
      <Link to="/03/" className="link">
        03
      </Link>
      <Link to="/04/" className="link">
        04
      </Link>
    </div>
  )
}

export default Home
