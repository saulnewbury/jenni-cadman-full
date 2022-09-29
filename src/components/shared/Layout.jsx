import React from 'react'
import styles from './layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div>
      <div className={styles.topbar}>
        <span>Jenni Cadman</span>
        <span>Work</span>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Layout
