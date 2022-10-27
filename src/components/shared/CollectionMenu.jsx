import React from 'react'
import { Link } from 'react-router-dom'
import './collection-menu.scss'
import { collections } from '../../data/collections'
import { useParams } from 'react-router-dom'

const CollectionMenu = () => {
  const { id } = useParams()

  return (
    <div>
      <div className="collection-menu">
        {collections.map((col, idx) => {
          return (
            <span key={idx}>
              <Link to={`/0${idx + 1}/`} className={`link`}>
                {`0${idx + 1}`}
              </Link>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default CollectionMenu
