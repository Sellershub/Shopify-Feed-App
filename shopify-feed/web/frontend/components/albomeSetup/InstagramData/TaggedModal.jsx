import { Icon } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './modal.module.css'
import { ChevronLeftMinor, ChevronRightMinor } from '@shopify/polaris-icons'
import { addTagIcon } from '../../../assets/albums'
import { SearchMinor, ViewMinor, DeleteMinor } from '@shopify/polaris-icons'
import ImageMarker from 'react-image-marker'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTag,
  albumCreationSelector,
  deleteTag,
  getProducts,
} from '../../../redux/reducers/albumCreation'
import { CustomMarker } from './CustomMarker'

export const TaggedModal = ({ activePost, instaData, setActivePost }) => {
  const media = instaData[activePost]
  const dispatch = useDispatch()
  const { products, productsLoader } = useSelector(albumCreationSelector)
  const [isAdding, setIsAdding] = useState(false)

  const [selectedProducts, setSelectedProducts] = useState(media?.productTags)
  const [isPleaseSelected, setIsPleaseSelected] = useState(null)

  const addingHandler = useCallback(() => setIsAdding(true), [])
  const removingHandler = useCallback(() => setIsAdding(false), [])

  const selectProductHandler = useCallback((product) => {
    setSelectedProducts((prev) => [product, ...prev])
    setIsAdding(false)
    setIsPleaseSelected(product)
  }, [])

  const deleteProductHandler = useCallback((id) => {
    dispatch(deleteTag({ postIndex: activePost, tagId: id }))
    setSelectedProducts((prev) => prev.filter((item) => item.id !== id))
  }, [])

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const Product = ({ product, isSelected }) => {
    return (
      <div
        key={product.id}
        className={styles.product}
        onClick={() => !isSelected && selectProductHandler(product)}
      >
        <div>
          <img
            className={styles.productImg}
            src={product?.image?.src}
            alt="product icon"
          />
          <div className={styles.productinfo}>
            <h4 className={styles.productName}>{product?.title}</h4>
            <h4 className={styles.productPrice}>{product?.variants[0]?.price}$</h4>
          </div>
        </div>
        <a href={'/'} target={'_blank'} className={styles.hideIcon}>
          <Icon source={ViewMinor} color="base" />
        </a>
        {isSelected && (
          <span
            onClick={() => deleteProductHandler(product.id)}
            className={styles.hideIcon}
          >
            <Icon source={DeleteMinor} color="base" />
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={styles.content}>
      {activePost !== 0 ? (
        <button
          className={styles.button}
          onClick={() => setActivePost(--activePost)}
        >
          {' '}
          <Icon backdrop={false} source={ChevronLeftMinor} color="primary" />
        </button>
      ) : (
        <div style={{ width: 30 }} />
      )}

      <div className={styles.modalContainer}>
        <div style={{ width: '60%' }}>
          {media.media_type === 'IMAGE' ? (
            // <img className={styles.mediaItem} src={media?.media_url} />
            <ImageMarker
              extraClass={styles.mediaItem}
              src={media?.media_url}
              markers={media?.productTags}
              onAddMarker={(marker) => {
                if (selectedProducts.length > media?.productTags.length) {
                  const markerInfo = { ...marker, ...isPleaseSelected }
                  dispatch(addTag({ postIndex: activePost, tag: markerInfo }))
                  setIsPleaseSelected(null)
                }
              }}
              markerComponent={(itemNumber) => (
                <CustomMarker itemNumber={itemNumber} />
              )}
            />
          ) : (
            <video className={styles.mediaItem} controls>
              <source src={media?.media_url} type="video/mp4" />
            </video>
          )}
        </div>

        <div className={styles.modalAddTagContainer}>
          {isPleaseSelected && (
            <div className={styles.pleaseSelectPlace}>
              Please select place for product tag
            </div>
          )}
          <div className={styles.accInfo}>
            <img
              className={styles.accInfoAvatar}
              src={media?.media_url}
              alt="insta avatar"
            />
            <span className={styles.addTagHeadline}>inst_account</span>
          </div>
          {isAdding ? (
            <div className={styles.selectProductContainer}>
              <div className={styles.selectProductTopPart}>
                <div>
                  <h3 className={styles.selectProductHeadline}>
                    Please select product
                  </h3>
                  <h3
                    className={styles.removeProduct}
                    onClick={removingHandler}
                  >
                    Remove
                  </h3>
                </div>
                <div className={styles.wrapper}>
                  <div className={styles.icon}>
                    <Icon source={SearchMinor} color="base" />
                  </div>
                  <input className={styles.input} placeholder="Search" />
                </div>
              </div>
              <div className={styles.productsContainer}>
                {productsLoader ? (
                  <h3>Loading</h3>
                ) : (
                  products.map((product) => {
                    return <Product key={product.id} product={product} />
                  })
                )}
              </div>
            </div>
          ) : (
            <div className={selectedProducts.length && styles.selectedProducts}>
              {selectedProducts.length > 0 &&
                selectedProducts.map((product) => {
                  return (
                    <Product product={product} key={product?.id} isSelected />
                  )
                })}
              {!isPleaseSelected && (
                <div className={styles.addTagContainer} onClick={addingHandler}>
                  <img
                    className={styles.addTagIcon}
                    src={addTagIcon}
                    alt="addTagIcon"
                  />
                  <h3 className={styles.addTagHeadline}>Add Tag product</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {activePost !== instaData.length - 1 ? (
        <button
          className={styles.button}
          onClick={() => setActivePost(++activePost)}
        >
          {' '}
          <Icon backdrop={false} source={ChevronRightMinor} color="primary" />
        </button>
      ) : (
        <div style={{ width: 30 }} />
      )}
    </div>
  )
}
