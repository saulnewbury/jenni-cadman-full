import React from 'react'
import { Link } from 'react-router-dom'
import './bio.scss'

const Bio = () => {
  return (
    <div className="bio">
      <div className="container">
        <h1>Biography</h1>
        <div className="flex-wrapper">
          <div className="wrapper">
            <div className="info">
              <div className="info-wrapper">
                <p>
                  Jenni Cadman is textile artist based in Dorset, UK who creates
                  hangings, panels and artworks using free-machine embroidery.
                  Drawing with the needle she builds layers of threads in broad
                  painterly strokes and bold flowing lines.
                  <br />
                  <br />
                  Jenni has worked as a designer maker since leaving Reigate
                  School of Art & Design in 1980 where she trained in Printed
                  Textiles Design. After 12 years working within the applied
                  arts of glass and decorative paint finishes she returned to
                  the world sof textiles and took up stitching in earnest.
                  <br />
                  <br />
                  At the turn of the millennium she started sketching the coast
                  of Cornwall and it was during this period that her work began
                  to significantly evolve. Drawing, printing and paper collage
                  became a crucial part of her process and she not only found a
                  new way of expressing herself but the key to developing her
                  own style of embroidery.
                  <br />
                  <br />
                  In the following two decades Jenni mainly concentrated on the
                  landscape of Dorset for her inspiration, showing her textile
                  art in solo and group shows within the UK. During this time
                  she taught and lectured in schools, colleges and for branches
                  of the Embroiderers’ Guild.
                  <br />
                  <br />
                  'Conversations With My Mother’, started in 2021, heralds a
                  completely new change of direction in which her Mother has
                  become the subject and focus of new embroideries and
                  monotypes. Through the creative process of making Jenni has
                  discovered a positive way of grieving and the means to become
                  emotionally absorbed in a renewed relationship with her
                  mother.
                </p>
                <div className="view-cv">
                  <Link className="link" to="/cv/">
                    View C.V.
                  </Link>
                </div>
              </div>
            </div>
            <div className="image">
              <img
                src="/images/other/jenni-cadman-textileartist-portrait.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bio
