import React from 'react'
import './footer.scss'
import { BsArrowRight } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2>Contact</h2>
        <div className="one">
          <div className="stay-informed">
            <form>
              <label>
                Stay informed about upcoming events and exhibitions.
              </label>
              <input type="text" placeholder="Your Email" />
              <button>
                <span>Subscribe</span> <BsArrowRight className="arrow-right" />
              </button>
            </form>
          </div>
          <div className="socials">
            <p>
              <a href="https://www.flickr.com/photos/jencad/">Flicker</a>
            </p>
            <p>
              <a href="https://www.instagram.com/jennicadmanartist/">
                Instagram
              </a>
            </p>
            <p>
              <a href="https://www.pinterest.co.uk/jennicadman/">Pinterest</a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/jenni-cadman-74a5269b/">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
        <div className="two">
          <div className="enquiries">
            <a href="mailto:jennicadman@gmail.com">All Enquiries:</a>
            <br />
            jennicadman@gmail.com
          </div>
          <div className="copyright">Jenni Cadman &#169; 2022</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
