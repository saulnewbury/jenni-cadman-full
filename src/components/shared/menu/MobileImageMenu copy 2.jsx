import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './mobileImageMenu.scss'
import gsap from 'gsap'

const MobileImageMenu = ({ imagesData }) => {
  const { subFolder, images } = imagesData

  const [numOfItems, setNumOfItems] = useState(1)
  const [current, setCurrent] = useState(0)
  const [leftMost, setLeftMost] = useState(0)

  const outerContainer = useRef()
  const container = useRef()
  const lastCurrent = useRef(current)
  const lastLeft = useRef(leftMost)

  const calcValues = setUp(numOfItems)

  useEffect(mediaQueries, [])

  // Run animations on change of 'current'. Do this as a 'layout' effect so that
  // users don't see a flash of the target state (set by React render).
  useLayoutEffect(() => {
    if (current !== lastCurrent.current) {
      const prevTarget = container.current.children[lastCurrent.current]
      const newTarget = container.current.children[current]
      gsap.fromTo(
        prevTarget,
        { width: `${calcValues.wide}vw`, opacity: 1.0 },
        { width: `${calcValues.narrow}vw`, opacity: 0.4 }
      )
      gsap.fromTo(
        newTarget,
        { width: `${calcValues.narrow}vw`, opacity: 0.4 },
        { width: `${calcValues.wide}vw`, opacity: 1.0 }
      )
      lastCurrent.current = current
    }
  })

  // Animate the change in container position when the leftmost item changes.
  useLayoutEffect(() => {
    if (leftMost !== lastLeft.current) {
      gsap.fromTo(
        container.current,
        { left: `-${lastLeft.current * calcValues.narrow}vw` },
        { left: `-${leftMost * calcValues.narrow}vw` }
      )
      lastLeft.current = leftMost
    }
  })

  function mediaQueries() {
    let mm = gsap.matchMedia()
    for (let index = 7; index <= 14; index++) {
      let min = (index / 3.5) * 200,
        max = index < 14 ? ((index + 1) / 3.5) * 200 - 1 : 0

      const minmax =
        `(min-width: ${min}px)` + (max > 0 ? ` and (max-width: ${max}px)` : '')
      mm.add(minmax, () => {
        console.log('MQ', index)
        setNumOfItems(index)
        setCurrent(0)
        setLeftMost(0)
      })
    }
    mm.add(`(max-width: 399px)`, () => {
      console.log('MQ', 6)
      setNumOfItems(6) // 6 items
      setCurrent(0)
      setLeftMost(0)
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

    result.left = `-${leftMost * width}vw`

    // set each item's widths (wide and narrow)
    result.narrow = width
    result.wide = width * 4
    return result
  }

  function handleClick(e) {
    e.preventDefault()
    const target = e.currentTarget
    const targetId = +target.dataset.id

    // exit function if clicking on item already selected
    if (targetId === current) return

    setCurrent(targetId)

    // Create flag to determine regular or inverse calculation.
    const isInverse = current > targetId
    containerPosition(targetId, isInverse)
  }

  // POSITIONING
  function containerPosition(targetId, isInverse) {
    let newLeft = leftMost
    // FORWARD
    if (!isInverse) {
      // get position 2 (offset)
      const pos2 = leftMost + 1

      // Work out items not in view
      const itemsTotal = images.length
      const idLastInView = Math.min(leftMost + numOfItems - 3, itemsTotal) - 1
      const itemsOutside = itemsTotal - (idLastInView + 1)

      // get difference to travel
      const diff = Math.min(Math.max(targetId - pos2, 0), itemsOutside)
      newLeft = leftMost + diff
    } else {
      // INVERSE
      const last = leftMost + (numOfItems - 4)
      const pen = last - 1
      const itemsOutside = leftMost

      const diff = Math.min(Math.max(pen - targetId, 0), itemsOutside)
      newLeft = leftMost - diff
    }

    // move container to new position
    setLeftMost(newLeft)
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
              }vw`,
              opacity: idx === current ? 1.0 : 0.4
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
