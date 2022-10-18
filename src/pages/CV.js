import React from 'react'
import './cv.scss'
import { resumeEntries } from '../data/resume'

const CV = () => {
  return (
    <div className="cv">
      <div className="wrapper">
        {resumeEntries.map((obj, idx) => {
          return (
            <div key={idx.toString()}>
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
