import React from 'react'
import { collections } from '../data/collections'
import './collection.scss'
import ImageMenu from '../components/shared/menu/ImageMenu'
import AnimatePage from '../components/shared/AnimatePage'
import { useParams } from 'react-router-dom'
import { AiOutlineArrowDown } from 'react-icons/ai'

const Collection = () => {
  const { id } = useParams()
  const { subFolder, desc, featuredImage, imagesData, title } =
    collections[id - 1]

  return (
    <AnimatePage>
      <div className="collection">
        <div className="container">
          <div className="image">
            <img
              width="2000"
              height="3008"
              src={`images/${subFolder}/${featuredImage.name}.jpg`}
              alt={featuredImage.altText}
            />
          </div>
          <div className="info">
            <div className="wrapper">
              <h2 className="title">{title}</h2>
              <div className="description">
                {desc.map((p, idx) => {
                  return <p key={idx}>{p}</p>
                })}
              </div>
            </div>
            <div className="scroll-prompt">
              <div className="wrapper">
                <span>SCROLL</span>
                <AiOutlineArrowDown className="arrow-down" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Menu */}
      <ImageMenu imagesData={imagesData} collectionId={id} />
    </AnimatePage>
  )
}

export default Collection

// Use following if for conditional rendering of image menus - hoverable vs touch
// const [isHoverDevice, setIsHoverDevice] = useState(false)

//   useEffect(() => {
//     let mm = gsap.matchMedia()

//     mm.add('(hover: hover)', () => {
//       setIsHoverDevice(true)
//     })

//     return () => {
//       mm.kill()
//     }
//   }, [])
