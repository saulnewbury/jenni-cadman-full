import React from 'react'
import styles from './layout.module.scss'

const Layout = ({ children, title }) => {
  return (
    <div>
      <div className={styles.topbar + ' indent'}>
        <span>Jenni Cadman</span>
        <span> {title}</span>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Layout
