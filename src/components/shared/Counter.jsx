import React from 'react'

const Counter = ({ id, length }) => {
  return (
    <p className="counter">
      {id + 1}/{length}
    </p>
  )
}

export default Counter
