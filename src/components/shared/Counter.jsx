import React from 'react'

const Counter = ({ id, length }) => {
  return (
    <span>
      {id + 1}/{length}
    </span>
  )
}

export default Counter
