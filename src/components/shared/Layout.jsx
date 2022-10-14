import React from 'react'
import './layout.scss'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <main>
          <div className="topbar">
            <span>Jenni Cadman</span>
            <span>Work</span>
          </div>
          {children}
        </main>
        <Footer className="footer" />
      </div>
    </>
  )
}

export default Layout
