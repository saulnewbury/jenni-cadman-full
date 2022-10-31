import React from 'react'
import './cv.scss'
import { resumeEntries } from '../data/resume'

const CV = () => {
  return (
    <div className="cv">
      <div className="wrapper">
        <h1>C.V.</h1>
        {resumeEntries.map((obj, idx) => {
          return (
            <div
              key={idx.toString()}
              className={`category ${idx % 2 === 0 ? '' : 'fill'}`}
            >
              <h2>{obj.title}</h2>
              <ul>
                {obj.entries.map((entry, idx) => {
                  return (
                    <li key={idx.toString()}>
                      {entry.date}
                      <span> &nbsp;{entry.info}</span> {entry.location}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CV
