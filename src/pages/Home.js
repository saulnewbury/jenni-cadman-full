import React from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

const Home = () => {
  return (
    <div className="Work">
      <div>
        <Link to="/01/">
          <span>01. </span>Conversations With My Mother
        </Link>
      </div>
      <div>
        <Link to="/02/">
          <span>02. </span>Dear Park
        </Link>
      </div>
      <div>
        <Link to="/02/">
          <span>03. </span>Strand
        </Link>
      </div>
      <div>
        <Link to="/02/">
          <span>04. </span>Coast
        </Link>
      </div>
    </div>
  )
}

export default Home
