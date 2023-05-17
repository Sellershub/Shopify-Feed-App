import { ActionList, Frame, Icon, Loading, Popover } from '@shopify/polaris'
import React, { useCallback, useState, useEffect } from 'react'
import { deleteIcon } from '../../assets/albums'
import { MobileVerticalDotsMajor, EditMinor } from '@shopify/polaris-icons'
import styles from './styles.module.css'
import { instagramIcon } from '../../assets/ConnectAccount'
import { useDispatch, useSelector } from 'react-redux'
import { CreateWidget } from './createWidget/CreateWidget'
import { addWidgetIcon, hiddenIcon, visibleIcon } from '../../assets/widgets'
import {
  deleteWidget,
  deleteWidgetById,
  getAllWidgets,
  widgetsSelector,
} from '../../redux/reducers/widgets'
import {
  setAlbumNull,
  setDefalultSettings,
} from '../../redux/reducers/widgetSetup'
import { THEME_LINK } from '../../Constants'

export const YourWidgets = () => {
  const [addWidget, setAddWidget] = useState(false)
  const [selectedWidget, setSelectedWidget] = useState(null)
  const [isEditing, setIsEditing] = useState('add')
  const { widgets, loader } = useSelector(widgetsSelector)
  const dispatch = useDispatch()
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    dispatch(getAllWidgets(userId))
  }, [addWidget])
  const handleNavigate = () => {
    dispatch(setDefalultSettings())
    dispatch(setAlbumNull())
    setIsEditing('add')
    setAddWidget(true)
  }

  const WidgetItem = ({
    setSelectedWidget,
    setIsEditing,
    setAddWidget,
    widget,
  }) => {
    const { id, albumName, widgetName, totalItems } = widget
    const [popoverActive, setPopoverActive] = useState(false)
    const [isHidden, setIsHidden] = useState(false);
    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    )
    const toggleHidden = useCallback(
      () => {
        setIsHidden((popoverActive) => !popoverActive)},
      [],
    )

    const actionsHandler = useCallback((val) => {
      setPopoverActive(false)
    }, [])

    const activator = (
      <div className={styles.selectDropdownIcon} onClick={togglePopoverActive}>
        <Icon source={MobileVerticalDotsMajor} color="base" />
      </div>
    )

    const editWidget = () => {
      setSelectedWidget(id)
      setIsEditing()
      setAddWidget()
    }
    const deleteWidgetHandler = () => {
      dispatch(deleteWidgetById({ widgetId: id }))
      dispatch(deleteWidget({ userId, widgetId: id }))
    }
    const popupItems = [
      {
        onAction: toggleHidden,
        suffix: (
          <a href={THEME_LINK} target="_blank" className={styles.edit}>
            {isHidden ? (
              <img src={hiddenIcon} alt="hiddenIcon" />
            ) : (
              <img src={visibleIcon} alt="visibleIcon" />
            )}
            <b>Paused</b>
          </a>
        ),
      },
      {
        onAction: editWidget,
        suffix: (
          <div className={styles.edit}>
            <Icon source={EditMinor} color="base" />
            <b>Edit</b>
          </div>
        ),
      },
      {
        onAction: deleteWidgetHandler,
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
          <div className={styles.nameContainer}>
            <h2 className={styles.itemHeadline}>{widgetName}</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href={THEME_LINK} target="_blank" onClick={toggleHidden} className={styles.visibleIcon}>
                {isHidden ? (
                  <img src={hiddenIcon} alt="hiddenIcon" />
                ) : (
                  <img src={visibleIcon} alt="visibleIcon" />
                )}
              </a>
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
          </div>
          <div className={styles.accountContainer}>
            <img width={20} src={instagramIcon} alt="instagramIcon" />
            <span>@instagram_account</span>
          </div>
        </div>

        <div className={styles.statistics}>
          <div>
            <span>Album</span>
            <span>{albumName}</span>
          </div>
          <div>
            <span>Template</span>
            <span>Basic</span>
          </div>
          <div>
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      {addWidget ? (
        <CreateWidget
          selectedWidget={selectedWidget}
          isEditing={isEditing}
          goBack={() => setAddWidget(false)}
        />
      ) : (
        <div>
          {loader ? (
            <Frame>
              <Loading />
            </Frame>
          ) : (
            <>
              <h2 className={styles.headline}>Your Widgets</h2>
              <div className={styles.itemsContainer}>
                <div
                  onClick={handleNavigate}
                  style={{ cursor: 'pointer' }}
                  className={styles.item}
                >
                  <img src={addWidgetIcon} alt="createWidget" />
                  <h2 className={styles.itemHeadline}>Add New Widget</h2>
                </div>
                {widgets.map((widget) => {
                  return (
                    <WidgetItem
                      setSelectedWidget={setSelectedWidget}
                      setIsEditing={() => setIsEditing('edit')}
                      setAddWidget={() => setAddWidget(true)}
                      key={widget?.id}
                      widget={widget}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
