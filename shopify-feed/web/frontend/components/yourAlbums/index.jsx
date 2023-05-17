import { ActionList, Frame, Icon, Loading, Modal, Popover } from '@shopify/polaris'
import React, { useCallback, useState, useEffect } from 'react'
import { createAlbum, deleteIcon } from '../../assets/albums'
import { MobileVerticalDotsMajor, EditMinor } from '@shopify/polaris-icons'
import styles from './styles.module.css'
import { instagramIcon } from '../../assets/ConnectAccount'
import { useDispatch, useSelector } from 'react-redux'

import {
  getAllAlbums,
  albumsSelector,
  deleteAlbum,
  cancelDeleting,
  approveDeleteAlbum,
  selectAlbum,
} from '../../redux/reducers/albums'
import { useNavigate } from '@shopify/app-bridge-react'
import { CreateAlbum } from './createAlbum/CreateAlbum'

export const YourAlbums = () => {
  const [addAlbum, setAddAlbum] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [isEditing, setIsEditing] = useState('add')
  const userId = localStorage.getItem('userId')
  const { albums, loader, deleteError, selectedAlbumId } = useSelector(
    albumsSelector,
  )
  const dispatch = useDispatch()
  const navigation = useNavigate()
  useEffect(() => {
    dispatch(getAllAlbums(userId))
  }, [addAlbum])
  const handleNavigate = () => {
    setIsEditing('add')
    setAddAlbum(true)
  }
  const approveHandler = () => {
    dispatch(approveDeleteAlbum({ albumId: selectedAlbumId, userId }))
  }
  const cancelHandler = useCallback(() => dispatch(cancelDeleting()), [])

  const AlbumItem = ({ album, setAddAlbum, setIsEditing }) => {
    const { albumId, totalAmount, image, video } = album
    const [popoverActive, setPopoverActive] = useState(false)
    const togglePopoverActive = () => {
      setPopoverActive((prev) => !prev)
    }
    const actionsHandler = useCallback((val) => {
      setPopoverActive(false)
    }, [])
    const activator = (
      <div className={styles.selectDropdownIcon} onClick={togglePopoverActive}>
        <Icon source={MobileVerticalDotsMajor} color="base" />
      </div>
    )

    const editAlbum = () => {
      setSelectedAlbum(albumId)
      setIsEditing()
      setAddAlbum()
    }
    const deleteAlbumHandler = () => {
      setSelectedAlbum(albumId)
      dispatch(selectAlbum(albumId))
      dispatch(deleteAlbum({ userId, albumId }))
    }
    const popupItems = [
      {
        onAction: editAlbum,
        suffix: (
          <div className={styles.edit}>
            <Icon source={EditMinor} color="base" />
            <b>Edit</b>
          </div>
        ),
      },
      {
        onAction: deleteAlbumHandler,
        suffix: (
          <div className={styles.delete}>
            <img src={deleteIcon} alt="deleteIcon" />
            <b>Delete</b>
          </div>
        ),
      },
    ]

    return (
      <div className={styles.item}>
        <div>
          <div className={styles.nameAlbumContainer}>
            <h2 className={styles.itemHeadline}>{album.albumName}</h2>
            <Popover
              active={popoverActive}
              activator={activator}
              autofocusTarget="none"
              onClose={togglePopoverActive}
            >
              <ActionList
                onActionAnyItem={actionsHandler}
                actionRole="menuitem"
                items={popupItems}
              />
            </Popover>
          </div>
          <div className={styles.instagramAccountContainer}>
            <img width={20} src={instagramIcon} alt="instagramIcon" />
            <span className={styles.instagramAccountText}>
              @instagram_account
            </span>
          </div>
        </div>

        <div className={styles.statistics}>
          <div>
            <span className={styles.albumInfoText}>Total items</span>
            <span className={styles.albumInfoText}>{totalAmount}</span>
          </div>
          <div>
            <span className={styles.albumInfoText}>Images</span>
            <span className={styles.albumInfoText}>{image}</span>
          </div>
          <div>
            <span className={styles.albumInfoText}>Video</span>
            <span className={styles.albumInfoText}>{video}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {addAlbum ? (
        <CreateAlbum
          selectedAlbum={selectedAlbum}
          isEditing={isEditing}
          goBack={() => setAddAlbum(false)}
        />
      ) : (
        <div>
          {loader ? (
            <Frame>
              <Loading />
            </Frame>
          ) : (
            <>
              <h2 className={styles.headline}>Your Albums</h2>
              <div className={styles.itemsContainer}>
                <div
                  onClick={handleNavigate}
                  style={{ cursor: 'pointer' }}
                  className={styles.item}
                >
                  <img src={createAlbum} alt="createAlbum" />
                  <h2 className={styles.itemHeadline}>Add New Album</h2>
                </div>
                {albums.map((album) => {
                  return (
                    <AlbumItem
                      setIsEditing={() => setIsEditing('edit')}
                      setAddAlbum={() => setAddAlbum(true)}
                      key={album.albumId}
                      album={album}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
      <Modal
        open={deleteError}
        onClose={cancelHandler}
        title="This album is used for widget"
        primaryAction={{
          content: 'Remove',
          onAction: approveHandler,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: cancelHandler,
          },
        ]}
      ></Modal>
    </div>
  )
}
