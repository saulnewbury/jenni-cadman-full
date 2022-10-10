import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './mobileImageMenu.scss'
import gsap from 'gsap'
import { BsArrowUpRight } from 'react-icons/bs'

const MobileImageMenu = ({ imagesData }) => {
  const { subFolder, images } = imagesData

  const [numOfItems, setNumOfItems] = useState(1)
  const [current, setCurrent] = useState(0)
  const [leftMost, setLeftMost] = useState(0)
  const [isFixed, setIsFixed] = useState(false)

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
      console.log(lastCurrent.current)
      const prevTarget = container.current.children[lastCurrent.current]
      const newTarget = container.current.children[current]
      const n = gsap.utils.selector(newTarget)
      const p = gsap.utils.selector(prevTarget)

      gsap.fromTo(
        prevTarget,
        { width: `${calcValues.wide}` },
        { width: `${calcValues.narrow}` }
      )
      gsap.fromTo(p('img'), { opacity: 1.0 }, { opacity: 0.7 })
      gsap.fromTo(
        p('.overlay-container'),
        { width: `${calcValues.wide}` },
        { width: `${calcValues.narrow}` }
      )
      gsap.fromTo(
        newTarget,
        { width: `${calcValues.narrow}` },
        { width: `${calcValues.wide}` }
      )
      gsap.fromTo(n('img'), { opacity: 0.7 }, { opacity: 1.0 })
      gsap.fromTo(
        n('.overlay-container'),
        { width: `${calcValues.narrow}` },
        { width: `${calcValues.wide}` }
      )
      lastCurrent.current = current
    }
  })

  // Animate the change in container position when the leftmost item changes.
  useLayoutEffect(() => {
    if (leftMost !== lastLeft.current) {
      const value = calcValues.narrow.slice(0, -2) //  assuming units are two characters
      const units = calcValues.narrow.slice(-2)
      gsap.fromTo(
        container.current,
        { left: `-${lastLeft.current * value}${units}` },
        { left: `-${leftMost * value}${units}` }
      )
      lastLeft.current = leftMost
    }
  })

  function mediaQueries() {
    let mm = gsap.matchMedia()

    mm.add(`(min-width: 1400px)`, () => {
      setNumOfItems(27)
      setCurrent(0)
      setLeftMost(0)
      setIsFixed(false)
    })

    mm.add(`(min-width: ${(16 / 3.5) * 200}px) and (max-width: 1399px)`, () => {
      setNumOfItems(15)
      setCurrent(0)
      setLeftMost(0)
      setIsFixed(true)
    })

    for (let index = 7; index <= 15; index++) {
      let min = (index / 3.5) * 200,
        max = ((index + 1) / 3.5) * 200 - 1

      mm.add(`(min-width: ${min}px) and (max-width: ${max}px)`, () => {
        console.log('MQ', index)
        setNumOfItems(index)
        setCurrent(0)
        setLeftMost(0)
        setIsFixed(false)
      })
    }
    mm.add(`(max-width: 399px)`, () => {
      console.log('MQ', 6)
      setNumOfItems(6) // 6 narrow widths
      setCurrent(0)
      setLeftMost(0)
      setIsFixed(false)
    })

    return () => {
      mm.kill()
    }
  }

  function setUp(numOfItems) {
    const result = {}

    const width = 100 / numOfItems

    // btn position
    // images.length + 3 * narrow width
    // if viewable items is less than images.length then viewable items else images .length + 3

    if (isFixed) {
      // outer container width
      // Num of items * pixWidth (px)

      const pixWidth = (width * 914.2857142857142) / 100
      result.container = {
        width: `${numOfItems * pixWidth}%`,
        height: `${pixWidth * 6.5}px`
      }
      result.padding = `${pixWidth / 50}px`

      result.left = `-${leftMost * pixWidth}px`

      // set each item's widths (wide and narrow)
      result.narrow = `${pixWidth}px`
      result.wide = `${pixWidth * 4}px`
    } else {
      // reset container position to 0, width to 14 one-hundredths, and height

      // outer container width
      // fixed 100vw

      result.container = {
        width: `${width * 14}%`,
        height: `${width * 6.5}vw`
      }
      result.padding = `${width / 50}vw`

      result.left = `-${leftMost * width}vw`

      // set each item's widths (wide and narrow)
      result.narrow = `${width}vw`
      result.wide = `${width * 4}vw`
    }
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
      style={{ height: calcValues.container.height }}
    >
      <div className="mobile-menu-item-title-container">
        <p className="mobile-menu-item-title">{images[current].title}</p>
      </div>
      <Link
        to={`/work/${images[current].title.replace(/\s+/g, '-').toLowerCase()}`}
        className="view-artpiece-button"
      >
        <BsArrowUpRight className="arrow" />
      </Link>
      <div
        ref={container}
        className="mobile-image-menu"
        style={{
          left: calcValues.left,
          height: calcValues.container.height
        }}
      >
        {images.map((image, idx) => (
          <div
            className="image-item"
            style={{
              paddingLeft: calcValues.padding,
              paddingRight: calcValues.padding,
              height: calcValues.container.height,
              width: `${idx === current ? calcValues.wide : calcValues.narrow}`
            }}
            data-title={image.title}
            data-size={idx === current ? 'wide' : 'narrow'}
            data-id={idx}
            onClick={e => {
              handleClick(e)
            }}
            key={idx}
          >
            <div
              className="overlay-container"
              style={{
                paddingLeft: calcValues.padding,
                paddingRight: calcValues.padding,
                width: idx === current ? calcValues.wide : calcValues.narrow
              }}
            >
              <div className="overlay"></div>
            </div>
            <img
              src={`/images/${subFolder}/${image.imageDetail}.jpg`}
              alt={image.alt}
              style={{
                opacity: idx === current ? 1.0 : 0.7
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileImageMenu

// console.log(`isFixed: ${isFixed}, numOfItems: ${numOfItems}`)
//       // vw / viewport total width x 100 (wv is width * 14)
// result.container = {
//   width: `${width * 14}%`,
//   height: `${((width * 6.5) / 931) * 100}px`
// }
// result.padding = `${((width * 50) / 931) * 100}px`

// result.left = `-${((leftMost * width) / 931) * 100}px`

// // set each item's widths (wide and narrow)
// result.narrow = `${(width / 931) * 100}px`
// result.wide = `${((width * 4) / 931) * 100}px`
