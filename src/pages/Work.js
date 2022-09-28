import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { collections } from '../data/collections'
import './work.scss'
import Menu from '../components/shared/menu/Menu'
import MobileImageMenu from '../components/shared/menu/MobileImageMenu'
import AnimatePage from '../components/shared/AnimatePage'

// import { BsArrowDown } from 'react-icons/bs'

const Work = () => {
  const [isHoverDevice, setIsHoverDevice] = useState(false)

  useEffect(() => {
    let mm = gsap.matchMedia()

    mm.add(`(hover: hover)`, () => {
      setIsHoverDevice(true)
    })

    return () => {
      mm.kill()
    }
  })

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
                  {/* <div className="arrow-down-container">
                    <BsArrowDown className="icon" />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="description">
              <p>{desc}</p>
            </div>
            {/* <div className="indent"> */}
            {/* Menu */}
            {isHoverDevice ? (
              <Menu imagesData={imagesData} />
            ) : (
              <Menu imagesData={imagesData} />
            )}

            {/* </div> */}
          </div>
        )
      })}
    </AnimatePage>
  )
}

export default Work
