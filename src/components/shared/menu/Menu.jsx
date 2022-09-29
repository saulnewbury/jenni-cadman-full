import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import './menu.scss'
import gsapCore from 'gsap/gsap-core'

const Menu = ({ imagesData }) => {
  const { subFolder, images } = imagesData
  // use subFolder as selector to constrain querySelectorAll to corrosponding collection
  const clnSelector = subFolder
  const prevTarget = useRef()
  const timer = useRef()
  const menuContainer = useRef()
  const sizes = useRef({ wide: '20vw', narrow: '4.4vw' })

  useEffect(mediaQueries, [])

  // MOUSEENTER
  const handleMouseEnter = target => {
    // Dims contracted elements (applies only to the first interaction with a given menu).
    if (gsap.getProperty(`.${clnSelector}`, 'opacity') === 1) {
      const elements = menuContainer.current.querySelectorAll(`.${clnSelector}`)
      elements.forEach(ele => {
        if (ele.dataset.size === 'narrow') {
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
      gsap.to(target, { width: sizes.current.wide, opacity: 1 })
      gsap.to(prevTarget.current, { width: sizes.current.narrow, opacity: 0.4 })
      target.dataset.size = 'wide'
      prevTarget.current.dataset.size = 'narrow'
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

  // Change title text to corrolate with expanded image
  function changeText(target) {
    const container = target.parentElement.firstChild
    const pDiscreet = container.nextElementSibling
    const p = container.firstChild
    const titleText = target.getAttribute('data-title')
    pDiscreet.textContent = titleText
    pDiscreet.style.display = 'none'
    p.textContent = titleText
    // setFontSize(p, container, titleText)
  }

  // RETURN
  return (
    <div ref={menuContainer} className="menu">
      <div className="menu-item-title-container">
        <p className="menu-item-title">{images[0].title}</p>
      </div>
      <p className="menu-item-title descreet">{images[0].title}</p>
      <Link
        to={`/work/${images[0].title.replace(/\s+/g, '-').toLowerCase()}`}
        ref={prevTarget}
        data-size="wide"
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
            className={`${clnSelector} image-wrapper rest`}
            to={`/work/${image.title.replace(/\s+/g, '-').toLowerCase()}`}
            key={index}
            data-title={image.title}
            data-size="narrow"
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
    </div>
  )

  function mediaQueries() {
    let mm = gsap.matchMedia()

    mm.add('(max-width: 1040px)', () => {
      const newSizes = {
        wide: '25.962vw',
        narrow: '5.673vw',
        height: '41.538vw',
        titleWidth: '59.231vw',
        fontSize: '5.962vw'
      }
      changeSizes(newSizes)
    })

    mm.add('(min-width: 1041px) and (max-width: 1340px)', () => {
      const newSizes = {
        wide: '270px',
        narrow: '59.3984px',
        height: '432.406px',
        titleWidth: '616.4px',
        fontSize: '62.002px'
      }
      changeSizes(newSizes)

      return () => {
        const newSizes = {
          wide: '20vw',
          narrow: '4.4vw',
          height: '32vw',
          titleWidth: '46vw',
          fontSize: '4.627vw'
        }
        changeSizes(newSizes)
      }
    })

    mm.add('(min-width: 2148px)', () => {
      const newSizes = {
        wide: '429.594px',
        narrow: '94.5078px',
        height: '687.039px',
        titleWidth: '902px',
        fontSize: '98.808px'
      }
      changeSizes(newSizes)

      return () => {
        const newSizes = {
          wide: '20vw',
          narrow: '4.4vw',
          height: '32vw',
          titleWidth: '46vw',
          fontSize: '4.626vw'
        }
        changeSizes(newSizes)
      }
    })

    // Return (cleanup) / calls undo before do / called on unmount
    return () => {
      mm.kill()
    }
  }

  function changeSizes(newSizes) {
    gsap.set('.menu-item-title', {
      width: newSizes.titleWidth,
      fontSize: newSizes.fontSize
    })
    gsap.set('.menu', { height: newSizes.height })
    const elements = menuContainer.current.querySelectorAll('.image-wrapper')
    elements.forEach(ele => {
      if (ele.dataset.size === 'narrow') {
        gsap.set(ele, { width: newSizes.narrow })
      } else {
        gsap.set(ele, { width: newSizes.wide })
      }
    })
    sizes.current = newSizes
  }
}

export default Menu

// The first time render function calls there is no dom.
// Mounting creates dom from jsx and then exits.
// It wont get called again until state changes.
// All the use effect functions get called after render function gets finished and returned.

// Query selecter must be inside a useEffect

// render function then effects
// Layout.

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

// Whenever you want to jump to another react route, you specify it as absolute path unless you want it relative. (if you don't know use absolute).
// Probably use relative when you want to go up a level relative to where you are. Back to collection from artpiece, for instance.
