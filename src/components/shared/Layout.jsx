import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import './layout.scss'
import './chocolate-forward.scss'
import './chocolate-reverse.scss'
import MobileMenu from './MobileMenu'
import ChocolateButton from './ChocolateButton'
import CollectionMenu from './CollectionMenu'

const Layout = ({ children }) => {
  const [navIsOpen, setNavIsOpen] = useState(false)
  // Disable scroll while modal is open
  useEffect(() => {
    if (navIsOpen) gsap.set('body', { overflow: 'hidden' })
    if (!navIsOpen) gsap.set('body', { overflow: 'unset' })
  }, [navIsOpen])

  function handleClick() {
    console.log('object')
    setNavIsOpen(!navIsOpen)
  }

  return (
    <div>
      <main>
        <CollectionMenu />
        <div className="topbar">
          <div className="container">
            <span>Jenni Cadman</span>
            <ChocolateButton handleClick={handleClick} navIsOpen={navIsOpen} />
          </div>
          <MobileMenu navIsOpen={navIsOpen} handleClick={handleClick} />
        </div>
        {children}
      </main>
    </div>
  )
}

export default Layout
