import React, { useEffect, useRef } from 'react'
import './mobileImageMenu.scss'
import gsap from 'gsap'

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const MobileImageMenu = () => {
  const container = useRef()
  const rendered = useRef(false)
  const sizes = useRef()
  const prevTarget = useRef(1)

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
    setDimensions(width)
    // container position
    gsap.set(container.current, { left: `${width}vw` })
    // width of selected item
    gsap.set(arr[0], { width: `${width * 4}%` })
    arr[0].dataset.size = 'wide'
  }

  function mediaQueries(arr) {
    let mm = gsap.matchMedia()

    mm.add('(min-width: 1200px)', () => {
      const width = 100 / 14
      setDimensions(width)
    })

    mm.add('(min-width: 900px) and (max-width: 1199px)', () => {
      const width = 100 / 12
      setDimensions(width)
    })
    mm.add('(min-width: 700px) and (max-width: 899px)', () => {
      const width = 100 / 10
      setDimensions(width)
    })
    mm.add('(min-width: 500px) and (max-width: 699px)', () => {
      const width = 100 / 8
      setDimensions(width)
    })
    mm.add('(min-width: 200px) and (max-width: 499px)', () => {
      const width = 100 / 6
      setDimensions(width)
    })
    mm.add('(max-width: 199px)', () => {
      const width = 100 / 4
      setDimensions(width)
    })

    return () => {
      mm.kill()
    }
  }

  function setDimensions(width) {
    // container width
    gsap.set(container.current, { width: `${width * 14}%` })
    // container height
    const value = `${width * 5}vw`
    gsap.set('.mobile-image-menu', { height: value })
    gsap.set('.outer-container', { height: value })
    // container position
    gsap.set(container.current, { left: `${width}vw` })
    gsap.set(container.current, { left: 0 })
    // item padding
    gsap.set('.image-item', {
      paddingLeft: `${width / 80}vw`,
      paddingRight: `${width / 80}vw`
    })
    sizes.current = { narrow: `${width}`, wide: `${width * 4}` }
    const elements = container.current.querySelectorAll('.image-item')
    elements.forEach(ele => {
      if (ele.dataset.size === 'narrow') {
        gsap.set(ele, { width: `${sizes.current.narrow}vw` })
      } else {
        gsap.set(ele, { width: `${sizes.current.wide}vw` })
      }
    })
  }

  function handleClick(target) {
    // change sizes
    if (prevTarget.current === target) return
    gsap.to(target, { width: `${sizes.current.wide}vw` })
    gsap.to(prevTarget.current, { width: `${sizes.current.narrow}vw` })
    target.dataset.size = 'wide'
    prevTarget.current.dataset.size = 'narrow'
    // console.log(prevTarget.current.dataset.id)
    let isInverse
    if (+prevTarget.current.dataset.id < +target.dataset.id) {
      isInverse = false
    } else {
      isInverse = true
    }
    containerPosition(target, isInverse)
    prevTarget.current = target
  }

  function containerPosition(target, isInverse) {
    let base
    let signum
    if (!isInverse) {
      base = +target.dataset.id
      signum = '-'
    } else {
      base = 10 - +target.dataset.id
      signum = ''
    }

    // check if there are items outside of the viewport
    const elements = container.current.querySelectorAll('.image-item')
    let itemsOutside = 0
    elements.forEach(ele => {
      const rect = ele.getBoundingClientRect()
      if (!isInverse && rect.right > window.innerWidth) {
        itemsOutside += 1
      } else if (isInverse && rect.left < 0) {
        itemsOutside += 1
      }
    })

    const amountToMove = () => {
      if (base === 1) {
        return 0
      } else {
        return base * sizes.current.narrow - sizes.current.narrow * 2
      }
    }

    // combined width of items outside
    const combinedWidth = itemsOutside * sizes.current.narrow

    console.log(`ID: ${base}`)
    console.log(`mv: ${amountToMove()}`)
    console.log(`extItems: ${itemsOutside}. cw: ${combinedWidth}.`)

    if (combinedWidth === 0) {
      console.log('do nothing')
    } else if (combinedWidth < amountToMove()) {
      console.log('add combined width to existing position value')
      const position = gsap.getProperty(container.current, 'left', '%')
      const value = +position.toString().slice(1, -1)
      gsap.to(container.current, {
        left: `${signum}${value + combinedWidth}%`
      })
    } else {
      gsap.to(container.current, {
        left: `${signum}${amountToMove()}%`
      })
    }
  }

  //  signum === '-' ? console.log('regular') : console.log('inverse')

  // Calculate amountToMove

  // if element id is equal to 0:
  // 1. pos 0

  // else: (id * narrow-width) - (2 * narrow-width)
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

  return (
    <div className="outer-container">
      <div ref={container} className="mobile-image-menu">
        <div
          className="image-item prev"
          ref={prevTarget}
          data-size="wide"
          data-id="1"
          onClick={e => {
            handleClick(e.currentTarget)
          }}
        >
          <div className="placeholder-image"></div>
        </div>
        {arr.slice(1).map((ele, idx) => (
          <div
            className="image-item"
            data-size="narrow"
            data-id={idx + 2}
            onClick={e => {
              handleClick(e.currentTarget)
            }}
            key={idx}
          >
            <div className="placeholder-image"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileImageMenu
