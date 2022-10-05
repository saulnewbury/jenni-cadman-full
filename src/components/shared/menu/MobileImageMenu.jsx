import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './mobileImageMenu.scss'
import gsap from 'gsap'

const MobileImageMenu = ({ imagesData }) => {
  const { subFolder, images } = imagesData

  const [numOfItems, setNumOfItems] = useState(6)
  const [current, setCurrent] = useState(0)
  const [leftMost, setLeftMost] = useState(0)

  const outerContainer = useRef()
  const container = useRef()

  useEffect(mediaQueries, [])

  const calcValues = setUp(numOfItems)

  function mediaQueries() {
    let mm = gsap.matchMedia()
    for (let index = 7; index <= 14; index++) {
      let min = (index / 3.5) * 200
      console.log(min)

      mm.add(`(min-width: ${min}px)`, () => {
        setNumOfItems(index)
      })
    }
    mm.add(`(max-width: 399px)`, () => {
      setNumOfItems(6) // 6 items
    })

    return () => {
      mm.kill()
    }
  }

  function setUp(numOfItems) {
    const result = {}

    const width = 100 / numOfItems

    // reset container position to 0, width to 14 one-hundredths, and height
    result.container = {
      width: `${width * 14}%`,
      height: `${width * 6.5}vw`
    }
    result.padding = `${width / 50}vw`

    result.left = `${-leftMost * width}vw`

    // set each item's widths (wide and narrow)
    result.narrow = width
    result.wide = width * 4
    return result
  }

  function handleClick(e) {
    e.preventDefault()
    const target = e.currentTarget
    const prevTarget = container.current.children[current]

    // exit function if clicking on item already selected
    if (prevTarget === target) return

    // expand target element (and set to full opacity)
    gsap.to(target, { width: `${calcValues.wide}vw`, opacity: 1 })

    // shrink previously selected element (and set opacity)
    gsap.to(prevTarget, {
      width: `${calcValues.narrow}vw`,
      onComplete: () => {
        setCurrent(target.dataset.id)
      }
    })

    const elements = container.current.querySelectorAll('.image-item')
    elements.forEach(ele => {
      ele !== target && gsap.to(ele, { opacity: 0.7 }) // REMEMBER THIS
    })

    // Create flag to determine regular or inverse calculation.
    const isInverse = current > +target.dataset.id

    containerPosition(target, isInverse)
  }

  // POSITIONING
  function containerPosition(target, isInverse) {
    // FORWARD
    if (!isInverse) {
      // get position 2 (offset)
      const pos2 = leftMost + 1

      // Work out items not in view
      const idLastInView = leftMost + numOfItems - 1
      const itemsTotal = images.length - 1 // -1 to adjust for starting at zero
      const itemsOutside = itemsTotal - idLastInView

      // get difference to travel
      const diff =
        +target.dataset.id - pos2 < itemsOutside
          ? +target.dataset.id - pos2
          : itemsOutside

      // add difference to existing position
      gsap.to(container.current, {
        left: `-${(diff + leftMost) * calcValues.narrow}vw`,
        onComplete: () => setLeftMost(leftMost + diff)
      })
    } else {
      // INVERSE
      const last = leftMost + (numOfItems - 1) // 5 + 5 = 10 (id: 9)
      const pen = last - 1 // 8
      const itemsOutside = last - (numOfItems - 1) // 9 - 4 = 3
      const diff =
        pen - +target.dataset.id < itemsOutside
          ? pen - +target.dataset.id
          : itemsOutside

      gsap.to(container.current, {
        left: `-${(itemsOutside - diff) * calcValues.narrow}vw`,
        onComplete: () => setLeftMost(leftMost - diff)
      })
    }
  }
  return (
    <div
      ref={outerContainer}
      className="outer-container"
      style={calcValues.container}
    >
      <div className="mobile-menu-item-title-container">
        <p className="mobile-menu-item-title">{images[current].title}</p>
      </div>
      <div
        ref={container}
        className="mobile-image-menu"
        style={{
          left: calcValues.left,
          height: calcValues.container.height
        }}
      >
        {images.map((image, idx) => (
          <Link
            to={`/work/${image.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="image-item"
            style={{
              paddingLeft: calcValues.padding,
              paddingRight: calcValues.padding,
              height: calcValues.container.height,
              width: `${
                idx === current ? calcValues.wide : calcValues.narrow
              }vw`
            }}
            data-title={image.title}
            data-size={idx === current ? 'wide' : 'narrow'}
            data-id={idx}
            onClick={e => {
              handleClick(e)
            }}
            key={idx}
          >
            <img
              src={`/images/${subFolder}/${image.imageDetail}.jpg`}
              alt={image.alt}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileImageMenu

//  signum === '-' ? console.log('regular') : console.log('inverse')

// Calculate amountToMove

// if element id is equal to 0:
// 1. (2 * 10) - (10 * 2) = pos -10
// 2. (2 * 10) - (10 * 2) = pos 0
// 3. (3 * 10) - (10 * 2) = pos 10
// 4. (4 * 10) - (10 * 2) = pos 20
// 5. (5 * 10) - (10 * 2) = pos 30
// 6. (6 * 10) - (10 * 2) = pos 40
// 7. (7 * 10) - (10 * 2) = pos 50
// etc.

// (minus symbol added later)

// Special cases

// 1.
// if combined width of elements outside of viewport is 0 (which means there are none)
// don't change position.

// 2.
// if the combined width of elements outside of viewport is smaller than the amountToMove
// value, simply add combined width to existing position value

//
// mm.add(`(min-width: ${min}px) and (max-width: ${max}px)`, () => {
//   const numOfItems = index
//   const width = 100 / index
//   const fontSize = width / fs
//   const titleWidth = width * tw
//   setUp(numOfItems, width, fontSize, titleWidth)
// })
// mm.add(`(min-width: 0px) and (max-width: 341px)`, () => {
//   // 6 items
//   const numOfItems = 6
//   const width = 100 / 6
//   const fontSize = width / 1.4
//   const titleWidth = width * 5
//   setUp(numOfItems, width, fontSize, titleWidth)
// })
