import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { collections } from '../data/collections'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import ImageMenu from '../components/shared/menu/ImageMenu'
import AnimatePage from '../components/shared/AnimatePage'
// import gsap from 'gsap'
import './artpiece.scss'

const ArtPiece = () => {
  const { slug } = useParams()

  // get collection which includes a title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData.images.some(obj => obj.imagePath === slug)
  })

  const obj = cln[0].imagesData.images.filter(obj => obj.imagePath === slug)

  console.log(obj)
  const { subFolder, imagesData } = cln[0]
  const { id, title, imageDetail, imageMain, altText, desc } = obj[0]

  return (
    <AnimatePage>
      <main className="art-piece">
        <div className="container">
          {/* <h2 className="collection-title">{clnTitle}</h2> */}
          <h1 className="art-piece-title">{title}</h1>
          <div className="full-image">
            <img
              src={`../images/${subFolder}/${imageMain}.jpg`}
              alt={altText}
            />
            <div className="image-desc">
              <p className="collection-date">{desc.year}</p>
              <p className="medium">{desc.medium}</p>
              <p className="size">{desc.size}</p>
              {desc.mount && <p className="mount">{desc.mount}</p>}
              <p className="price">{desc.price}</p>
            </div>
          </div>
          <div className="detail-image">
            <div className="wrapper">
              <h4>(Detail)</h4>
              <img
                src={`../images/${subFolder}/${imageDetail}.jpg`}
                alt={altText}
              />
            </div>
          </div>
        </div>
        <div className="art-piece-menu-container">
          <Link className="back-to-work" to="/work">
            <AiOutlineArrowLeft className="icon" />
            <p>Back to WORK</p>
          </Link>
          <ImageMenu imagesData={imagesData} id={id - 1} />
        </div>
      </main>
    </AnimatePage>
  )
}

export default ArtPiece
