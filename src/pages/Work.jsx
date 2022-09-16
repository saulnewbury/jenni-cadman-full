import React from 'react'
import { collections } from '../data/collections'
import styles from './work.module.scss'
import Layout from '../components/shared/Layout'
import Menu from '../components/shared/menu/Menu'
import { BsArrowDown } from 'react-icons/bs'

const Work = () => {
  return (
    <Layout title="Work">
      {collections.map(cln => {
        const { subFolder, date, desc, featuredImage, id, imagesData, title } =
          cln
        return (
          <div key={id} className={styles.collection}>
            <div className={styles.header}>
              <img
                className={styles.image}
                width="2000"
                height="3008"
                src={`images/${subFolder}/${featuredImage.name}.jpg`}
                alt={featuredImage.altText}
              />
              <div className={styles.titleInfo}>
                <div className={styles.wrapper}>
                  <h4 className={styles.collectionDate}>{date}</h4>
                  <h2 className={styles.collectionTitle}>{title}</h2>
                  <div className={styles.arrowDownContainer}>
                    <BsArrowDown className={styles.arrowDownIcon} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.description + ' indent'}>
              <p>{desc}</p>
            </div>
            {/* Menu */}
            <Menu imagesData={imagesData} />
          </div>
        )
      })}
    </Layout>
  )
}

export default Work
