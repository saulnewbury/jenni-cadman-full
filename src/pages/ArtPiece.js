import React, { useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { collections } from '../data/collections'
import Menu from '../components/shared/menu/Menu'
import AnimatePage from '../components/shared/AnimatePage'
import './artpiece.scss'

const ArtPiece = () => {
  const { pathname } = useLocation()

  const { slug } = useParams()
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 500)
  }, [pathname])

  // filter collection which has title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData.images.some(obj => obj.imagePath === slug)
  })

  const obj = cln[0].imagesData.images.filter(obj => obj.imagePath === slug)

  const { subFolder, title: clnTitle, imagesData } = cln[0]
  const { title, imageDetail, imageMain, altText, desc } = obj[0]

  console.log(`./images/${subFolder}/${imageMain}.jpg`)

  return (
    <AnimatePage>
      <main className="art-piece">
        <h1 className="art-piece-title">{title}</h1>
        <h2 className="collection-title">{clnTitle}</h2>
        <div className="full-image">
          <img src={`../images/${subFolder}/${imageMain}.jpg`} alt={altText} />
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
        <Link to="/work">Back to work</Link>
        <Menu imagesData={imagesData} />
      </main>
    </AnimatePage>
  )
}

export default ArtPiece