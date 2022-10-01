import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { collections } from '../data/collections'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Menu from '../components/shared/menu/Menu'
import AnimatePage from '../components/shared/AnimatePage'
// import gsap from 'gsap'
import './artpiece.scss'

const ArtPiece = () => {
  const { slug } = useParams()

  // filter collection which has title that is the same as slug.
  const cln = collections.filter(cln => {
    return cln.imagesData.images.some(obj => obj.imagePath === slug)
  })

  const obj = cln[0].imagesData.images.filter(obj => obj.imagePath === slug)

  const { subFolder, title: clnTitle, imagesData } = cln[0]
  const { title, imageDetail, imageMain, altText, desc } = obj[0]

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
          {/* <h2>Conversations With My Mother</h2> */}
          <Menu imagesData={imagesData} />
        </div>
      </main>
    </AnimatePage>
  )
}

export default ArtPiece

// const [dimensions, setDimensions] = useState({
//   height: window.innerHeight,
//   width: window.innerWidth
// })

// useEffect(() => {
//   let resizeId
//   function doneResizing() {
//     setDimensions({
//       height: window.innerHeight,
//       width: window.innerWidth
//     })
//   }

//   function resize() {
//     clearTimeout(resizeId)
//     resizeId = setTimeout(doneResizing, 300)
//   }

//   window.addEventListener('resize', resize)

//   return () => {
//     window.addEventListener('resize', resize)
//   }
// }, [])

// if (dimensions.width > dimensions.height) {
//   gsap.to('.container', {
//     marginLeft: '12vw',
//     marginRight: '12vw',
//     duration: 0.2
//   })
// } else {
//   gsap.to('.container', {
//     marginLeft: '-2vh',
//     marginRight: '2vh',
//     duration: 0.2
//   })
// }
