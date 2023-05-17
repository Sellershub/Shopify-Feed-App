import { Image, Checkbox } from '@shopify/polaris'
import React, { useCallback } from 'react'
// @ts-ignore
import classes from '../../../style/albumSetup.module.css'
import { mediaIcon, videoIcon } from '../../../assets/albums'
import { pinIcon } from '../../../assets/albums'
import { pinLight } from '../../../assets/albums'
import Switch from 'react-switch'
import { editInstaPost } from '../../../redux/reducers/albumCreation'
import { useDispatch } from 'react-redux'

export const InstagramData = ({ media, selected = 0, setActivePost, index }) => {
  const dispatch = useDispatch()

  const handleChange = useCallback(() => setActivePost(index), [index])
  return (
    <div key={media?.media_url} className={classes.second_block}>
      {media.media_type === 'IMAGE' ? (
        <>
          {selected === 0 ? (
            <img src={media?.media_url} className={classes.image} />
          ) : (
            <img
              
              src={media?.media_url}
              className={classes.widgetImage}
            />
          )}
        </>
      ) : (
        <video className={classes.image} controls>
          <source src={media?.media_url} type="video/mp4" />
        </video>
      )}

      <div className={classes.innerContainer}>
        <div className={classes.topPart}>
          <>
            <Checkbox
              name="success"
              onChange={() =>
                dispatch(editInstaPost({ id: media.id, type: 'checkbox' }))
              }
              checked={media.selected}
            />
            <div
              style={{
                width: '20px',
              }}
            >
              <Image
                onClick={() =>
                  dispatch(editInstaPost({ id: media.id, type: 'pin' }))
                }
                color="#fff"
                style={{ width: '20px', cursor: 'pointer' }}
                source={media.pinned ? pinIcon : pinLight}
                alt={''}
              />
            </div>
          </>
        </div>
        <button className={classes.tagBtn} onClick={handleChange}>
          Tag Product
        </button>
        <div className={classes.topPart}>
          <span className={classes.showInfo}>Show</span>
          <Switch
            offHandleColor="#BABFC3"
            onHandleColor="#008060"
            offColor="#fff"
            onColor="#fff"
            width={36}
            height={20}
            onChange={() =>
              dispatch(editInstaPost({ id: media.id, type: 'switch' }))
            }
            checked={media.isShown}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>
      </div>
      <div className={classes.absoluteIcon}>
        {media.media_type === 'IMAGE' ? (
          <Image source={mediaIcon} alt={''} />
        ) : (
          <Image source={videoIcon} alt={''} />
        )}
      </div>
    </div>
  )
}
