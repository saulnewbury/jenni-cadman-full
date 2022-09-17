import React from 'react'
import { collections } from '../data/collections'
// import styles from './work.module.scss'
import './work.scss'
import Menu from '../components/shared/menu/Menu'
import AnimatePage from '../components/shared/AnimatePage'
import { BsArrowDown } from 'react-icons/bs'

const Work = () => {
  return (
    <AnimatePage>
      {collections.map(cln => {
        const { subFolder, date, desc, featuredImage, id, imagesData, title } =
          cln
        return (
          <div key={id} className="collection">
            <div className="header">
              <img
                width="2000"
                height="3008"
                src={`images/${subFolder}/${featuredImage.name}.jpg`}
                alt={featuredImage.altText}
              />
              <div className="title-info">
                <div className="wrapper">
                  <h4 className="date">{date}</h4>
                  <h2 className="title">{title}</h2>
                  <div className="arrow-down-container">
                    <BsArrowDown className="icon" />
                  </div>
                </div>
              </div>
            </div>
            <div className="description indent">
              <p>{desc}</p>
            </div>
            {/* Menu */}
            <Menu imagesData={imagesData} />
          </div>
        )
      })}
    </AnimatePage>
  )
}

export default Work
