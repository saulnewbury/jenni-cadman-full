import React from 'react'
import { Link } from 'react-router-dom'
import './collection-menu.scss'

const CollectionMenu = () => {
  return (
    <div>
      <div className="collection-menu">
        <Link to="/01" className="link">
          01
        </Link>
        <Link to="/02" className="link">
          02
        </Link>
        <Link to="/03" className="link">
          03
        </Link>
        <Link to="/04" className="link">
          04
        </Link>
      </div>
    </div>
  )
}

export default CollectionMenu
