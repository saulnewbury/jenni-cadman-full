import React from 'react'
import { Link } from 'react-router-dom'
import './nav-links.scss'

const NavLinks = ({ handleClick, navIsOpen }) => {
  return (
    <div className={`nav-links ${navIsOpen ? 'open' : ''}`}>
      <Link
        to="/work"
        className="link"
        onClick={() => {
          handleClick()
        }}
      >
        Bio
      </Link>
      <Link
        to="/work"
        className="link"
        onClick={() => {
          handleClick()
        }}
      >
        Work
      </Link>
      <Link
        to="/cv"
        className="link"
        onClick={() => {
          handleClick()
        }}
      >
        CV
      </Link>
    </div>
  )
}

export default NavLinks
