import React from 'react'
import { collections } from '../data/collections'
import './collection.scss'
import ImageMenu from '../components/shared/menu/ImageMenu'
import CollectionMenu from '../components/shared/CollectionMenu'
import AnimatePage from '../components/shared/AnimatePage'
import { useParams } from 'react-router-dom'

const Collection = () => {
  const { id } = useParams()
  const { subFolder, date, desc, featuredImage, imagesData, title } =
    collections[id - 1]

  console.log(collections[id - 1])

  return (
    <AnimatePage>
      <div className="page-wrapper">
        <div>
          <div className="collection">
            <div className="header">
              <CollectionMenu />
              <div className="image-container">
                <img
                  width="2000"
                  height="3008"
                  src={`images/${subFolder}/${featuredImage.name}.jpg`}
                  alt={featuredImage.altText}
                />
              </div>
              <div className="title-info">
                <div className="wrapper">
                  <h4 className="date">{date}</h4>
                  <h2 className="title">{title}</h2>
                  <div className="description">
                    {desc.map((p, idx) => {
                      return <p key={idx}>{p}</p>
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Menu */}
          <ImageMenu imagesData={imagesData} collectionId={id} />
        </div>
      </div>
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
