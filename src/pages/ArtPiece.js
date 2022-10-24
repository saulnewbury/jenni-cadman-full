import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { collections } from '../data/collections'
// import { AiOutlineArrowLeft } from 'react-icons/ai'
import ImageMenu from '../components/shared/menu/ImageMenu'
import AnimatePage from '../components/shared/AnimatePage'
// import gsap from 'gsap'
import './artpiece.scss'

const ArtPiece = () => {
  const { slug, id } = useParams()

  console.log(id)

  // get collection which includes a title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData?.images.some(obj => obj.imagePath === slug)
  })

  const obj = cln[0].imagesData?.images.filter(obj => obj.imagePath === slug)

  const { subFolder, imagesData } = cln[0]
  const {
    id: artpieceId,
    title,
    imageDetail,
    imageMain,
    altText,
    desc
  } = obj[0]

  return (
    <AnimatePage>
      <div className="art-piece">
        <div className="container">
          <h1 className="title top">{title}</h1>
          <div className="main">
            <div className="image">
              <img
                src={`../images/${subFolder}/${imageMain}.jpg`}
                alt={altText}
              />
            </div>
            <div className="info">
              <div className="wrapper">
                <h1 className="title side">{title}</h1>
                <p className="collection-date">{desc.year}</p>
                <p className="medium">{desc.medium}</p>
                <p className="size">{desc.size}</p>
                {desc.mount && <p className="mount">{desc.mount}</p>}
                <p className="price">{desc.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="detail">
        <div className="container">
          <div className="spacer"></div>
          <div className="wrapper">
            <h4>(Detail)</h4>
            <div className="image">
              <img
                src={`../images/${subFolder}/${imageDetail}.jpg`}
                alt={altText}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="image-menu-container">
        <ImageMenu
          imagesData={imagesData}
          id={artpieceId - 1}
          collectionId={id}
        />
      </div>
    </AnimatePage>
  )
}

export default ArtPiece
