import React, { useEffect, useRef } from 'react'
import './mobileImageMenu.scss'
import gsap from 'gsap'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const MobileImageMenu = () => {
  const container = useRef()
  const rendered = useRef(false)
  const sizes = useRef()
  const idPos1 = useRef(0)
  const itemsInViewport = useRef()
  const prevTarget = useRef()

  useEffect(() => {
    const arr = container.current.querySelectorAll('.image-item')
    if (!rendered.current) {
      initialState(arr)
    }
    rendered.current = true
    mediaQueries(arr)
  }, [])

  function initialState(arr) {
    const width = 100 / 14
    setUp(width)
    // container position
    gsap.set(container.current, { left: `${width}vw` })
    // width of selected item
    gsap.set(arr[0], { width: `${width * 4}%` })
    arr[0].dataset.size = 'wide'
  }

  function mediaQueries() {
    let mm = gsap.matchMedia()

    mm.add('(min-width: 1200px)', () => {
      // 14 items
      const numOfItems = 14
      const width = 100 / 14
      setUp(numOfItems, width)
    })
    mm.add('(min-width: 1100px) and (max-width: 1199px)', () => {
      // 14 items
      const numOfItems = 13
      const width = 100 / 13
      setUp(numOfItems, width)
    })
    mm.add('(min-width: 1000px) and (max-width: 1099px)', () => {
      // 12 items
      const numOfItems = 12
      const width = 100 / 12
      setUp(numOfItems, width)
    })
    mm.add('(min-width: 900px) and (max-width: 999px)', () => {
      // 10 items
      const numOfItems = 10
      const width = 100 / 10
      setUp(numOfItems, width)
    })
    mm.add('(min-width: 500px) and (max-width: 699px)', () => {
      // 8 items
      const numOfItems = 8
      const width = 100 / 8
      setUp(numOfItems, width)
    })
    mm.add('(min-width: 200px) and (max-width: 499px)', () => {
      // 6 items
      const numOfItems = 6
      const width = 100 / 6
      setUp(numOfItems, width)
    })
    mm.add('(max-width: 199px)', () => {
      // 4 items
      const numOfItems = 4
      const width = 100 / 4
      setUp(numOfItems, width)
    })

    return () => {
      mm.kill()
    }
  }

  function setUp(numOfItems, width) {
    // reset: map prevTarget to first image item in the array
    prevTarget.current = container.current.querySelectorAll('.image-item')[0]

    // reset: map position one to first id
    idPos1.current = 0

    // store the number of items in the viewport
    itemsInViewport.current = numOfItems - 3

    // reset container position
    gsap.set(container.current, { left: 0 })

    // container width
    gsap.set(container.current, { width: `${width * 14}%` })

    // container height
    const value = `${width * 6}vw`
    gsap.set('.mobile-image-menu', { height: value })
    gsap.set('.outer-container', { height: value })

    // item padding
    gsap.set('.image-item', {
      paddingLeft: `${width / 80}vw`,
      paddingRight: `${width / 80}vw`
    })

    // set items' widths; wide and narrow
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

  function handleClick(target) {
    console.log(prevTarget.current)
    // exit function if clicking on item already selected
    if (prevTarget.current === target) return

    // expand target element
    gsap.to(target, { width: `${sizes.current.wide}vw` })

    // shrink previously selected element
    gsap.to(prevTarget.current, { width: `${sizes.current.narrow}vw` })

    // reset data-size attribute
    target.dataset.size = 'wide'
    prevTarget.current.dataset.size = 'narrow'

    // Create flag to deterning regular or inverse calculation.
    const isInverse =
      +prevTarget.current.dataset.id < +target.dataset.id ? false : true

    containerPosition(target, isInverse)
    prevTarget.current = target
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
    <div className="outer-container">
      <div ref={container} className="mobile-image-menu">
        <div
          className="image-item prev"
          ref={prevTarget}
          data-size="wide"
          data-id="0"
          onClick={e => {
            handleClick(e.currentTarget)
          }}
        >
          <div className="placeholder-image">
            <p className="num">0</p>
          </div>
        </div>
        {arr.slice(1).map((ele, idx) => (
          <div
            className="image-item"
            data-size="narrow"
            data-id={idx + 1}
            onClick={e => {
              handleClick(e.currentTarget)
            }}
            key={idx}
          >
            <div className="placeholder-image">
              <p className="num">{idx + 1}</p>
            </div>
          </div>
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
