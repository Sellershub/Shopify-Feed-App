import React, { useState } from 'react'
import ImageMarker from 'react-image-marker'
import { useSelector } from 'react-redux'
import { widgetSetupSelector } from '../../../../redux/reducers/widgetSetup'
import { ProductItem } from './ProductItem'
import styles from './styles.module.css'

export const Desktop = () => {
    const [markers, setMarkers] = useState([
        {
          top: 10, 
          left: 50, 
        },
      ])
      const { settings } = useSelector(widgetSetupSelector)
      const { popup, shoppable } = settings
      const {
        profile,
        profileTab,
        folowBtn,
        date,
        instaView,
        instaViewTab,
        folowBtnText,
      } = popup
      const {
        showIcon,
        hotSpotColor,
        hotSpotHover,
        opacity, 
      } = shoppable

      const CustomMarker = () => {

        return (
          <div className={styles.markerContainer}>
            <div className={styles.markerItem}>
              <div className={styles.markerItemFirst} />
              <div className={styles.markerItemSecond} />
              <div
                className={styles.markerItemThird}
                style={{ backgroundColor: hotSpotColor }}
              />
            </div>
            <div
              style={{ backgroundColor: hotSpotHover, opacity: opacity/100 }}
              className={styles.hoverContainer}
            >
              <img
                className={styles.hoverImg}
                src={'https://content.rozetka.com.ua/goods/images/big/30872664.jpg'}
              />
              <div className={styles.hoverInfo}>
                <h4 className={styles.hoverTitle}>ccccc</h4>
                <h4 className={styles.hoverTitle}>150$</h4>
              </div>
            </div>
          </div>
        )
      }



  return (
    <div className={styles.container}>
      <div style={{width: '69%'}}>
        <ImageMarker
          src="https://content.rozetka.com.ua/goods/images/big/30872664.jpg"
          markers={markers}
          markerComponent={CustomMarker}
        />
      </div>
      <div className={styles.accountContainer}>
        <div className={styles.topPart}>
          {profile && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <img
                className={styles.avatar}
                src="https://content.rozetka.com.ua/goods/images/big/30872664.jpg"
              />
              <span className={styles.accName}>Name of account</span>
            </div>
          )}
          {folowBtn && (
            <button className={styles.folowBtnText}>{folowBtnText}</button>
          )}
        </div>
        
        <ProductItem/>
        <div className={styles.footer}>
          {date && <span className={styles.date}>OCTOBER 6, 2019</span>}
          {instaView && (
            <a
              href="/"
              target={instaViewTab[0] === 'new' ? '_blank' : '_parent'}
              className={styles.instaView}
            >
              View on Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
