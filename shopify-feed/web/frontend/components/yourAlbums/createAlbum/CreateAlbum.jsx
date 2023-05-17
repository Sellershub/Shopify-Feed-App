import {
  ActionList,
  Card,
  Checkbox,
  DisplayText,
  Frame,
  Grid,
  Image,
  Loading,
  Page,
  Popover,
  Tabs,
} from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  albumCreationSelector,
  getInstaData,
  getSelectedAlbum,
  multiplyChoice,
  selectAll,
} from '../../../redux/reducers/albumCreation'
import { backButton } from '../../../assets/albums'
import classes from './create.module.css'
import { InstagramData } from '../../albomeSetup/InstagramData'
import { FirstStep } from '../../albomeSetup/FirstStep'
import { SecondStep } from '../../albomeSetup/SecondStep'
import { TaggedModal } from '../../albomeSetup/InstagramData/TaggedModal'
import { filterPostsTabs, albumFirstTabs } from '../../../utils/data'

export const CreateAlbum = ({ goBack, isEditing, selectedAlbum }) => {
  const [selected, setSelected] = useState(0)
  const [selectedSettings, setSelectedSettings] = useState(0)
  const { instaData, loader } = useSelector(albumCreationSelector)
  const [activePost, setActivePost] = useState(null)
  const [popoverActive, setPopoverActive] = useState(false)
  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  )

  const actionsHandler = useCallback((val) => {
    setPopoverActive(false)
  }, [])

  const activator = (
    <div onClick={togglePopoverActive} className={classes.actionBtn}>
      Action
    </div>
  )
  const dispatch = useDispatch()
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  )

  const handleGoBack = () => {
    if (selectedSettings === 0) {
      goBack()
    }
    if (selectedSettings !== 0) {
      setSelectedSettings((prev) => --prev)
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')
    const instagramId = localStorage.getItem('instagramId')
    if (isEditing === 'edit') {
      dispatch(getSelectedAlbum({ albumId: selectedAlbum, userId }))
    } else {
      dispatch(getInstaData({ accessToken, userId, instagramId }))
    }
  }, [])
  const popupItems = [
    {
      onAction: () => dispatch(multiplyChoice({ show: false })),
      suffix: <h4>Hide</h4>,
    },
    {
      onAction: () => dispatch(multiplyChoice({ show: true })),
      suffix: <div>Show</div>,
    },
  ]
  const selectedPosts = instaData.filter((post) => post.selected).length
  const shouldSelectAll = selectedPosts < instaData.length

  return (
    <div>
      <div className={classes.AlbomeSetup} onClick={handleGoBack}>
        <Image
          source={backButton}
          alt="back button"
          style={{ marginRight: 16, cursor: 'pointer' }}
        />
        <h1 className={classes.mainHeadline}>
          {isEditing === 'edit' ? 'Edit Album' : 'New Album'}
        </h1>
      </div>
      {loader ? (
        <Frame>
          <Loading />
        </Frame>
      ) : (
        <Page fullWidth>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <div className={classes.tabs}>
                <Tabs
                  tabs={albumFirstTabs}
                  selected={selectedSettings}
                  // onSelect={handleSelectedTabChange}
                ></Tabs>
              </div>

              {selectedSettings == 0 && (
                <FirstStep
                  isEditing={isEditing}
                  setStep={() => setSelectedSettings(1)}
                  goBack={() => handleGoBack()}
                />
              )}
              {selectedSettings === 1 && (
                <SecondStep
                  instaData={instaData}
                  setBack={() => setSelectedSettings(0)}
                  btnText={isEditing === 'edit' ? 'Save' : 'Add'}
                  save={() => goBack()}
                />
              )}
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 8, xl: 8 }}>
              <div className={classes.selectAllContainer}>
                <h3 className={classes.selectHeadline}>Album preview</h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingRight: 20,
                  }}
                >
                  {Boolean(selectedPosts) && (
                    <span style={{ marginRight: 10 }}>
                      {selectedPosts}/{instaData.length} selected
                    </span>
                  )}

                  <Checkbox
                    name="success"
                    onChange={() =>
                      dispatch(selectAll({ select: shouldSelectAll }))
                    }
                    checked={!shouldSelectAll}
                  />
                  <span
                    style={{ cursor: 'pointer', marginRight: 10 }}
                    onClick={() =>
                      dispatch(selectAll({ select: shouldSelectAll }))
                    }
                  >
                    Select All
                  </span>
                  {Boolean(selectedPosts) && (
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
                  )}
                </div>
              </div>
              <Card sectioned>
                <div className={classes.filterTabs}>
                  <Tabs
                    tabs={filterPostsTabs}
                    selected={selected}
                    onSelect={handleTabChange}
                  ></Tabs>
                </div>

                <div style={{ height: 498 }} className={classes.postsContainer}>
                  {selected === 0 &&
                    instaData.map((media, index) => {
                      return media?.media_url ? (
                        <InstagramData
                          index={index}
                          setActivePost={setActivePost}
                          key={media.id}
                          media={media}
                        />
                      ) : (
                        <div style={{ width: '140px', height: '140px' }}></div>
                      )
                    })}
                  {selected === 1 &&
                    instaData.map((media, index) => {
                      return (
                        media?.media_url &&
                        media.isShown && (
                          <InstagramData
                            index={index}
                            setActivePost={setActivePost}
                            key={media.id}
                            media={media}
                          />
                        )
                      )
                    })}
                  {selected === 2 &&
                    instaData.map((media, index) => {
                      return (
                        media?.media_url &&
                        media.pinned && (
                          <InstagramData
                            index={index}
                            setActivePost={setActivePost}
                            key={media.id}
                            media={media}
                          />
                        )
                      )
                    })}
                  {selected === 3 &&
                    instaData.map((media, index) => {
                      return (
                        media?.media_url &&
                        media?.productTags.length > 0 && (
                          <InstagramData
                            index={index}
                            setActivePost={setActivePost}
                            key={media.id}
                            media={media}
                          />
                        )
                      )
                    })}
                  {selected === 4 &&
                    instaData.map((media, index) => {
                      return (
                        media?.media_url &&
                        media.media_type === 'VIDEO' && (
                          <InstagramData
                            index={index}
                            setActivePost={setActivePost}
                            key={media.id}
                            media={media}
                          />
                        )
                      )
                    })}
                  {selected === 5 &&
                    instaData.map((media, index) => {
                      return (
                        media?.media_url &&
                        !media.isShown && (
                          <InstagramData
                            index={index}
                            setActivePost={setActivePost}
                            key={media.id}
                            media={media}
                          />
                        )
                      )
                    })}
                </div>

                {activePost !== null && (
                  <TaggedModal
                    setActivePost={(index) => setActivePost(index)}
                    instaData={instaData}
                    activePost={activePost}
                  />
                )}
                {activePost !== null && (
                  <div
                    className={classes.backGround}
                    onClick={() => setActivePost(null)}
                  ></div>
                )}
              </Card>
            </Grid.Cell>
          </Grid>
        </Page>
      )}
    </div>
  )
}
