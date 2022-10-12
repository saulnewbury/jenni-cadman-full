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
  const [menuWidth, setMenuWidth] = useState('100vw')
  // menuWidth is set (in conjunction with numOfItems) by the various
  // media queries. The units (vw or px) communicates the switch between
  // 'fixed' and 'scaled' sizing for image items, and the numeric value
  // gives the required outer container width in those units.

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

  //-------------------------------------------------------------------------
  // mediaQueries
  //    This function is run as a 'componentDidMount' effect - i.e. after the
  // first render. It adds a number of GSAP media query handlers to achieve
  // the following effect by screen/device width:
  //
  //    up to 399 px        3 items visible; menu fills width (100vw)
  //    400 - 741 px        4 - 9 items visible, increasing at 57px steps;
  //                            viewport fills width (100vw)
  //    742 - 1399 px       9 items visible; menu width fixed at 742px
  //   1400 - 1779 px       9 items visible; menu width scales at 53vw
  //   1780 - 2320 px       9 items visible; menu fixed at 943px
  //   2321 & above         9 items visible; menu scales at 44.46vw
  //
  // Those menu widths are calculated to give a 'smooth' transition from
  // the previous sizing:
  //    742px = 100vw at a screen width of 742 px
  //    53vw = 742px at a screen width of 1400 px
  //    943px = 53vw at a screen width of 1780 px and
  //    44.46vw = 943px at a screen width of 2321 px.
  //-------------------------------------------------------------------------

  function mediaQueries() {
    let mm = gsap.matchMedia()

    mm.add(`(min-width: 2321px)`, () => {
      setNumOfItems(9) // 23
      setCurrent(0)
      setLeftMost(0)
      setMenuWidth('40.46vw')
    })

    mm.add(`(min-width: 1780px) and (max-width: 2320px)`, () => {
      setNumOfItems(9) //19
      setCurrent(0)
      setLeftMost(0)
      setMenuWidth('943px')
    })

    mm.add(`(min-width: 1400px) and (max-width: 1779px)`, () => {
      setNumOfItems(9) //19
      setCurrent(0)
      setLeftMost(0)
      setMenuWidth('53vw')
    })

    mm.add(`(min-width: 742px) and (max-width: 1399px)`, () => {
      setNumOfItems(9)
      setCurrent(0)
      setLeftMost(0)
      setMenuWidth('742px')
    })

    for (let index = 7; index <= 12; index++) {
      let min = Math.floor((index * 200) / 3.5), // 400px ... 685px
        max = Math.floor(((index + 1) * 200) / 3.5) - 1 // 456px ... 741px

      mm.add(`(min-width: ${min}px) and (max-width: ${max}px)`, () => {
        setNumOfItems(index - 3)
        setCurrent(0)
        setLeftMost(0)
        setMenuWidth('100vw')
      })
    }

    mm.add(`(max-width: 399px)`, () => {
      setNumOfItems(3) // 6 narrow widths
      setCurrent(0)
      setLeftMost(0)
      setMenuWidth('100vw')
    })

    return () => {
      mm.kill()
    }
  }

  //-------------------------------------------------------------------------
  // setup
  //    Called on each render, to calculate the (possibly new) widths and
  // heights of the menu containers and items. The latter can be either
  // 'narrow' or 'wide' with the proportions given below (4.4 or 20 x 32).
  //-------------------------------------------------------------------------

  function setUp(numOfItems) {
    const result = {}

    // These numbers are arbitrary: it is the proportional ratio between them
    // that defines the menu appearance. Let's call them 'logical scale units'
    const narrow = 4.4
    const wide = 20
    const height = 32

    const units = menuWidth.slice(-2).toLowerCase()
    const basis = parseFloat(menuWidth.slice(0, -2))

    // Calculate the width of the menu in 'logical scale units' - one 'wide'
    // and the rest 'narrow'.
    const total = (numOfItems - 1) * narrow + 1 * wide

    // Set 'x' to a scaling factor that represents 1 'logical scale unit' in
    // the current real width units.
    const x = basis / total

    // Now we can compute the real sizes of menu items and containers:
    result.narrow = `${x * narrow}${units}`
    result.wide = `${x * wide}${units}`
    result.height = `${x * height}${units}`

    // We also want to know the real width of all visible items combined. This
    // number may be less than the _allowed_ number.
    const numVisible = Math.min(numOfItems, images.length - leftMost)
    const visibleWidth = (numVisible - 1) * narrow + wide

    result.linkContainerWidth = `${x * visibleWidth}${units}`

    // Ditto the left offset of the inner container, relative to the outer,
    // which should be (negative) 'leftMost' times the narrow width.

    result.left = `-${leftMost * x * narrow}${units}`

    // Finally, add some padding to every menu item to separate them ever so
    // slightly.

    result.padding = '1px'

    return result
  }

  //-------------------------------------------------------------------------
  // handleClick
  //    Attached to each menu item as a 'click' event handler. Makes the
  // selected item the new 'current', which will trigger (via GSAP animation)
  // width and opacity changes.
  //-------------------------------------------------------------------------

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

  //-------------------------------------------------------------------------
  // containerPosition
  //    Called after changing the 'current' item, to try to scroll it into
  // either the 2nd position [moving forwards from previous current] or the
  // penultimate position [moving backwards] - or as close as we can achieve,
  // given the number of items available, versus the number that can fit in
  // the current scroll-port (outer container).
  //-------------------------------------------------------------------------

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

  //-------------------------------------------------------------------------
  //  Render [JSX]
  //-------------------------------------------------------------------------

  return (
    <div
      ref={outerContainer}
      className="outer-container"
      style={{ height: calcValues.height, width: menuWidth }}
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
