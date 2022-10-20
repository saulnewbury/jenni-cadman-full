import React from 'react'
import './mobile-menu.scss'
import NavLinks from './NavLinks'
import ContactInfo from './ContactInfo'

const MobileMenu = ({ navIsOpen, handleClick }) => {
  return (
    <div className={`mobile-menu ${navIsOpen ? ' open' : ''}`}>
      <div className={`mobile-menu-bg`}></div>
      <NavLinks navIsOpen={navIsOpen} handleClick={handleClick} />
      <ContactInfo />
    </div>
  )
}

export default MobileMenu
