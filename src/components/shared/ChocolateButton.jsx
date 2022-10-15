import React from 'react'
import './chocolate-forward.scss'

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const ChocolateMenu = ({ handleClick, navIsOpen }) => {
  return (
    <div className="chocolate">
      {arr.map((ele, idx) => {
        return (
          <div
            key={idx}
            className={`b${idx + ' block'}${
              navIsOpen ? ' navOpen' : ' navClose'
            }`}
            onClick={e => {
              handleClick(e)
            }}
          >
            <div className="color"></div>
          </div>
        )
      })}
    </div>
  )
}

export default ChocolateMenu
