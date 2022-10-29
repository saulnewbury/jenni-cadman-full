import React, { useRef } from 'react'
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
  const linkContainer = useRef()
  const imageContainer = useRef()
  const image = useRef()

  const q = gsap.utils.selector(imageContainer)

  const changeImage = (id, isHovering) => {
    const images = [...imageContainer.current.querySelectorAll('img')]
    const current = images.find(img => img.dataset.id === id)
    const remaining = images.filter(img => img !== current)

    const fadeIn = gsap.to(current, { opacity: 1, duration: 1.5 })
    const fadeOutRemaining = gsap.to(remaining, { opacity: 0, duration: 1.5 })

    if (isHovering) {
      fadeIn.play()
      fadeOutRemaining.play()
      // gsap.to(q('.cover'), { scaleX: 0 })
    } else {
      fadeIn.kill()
      gsap.to(images, { opacity: 0, duration: 0.5 })
      // gsap.to(q('.cover'), { scaleX: 1 })
    }
  }

  const handleMouseEnter = e => {
    changeImage(e.currentTarget.dataset.id, true)
  }

  const handleMouseLeave = e => {
    changeImage(e.currentTarget.dataset.id, false)
  }
  return (
    <AnimatePage>
      <div className="work">
        <div className="links">
          {arr.map(ele => {
            return (
              <Link
                key={ele.id.toString()}
                to={`/0${ele.id}/`}
                ref={linkContainer}
                data-id={ele.id}
                className="link"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div>
                  <span className="title">{ele.title}</span>
                  <sup className="number">&nbsp;{`0${ele.id}`}</sup>
                </div>
              </Link>
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

// onMouseMove={e => {
//   handleMouseOver(e)
// }}

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
