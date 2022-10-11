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
  const [scaleType, setScaleType] = useState('a')
  // ScaleType communicates the switch between three conditions
  // 'a' vw units with viewport width of 100vw
  // 'b' fixed px units with viewport width that's also in px units
  // 'c' vw units with viewport width in vw units but less than 100 vw

  const outerContainer = useRef()
  const container = useRef()
  const lastCurrent = useRef(current)
  const lastLeft = useRef(leftMost)
  const windowWidth = useRef(0)

  const calcValues = setUp(numOfItems)

  useEffect(mediaQueries, [])

  // Run animations on change of 'current'. Do this as a 'layout' effect so that
  // users don't see a flash of the target state (set by React render).
  useLayoutEffect(() => {
    if (current !== lastCurrent.current) {
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

    mm.add(`(min-width: 2121px)`, () => {
      setNumOfItems(9) // 23
      setCurrent(0)
      setLeftMost(0)
      setScaleType('c')
    })

    mm.add(`(min-width: 1780px) and (max-width: 2120px)`, () => {
      setNumOfItems(9) //19
      setCurrent(0)
      setLeftMost(0)
      setScaleType('b')
      windowWidth.current = 1780
    })

    mm.add(`(min-width: 1400px) and (max-width: 1779px)`, () => {
      setNumOfItems(9) //19
      setCurrent(0)
      setLeftMost(0)
      setScaleType('c')
      windowWidth.current = 1400
    })

    mm.add(`(min-width: ${(13 / 3.5) * 200}px) and (max-width: 1399px)`, () => {
      setNumOfItems(9)
      setCurrent(0)
      setLeftMost(0)
      setScaleType('b')
      windowWidth.current = (13 / 3.5) * 200
    })

    for (let index = 7; index <= 12; index++) {
      let min = (index / 3.5) * 200,
        max = ((index + 1) / 3.5) * 200 - 1

      mm.add(`(min-width: ${min}px) and (max-width: ${max}px)`, () => {
        console.log('MQ', index)
        setNumOfItems(index - 3)
        setCurrent(0)
        setLeftMost(0)
        setScaleType('a')
      })
    }
    mm.add(`(max-width: 399px)`, () => {
      console.log('MQ', 3)
      setNumOfItems(3) // 6 narrow widths
      setCurrent(0)
      setLeftMost(0)
      setScaleType('a')
    })

    return () => {
      mm.kill()
    }
  }

  // viewport for images should be no more than 9 items
  function setUp(numOfItems) {
    const result = {}

    const narrow = 4.4
    const wide = 20
    const height = 32

    const total = (numOfItems - 1) * narrow + 1 * wide
    const x = 100 / total

    // narrow and wide items combined
    const n = Math.min(numOfItems, images.length - leftMost)
    const width = (n - 1) * narrow + wide
    const pixWidth = (x * windowWidth.current) / 100

    if (scaleType === 'a') {
      result.width = `${width * x}vw`
      result.height = `${x * height}vw`
      result.padding = `${x / 13}vw`

      console.log(leftMost)
      result.left = `-${leftMost}vw`

      // set each item's widths (wide and narrow)
      result.narrow = `${x * narrow}vw`
      result.wide = `${x * wide}vw`

      // set width of button container
      result.linkContainerWidth = `${width * x}vw`
    } else if (scaleType === 'b') {
      result.width = `${total * pixWidth}px`
      result.height = `${pixWidth * height}px`
      result.padding = `${pixWidth / 15}px`
      result.left = `-${leftMost * pixWidth}px`

      // set each item's widths (wide and narrow)
      result.narrow = `${pixWidth * narrow}px`
      result.wide = `${pixWidth * wide}px`

      // set width of button container
      result.linkContainerWidth = `${width * pixWidth}px`
    } else if (scaleType === 'c') {
      // view width is less than 100vw
      const viewportWidth = (742.857 / windowWidth.current) * 100
      const newRange = (windowWidth.current / viewportWidth) * 100
      console.log(scaleType)
      result.width = `${(742.857 / newRange) * 100 * x}vw`
      result.height = `${(430.642 / newRange) * 100 * x}vw`
      result.padding = `${(0.89717 / newRange) * 100 * x}vw`

      result.left = `-${leftMost}vw`

      // set each item's widths (wide and narrow)
      result.narrow = `${(59 / newRange) * 100 * x}vw`
      result.wide = `${(269 / newRange) * 100 * x}vw`

      const px = ((x * wide) / windowWidth.current) * 100

      // set width of button container
      result.linkContainerWidth = `${(px / newRange) * 100 * x}vw`
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
      const idLastInView = Math.min(leftMost + numOfItems, itemsTotal) - 1
      const itemsOutside = itemsTotal - (idLastInView + 1)

      // get difference to travel
      const diff = Math.min(Math.max(targetId - pos2, 0), itemsOutside)
      newLeft = leftMost + diff
    } else {
      // INVERSE
      const last = leftMost + numOfItems - 1
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
      style={{ height: calcValues.height, width: calcValues.width }}
    >
      <div className="mobile-menu-item-title-container">
        <p className="mobile-menu-item-title">{images[current].title}</p>
      </div>
      <div
        className="artpiece-link-container"
        style={{ width: calcValues.linkContainerWidth }}
      >
        <Link
          to={`/work/${images[current].title
            .replace(/\s+/g, '-')
            .toLowerCase()}`}
          className="artpiece-link"
        >
          <BsArrowUpRight className="arrow" />
        </Link>
      </div>
      <div
        ref={container}
        className="mobile-image-menu"
        style={{
          left: calcValues.left,
          height: calcValues.height
        }}
      >
        {images.map((image, idx) => (
          <div
            className="image-item"
            style={{
              paddingLeft: calcValues.padding,
              paddingRight: calcValues.padding,
              height: calcValues.height,
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

// console.log(`scaleType: ${scaleType}, numOfItems: ${numOfItems}`)
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
