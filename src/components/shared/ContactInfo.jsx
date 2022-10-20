import React from 'react'
import './contact-info.scss'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <form action="">
        <label htmlFor="email">
          Stay informed about upcoming events and exhibitions
        </label>
        <input type="email" id="email" placeholder="Your Email" />
        <button type="submit">
          <span>Subscribe</span>
          <BsArrowRight className="arrow-right" />
        </button>
      </form>
      <div className="enquiries">
        <a href="mailto:jennicadman@gmail.com">Enquiries:</a>
        jennicadman@gmail.com
      </div>
      <div className="socials">
        <span>
          <a href="https://www.axisweb.org/p/jennicadman/">Axios</a>
        </span>
        <span>
          <a href="https://www.flickr.com/photos/jencad/">Flicker</a>
        </span>
        <span>
          <a href="https://www.instagram.com/jennicadmanartist/">Instagram</a>
        </span>
        <span>
          <a href="https://www.pinterest.co.uk/jennicadman/">Pinterest</a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/jenni-cadman-74a5269b/">
            LinkedIn
          </a>
        </span>
      </div>
    </div>
  )
}

// flicker instagram pinterest and linkedin

export default ContactInfo
