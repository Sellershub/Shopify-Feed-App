import { Icon } from '@shopify/polaris'
import React, { useState } from 'react'
import ImageMarker from 'react-image-marker'
import { ChevronLeftMinor } from '@shopify/polaris-icons'
import { useSelector } from 'react-redux'
import { widgetSetupSelector } from '../../../../redux/reducers/widgetSetup'
import styles from './styles.module.css'
import { ProductItem } from './ProductItem'

export const Mobile = () => {
  const [markers, setMarkers] = useState([
    {
      top: 10, 
      left: 50, 
    },
  ])
  const [isViewProduct, setIsViewProduct] = useState(false)
  const { settings } = useSelector(widgetSetupSelector)
  const { popup, shoppable } = settings
  const {
    profile,
    profileTab,
    folowBtn,
    caption,
    date,
    instaView,
    instaViewTab,
    folowBtnText,
  } = popup;
  const {
    hotSpotColor,
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
      </div>
    )
  }

  return (
    <div className={styles.mobileContainer}>
      {isViewProduct ? (
        <>
        <div className={styles.backContainer} onClick={()=>setIsViewProduct(false)}>
          <Icon source={ChevronLeftMinor} color="base" />
          <h2 className={styles.viewProducts}>View Products</h2>
        </div>
        <ProductItem/>
        </>
      ) : (
        <>
          <div className={styles.topPart}>
            {profile && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <ImageMarker
          src="https://content.rozetka.com.ua/goods/images/big/30872664.jpg"
          markers={markers}
          markerComponent={CustomMarker}
        />
          <div className={styles.accountContainerMobile}>
            <button onClick={()=>setIsViewProduct(true)} className={styles.viewProductsBtn}>View products</button>
            {caption && (
              <p className={styles.caption}>
                In honor of Breast Cancer Awareness Month, adidas by
                @StellaMcCartney introduces its first post-operative sports bra,
                designed to help women who have undergone mastecto surgery to
                bring sport back into their lives. #aSMC{' '}
              </p>
            )}
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
        </>
      )}
    </div>
  )
}
