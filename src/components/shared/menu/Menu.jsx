import React, { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import './menu.scss'

const Menu = ({ imagesData }) => {
  const { subFolder, images } = imagesData
  const clnSelector = subFolder
  const prevTarget = useRef()
  const timer = useRef()

  // MOUSEENTER
  const handleMouseEnter = target => {
    // Dims contracted elements (applies only to the first interaction with a given menu).
    if (gsap.getProperty(`.${clnSelector}`, 'opacity') === 1) {
      const elements = [...document.querySelectorAll(`.${clnSelector}`)]
      elements.forEach(ele => {
        const str = gsap.getProperty(ele, 'width', 'vw')
        const value = +str.substring(0, str.indexOf('v'))
        if (value <= 4.4) {
          gsap.to(ele, { opacity: 0.4 })
        }
      })
    }

    // partially brighten target elements that are contracted.
    if (prevTarget.current !== target) {
      gsap.to(target, { opacity: 0.8 })
    }

    // After 200ms grow and set target elements to full brightness. And, shrink and dim previous target. And, change atwork title
    timer.current = setTimeout(() => {
      // Set title text to corrospond with expanded target element
      changeText(target)
      if (prevTarget.current === target) return
      gsap.to(target, { width: '20vw', opacity: 1 })
      gsap.to(prevTarget.current, { width: '4.4vw', opacity: 0.4 })
      prevTarget.current = target
    }, 200)
  }

  // MOUSELEAVE
  const handleMouseLeave = target => {
    // Exit function if the next element the mouse enters is the one it just left.
    // Dim previous target element and kill timer.
    if (prevTarget.current === target) return
    gsap.to(target, { opacity: 0.4 })
    clearTimeout(timer.current)
  }

  function changeText(target) {
    const container = target.parentElement.firstChild
    const pDescreet = container.nextElementSibling
    const p = container.firstChild
    const titleText = target.getAttribute('data-title')
    pDescreet.textContent = titleText
    pDescreet.style.display = 'none'
    p.textContent = titleText
    // setFontSize(p, container, titleText)
  }

  // RETURN
  return (
    <div className="menu menu-container indent">
      <div className="menu-item-title-container">
        <p className="menu-item-title">{images[0].title}</p>
      </div>
      <p className="menu-item-title descreet">{images[0].title}</p>
      <Link
        to={`/work/${images[0].title.replace(/\s+/g, '-').toLowerCase()}`}
        ref={prevTarget}
        data-title={images[0].title}
        className={`${clnSelector} image-wrapper first-image-wrapper`}
        onMouseEnter={e => {
          handleMouseEnter(e.currentTarget)
        }}
        onMouseLeave={e => {
          handleMouseLeave(e.currentTarget)
        }}
      >
        <img
          className="slice"
          src={`images/${subFolder}/${images[0].imageDetail}.jpg`}
          alt={images[0].alt}
        />
      </Link>
      {images.slice(1).map((image, index) => {
        return (
          <Link
            to={`/work/${image.title.replace(/\s+/g, '-').toLowerCase()}`}
            key={index}
            data-title={image.title}
            className={`${clnSelector} image-wrapper`}
            onMouseEnter={e => {
              handleMouseEnter(e.currentTarget)
            }}
            onMouseLeave={e => {
              handleMouseLeave(e.currentTarget)
            }}
          >
            <img
              src={`/images/${subFolder}/${image.imageDetail}.jpg`}
              alt={image.alt}
            />
          </Link>
        )
      })}
      <Outlet />
    </div>
  )
}

export default Menu

// first time render function calls there is no dom.
// on Mount creates dom from jsx and then exits.
// It wont get called again until state changes.
// All the use effect functions get called after render function gets finished and returned.

// create a reference (use ref) instead of query selector.

// Query selecter must be inside a useEffect

// render function then effects
// Layout.

// Partial increase of opacity without delay
// const str = gsap.getProperty(target, 'width', 'vw')
// const value = +str.substring(0, str.indexOf('v'))

// console.log(value)

// if (value <= 4.4) {
//   gsap.to(target, { opacity: 0.8 })
// } else {
//   gsap.to(target, { opacity: 1 })
// }

// function setFontSize(p, container, titleText) {
//   const str = gsap.getProperty(container, 'width', 'vw')
//   // width / str.length
//   let value =
//     +str.substring(0, str.indexOf('v')) / roundNearest5(titleText.length)
//   if (value < 5) {
//     value = 5
//   } else if (value > 8) {
//     value = 8
//   }
//   p.style.fontSize = `${value}vw`
//   p.style.fontSize = `${value}vw`
// }

// function roundNearest5(num) {
//   return Math.round(num / 5) * 5
// }

// Whenever you want to jump to another react route, you specify it as absolute unless you want it relative. (if you don't know use absolute).

// Probably use relative when you want to go up a level relative to where you are. Back to collection from artpiece, for instance.
