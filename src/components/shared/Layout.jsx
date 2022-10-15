import React, { useState } from 'react'
import './layout.scss'
import './chocolate-forward.scss'
import './chocolate-reverse.scss'
import Footer from './Footer'
import MobileMenu from './MobileMenu'
import ChocolateButton from './ChocolateButton'

const Layout = ({ children }) => {
  const [navIsOpen, setNavIsOpen] = useState(false)

  function handleClick() {
    console.log('object')
    setNavIsOpen(!navIsOpen)
  }

  return (
    <>
      <div>
        <main>
          <div className="topbar">
            <div className="container">
              <span>Jenni Cadman</span>
              <ChocolateButton
                handleClick={handleClick}
                navIsOpen={navIsOpen}
              />
            </div>
            <MobileMenu navIsOpen={navIsOpen} handleClick={handleClick} />
          </div>
          {children}
        </main>
        <Footer className="footer" />
      </div>
    </>
  )
}

export default Layout
