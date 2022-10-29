import React from 'react'
import './mobile-menu.scss'
// import NavLinks from './NavLinks'
import { Link } from 'react-router-dom'
import ContactInfo from './ContactInfo'
import Socials from './Socials'

const MobileMenu = ({ navIsOpen, handleClick }) => {
  return (
    <div className={`mobile-menu ${navIsOpen ? ' open' : ''}`}>
      <div className={`mobile-menu-bg`}></div>
      <div className={`nav-links ${navIsOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className="link"
          onClick={() => {
            handleClick()
          }}
        >
          Work
        </Link>
        <Link
          to="/bio"
          className="link"
          onClick={() => {
            handleClick()
          }}
        >
          Bio
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
      <Socials />
    </div>
  )
}

export default MobileMenu
