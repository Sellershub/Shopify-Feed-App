import React from 'react'
import { useSelector } from 'react-redux'
import { widgetSetupSelector } from '../../../../redux/reducers/widgetSetup'
import styles from './styles.module.css'

export const ProductItem = () => {
    const { settings } = useSelector(widgetSetupSelector)
      const {shoppable } = settings
      const {
        displayProduct,
        ctaBtnText,
        ctaBtnColor,
        ctaBtnTextColor,
      } = shoppable
  return (
    <div
      style={{
        flexDirection: displayProduct[0],
        width: displayProduct[0] === 'column' ? '150px' : '100%',
      }}
      className={styles.productContainer}
    >
      <img
        style={{ width: displayProduct[0] === 'column' ? '100%' : '100px' }}
        className={styles.productImg}
        src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
        alt="photo"
      />
      <div className={styles.productInfo}>
        <h4 className={styles.producTitle}>Product Name</h4>
        <h3 className={styles.productPrice}>$16.05 - 20.05</h3>
        <button
          style={{ backgroundColor: ctaBtnColor, color: ctaBtnTextColor }}
          className={styles.productBtn}
        >
          {ctaBtnText}
        </button>
      </div>
    </div>
  )
}
