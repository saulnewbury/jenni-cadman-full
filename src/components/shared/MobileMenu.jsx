import React from 'react'
import { Link } from 'react-router-dom'
import './mobile-menu.scss'

const MobileMenu = ({ navIsOpen, handleClick }) => {
  return (
    <div className={`mobile-menu ${navIsOpen && ' open'}`}>
      <div className="container">
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
          to="/work"
          className="link"
          onClick={() => {
            handleClick()
          }}
        >
          CV
        </Link>
      </div>
    </div>
  )
}

export default MobileMenu
