import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import './work.scss'
import AnimatePage from '../components/shared/AnimatePage'

const arr = [
  {
    id: 1,
    title: 'Conversations With My Mother',
    subFolder: 'veronica',
    image: 'veronica-3-detail'
  },
  {
    id: 2,
    title: 'Deer Park',
    subFolder: 'deer-park-1',
    image: 'embracing-a-colourful-world-detail'
  },
  { id: 3, title: 'Strand', subFolder: 'veronica', image: 'veronica-5-detail' },
  { id: 4, title: 'Coast', subFolder: 'veronica', image: 'veronica-7-detail' }
]

const Work = () => {
  const [isHovering, setIsHovering] = useState('initial')
  const [id, setId] = useState(1)

  const linkContainer = useRef()
  const imageContainer = useRef()
  const image = useRef()

  const q = gsap.utils.selector(imageContainer)

  useEffect(() => {
    if (isHovering === 'initial') return

    console.log(id)

    const images = [...imageContainer.current.querySelectorAll('img')]
    const current = images.find(img => img.dataset.id === id)
    const remaining = images.filter(img => img !== current)
    if (isHovering) {
      gsap.to(current, { opacity: 1 })
      gsap.to(remaining, { opacity: 0 })
      // gsap.to(q('.cover'), { scaleX: 0 })
    } else {
      gsap.to(images, { opacity: 0 })
      // gsap.to(q('.cover'), { scaleX: 1 })
    }
  }, [isHovering])

  const handleMouseEnter = e => {
    console.log('enter')
    setId(e.currentTarget.dataset.id)
    setIsHovering(true)
  }

  const handleMouseLeave = e => {
    console.log('leave')
    setIsHovering(false)
  }
  return (
    <AnimatePage>
      <div className="work">
        <div className="links">
          {arr.map(ele => {
            return (
              <div key={ele.id.toString()} ref={linkContainer}>
                <Link
                  to={`/0${ele.id}/`}
                  data-id={ele.id}
                  className="link"
                  // onMouseMove={e => {
                  //   handleMouseOver(e)
                  // }}
                  onMouseEnter={e => {
                    handleMouseEnter(e)
                  }}
                  onMouseLeave={e => {
                    handleMouseLeave(e)
                  }}
                >
                  <span className="title">{ele.title}</span>
                  <sup className="number">&nbsp;{`0${ele.id}`}</sup>
                </Link>
              </div>
            )
          })}
        </div>
        <div className="image">
          <div ref={imageContainer} className={`wrapper`}>
            {arr.map(ele => {
              return (
                <img
                  key={ele.id}
                  data-id={ele.id}
                  src={`/images/${ele.subFolder}/${ele.image}.jpg`}
                  alt=""
                  ref={image}
                />
              )
            })}
            <div className="cover"></div>
          </div>
        </div>
      </div>
    </AnimatePage>
  )
}

export default Work

// let x, y
// function handleMouseOver(e) {
//   const linkRect = linkContainer.current.getBoundingClientRect()
//   const imageRect = image.current.getBoundingClientRect()
//   x = e.clientX - Math.max(linkRect.x - 200, 200)
//   x = e.clientX - linkRect.x - 200
//   y = e.clientY - imageRect.height / 2
//   gsap.to(imageContainer.current, {
//     left: `${x}px`,
//     top: `${y}px`,
//     delay: 0.2,
//     duration: 0.3
//   })
// }
