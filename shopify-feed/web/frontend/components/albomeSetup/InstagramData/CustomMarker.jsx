import React, { useState } from 'react'
import styles from './modal.module.css'

export const CustomMarker = ({ itemNumber }) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
      <div className={styles.markerContainer}>
        <div
          className={styles.markerItem}
          onMouseOut={() => setIsHovered(false)}
          onMouseOver={() => setIsHovered(true)}
        >
          <div className={styles.markerItemFirst}/>
          <div className={styles.markerItemSecond}/>
          <div className={styles.markerItemThird} style={{backgroundColor: 'green'}}/>
        </div>
        {isHovered && (
          <div
            style={{ backgroundColor: 'black', opacity: 0.9 }}
            className={styles.hoverContainer}
          >
            <img className={styles.hoverImg} src={itemNumber?.image?.src} />
            <div className={styles.hoverInfo}>
              <h4 className={styles.hoverTitle}>{itemNumber.title}</h4>
              <h4 className={styles.hoverTitle}>{itemNumber?.variants[0]?.price}$</h4>
            </div>
          </div>
        )}
      </div>
    )
  }