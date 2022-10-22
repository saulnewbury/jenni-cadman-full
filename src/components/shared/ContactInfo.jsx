import React from 'react'
import './contact-info.scss'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="box-1">
        <form action="">
          <label htmlFor="email">
            Stay informed about upcoming events and exhibitions:
          </label>
          <input type="email" id="email" placeholder="Your Email" />
          <button type="submit">
            <span>Subscribe</span>
            <BsArrowRight className="arrow-right" />
          </button>
        </form>
        <div className="enquiries">
          <a href="mailto:jennicadman@gmail.com">
            <span>Enquiries:</span>
          </a>
          &nbsp; jennicadman@gmail.com
        </div>
      </div>
    </div>
  )
}

// flicker instagram pinterest and linkedin

export default ContactInfo
