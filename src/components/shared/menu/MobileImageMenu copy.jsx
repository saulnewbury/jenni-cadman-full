import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './mobileImageMenu.scss'
import gsap from 'gsap'

const MobileImageMenu = ({ imagesData }) => {
  const { subFolder, images } = imagesData
  console.log('run')
  const outerContainer = useRef()
  const container = useRef()
  const rendered = useRef(false)
  const sizes = useRef()
  const idPos1 = useRef(0)
  const itemsInViewport = useRef()
  const prevTarget = useRef()

  useEffect(() => {
    const itemsArray = container.current.querySelectorAll('.image-item')
    if (!rendered.current) {
      initialState(itemsArray)
    }
    rendered.current = true
    return mediaQueries(itemsArray)
  }, [])

  function initialState(itemsArray) {
    const width = 100 / 14
    setUp(width)
    // container position
    gsap.set(container.current, { left: `${width}vw` })
    // width of selected item
    gsap.set(itemsArray[0], { width: `${width * 4}%` })
    itemsArray[0].dataset.size = 'wide'
  }

  function mediaQueries() {
    let mm = gsap.matchMedia()
    for (let index = 7; index <= 14; index++) {
      // let min = Math.floor((index / 3.5) * 200)
      let min = (index / 3.5) * 200
      console.log(min)

      mm.add(`(min-width: ${min}px)`, () => {
        const numOfItems = index
        const width = 100 / index
        setUp(numOfItems, width)
      })
    }
    mm.add(`(max-width: 399px)`, () => {
      // 6 items
      const numOfItems = 6
      const width = 100 / 6
      setUp(numOfItems, width)
    })

    return () => {
      mm.kill()
    }
  }

  function setUp(numOfItems, width) {
    // reset: map prevTarget to first imageItem in the array
    prevTarget.current = container.current.querySelectorAll('.image-item')[0]

    // reset: map position one to first id
    idPos1.current = 0

    // store the number of items in the viewport
    // (-3 because the wide item is 1 plus an addition 3)
    itemsInViewport.current = numOfItems - 3

    // reset container position
    gsap.set(container.current, { left: 0 })

    // container width
    gsap.set(container.current, { width: `${width * 14}%` })

    // container height
    const value = `${width * 6.5}vw`
    gsap.set('.mobile-image-menu', { height: value })
    gsap.set('.outer-container', { height: value })

    // item padding
    gsap.set('.image-item', {
      paddingLeft: `${width / 50}vw`,
      paddingRight: `${width / 50}vw`
    })

    // set items' widths (wide and narrow)
    sizes.current = { narrow: `${width}`, wide: `${width * 4}` }
    const elements = container.current.querySelectorAll('.image-item')
    elements.forEach((ele, idx) => {
      if (idx === 0) {
        gsap.set(ele, { width: `${sizes.current.wide}vw` })
        ele.dataset.size = 'wide'
      } else {
        gsap.set(ele, { width: `${sizes.current.narrow}vw` })
        ele.dataset.size = 'narrow'
      }
    })
  }

  function handleClick(e) {
    e.preventDefault()
    const target = e.currentTarget
    changeText(target)
    // exit function if clicking on item already selected
    if (prevTarget.current === target) return

    // expand target element (and set to full opacity)
    gsap.to(target, { width: `${sizes.current.wide}vw`, opacity: 1 })

    // shrink previously selected element (and set opacity)
    gsap.to(prevTarget.current, {
      width: `${sizes.current.narrow}vw`
    })

    const elements = container.current.querySelectorAll('.image-item')
    elements.forEach(ele => {
      ele !== target && gsap.to(ele, { opacity: 0.7 })
    })

    // reset data-size attribute
    target.dataset.size = 'wide'
    prevTarget.current.dataset.size = 'narrow'

    // Create flag to determine regular or inverse calculation.
    const isInverse =
      +prevTarget.current.dataset.id < +target.dataset.id ? false : true

    containerPosition(target, isInverse)
    prevTarget.current = target
  }

  function changeText(target) {
    const p = outerContainer.current.firstChild.firstChild
    const titleText = target.getAttribute('data-title')
    p.textContent = titleText
  }

  // POSITIONING
  function containerPosition(target, isInverse) {
    // FORWARD
    if (!isInverse) {
      // get position 2 (offset)
      const pos2 = idPos1.current + 1

      // Work out items not in view
      const idLastInView = idPos1.current + itemsInViewport.current - 1
      const elements = container.current.querySelectorAll('.image-item')
      const itemsTotal = elements.length - 1 // -1 to adjust for starting at zero
      const itemsOutside = itemsTotal - idLastInView

      // get difference to travel
      const diff =
        +target.dataset.id - pos2 < itemsOutside
          ? +target.dataset.id - pos2
          : itemsOutside

      // add difference to existing position
      gsap.to(container.current, {
        left: `-${(diff + idPos1.current) * sizes.current.narrow}vw`
      })

      if (diff === itemsOutside) {
        // when there are no more items outside length minus itemsInView will give the item at first position
        idPos1.current = elements.length - itemsInViewport.current
      } else {
        // update isPos1.current to index of item now at position 1
        idPos1.current = +target.dataset.id - 1
      }
    } else {
      // INVERSE
      const last = idPos1.current + (itemsInViewport.current - 1) // 5 + 5 = 10 (id: 9)
      const pen = last - 1 // 8
      const itemsOutside = last - (itemsInViewport.current - 1) // 9 - 4 = 3
      const diff =
        pen - +target.dataset.id < itemsOutside
          ? pen - +target.dataset.id
          : itemsOutside

      gsap.to(container.current, {
        left: `-${(itemsOutside - diff) * sizes.current.narrow}vw`
      })

      if (diff === itemsOutside) {
        idPos1.current = 0
      } else {
        idPos1.current = idPos1.current - diff
      }
    }
  }

  return (
    <div ref={outerContainer} className="outer-container">
      <div className="mobile-menu-item-title-container">
        <p className="mobile-menu-item-title">{images[0].title}</p>
      </div>
      <div ref={container} className="mobile-image-menu">
        <Link
          to={`/work/${images[0].title.replace(/\s+/g, '-').toLowerCase()}`}
          className="image-item prev"
          ref={prevTarget}
          data-title={images[0].title}
          data-size="wide"
          data-id="0"
          onClick={e => {
            handleClick(e)
          }}
        >
          <img
            className="slice"
            src={`images/${subFolder}/${images[0].imageDetail}.jpg`}
            alt={images[0].alt}
          />
        </Link>
        {images.slice(1).map((image, idx) => (
          <Link
            to={`/work/${image.title.replace(/\s+/g, '-').toLowerCase()}`}
            className="image-item"
            data-title={image.title}
            data-size="narrow"
            data-id={idx + 1}
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
