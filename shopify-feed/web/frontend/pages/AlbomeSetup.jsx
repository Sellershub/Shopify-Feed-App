import {
  Grid,
  Card,
  Page,
  Image,
  Tabs,
  Checkbox,
  Popover,
  ActionList,
  Loading,
  Frame,
} from '@shopify/polaris'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Lottie from 'react-lottie'
import animationData from '../lotties/success.json'
// @ts-ignore
import classes from '../style/albumSetup.module.css'

//icons
import { backButton } from '../assets/albums'
import { useLocation } from 'react-router-dom'
import React from 'react'
import { FirstStep } from '../components/albomeSetup/FirstStep'
import { SecondStep } from '../components/albomeSetup/SecondStep'
import { InstagramData } from '../components/albomeSetup/InstagramData'
import {
  albumCreationSelector,
  auth,
  getInstaData,
  multiplyChoice,
  selectAll,
} from '../redux/reducers/albumCreation'
import { TaggedModal } from '../components/albomeSetup/InstagramData/TaggedModal'
import styles from '../components/albomeSetup/InstagramData/modal.module.css'
import { filterPostsTabs } from '../utils/data'

export default function AlbomSetup(props) {
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(true)
  const [selected, setSelected] = useState(0)
  const [popoverActive, setPopoverActive] = useState(false)
  const [activePost, setActivePost] = useState(null)
  const dispatch = useDispatch()
  const { instaData, loader, albumName } = useSelector(albumCreationSelector)
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

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  )
  const { search } = useLocation()
  const code = search.slice(search.indexOf('=') + 1, search.indexOf('&'))
  const handleGoBack = () => {
    if (step !== 1) {
      setStep((prev) => --prev)
    }
  }
  async function getData() {
    await dispatch(auth(code))
    const userId = localStorage.getItem('userId')
    const accessToken = localStorage.getItem('accessToken')
    const instagramId = localStorage.getItem('instagramId')
    dispatch(getInstaData({ accessToken, userId, instagramId }))
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setSuccess(false)
    }, 3000)
  }, [])
  const selectedPosts = instaData.filter((post) => post.selected).length
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
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const shouldSelectAll = selectedPosts < instaData.length
  return (
    <>
      {success ? <Lottie options={defaultOptions} height='100%' width="100%" />
    :   <div className={classes.container}>
    <div className={classes.AlbomeSetup} onClick={handleGoBack}>
      <Image
        source={backButton}
        alt="back button"
        style={{ marginRight: 16, cursor: 'pointer' }}
      />
      <h1 className={classes.bigHeadline}>
        {step === 1 ? 'Album setup' : albumName}
      </h1>
    </div>
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
          <h3 className={classes.headline}>Album Settings</h3>
          {step == 1 && <FirstStep setStep={() => setStep(2)} />}
          {step === 2 && (
            <SecondStep instaData={instaData} setBack={() => setStep(1)} />
          )}
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 8, xl: 8 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 className={classes.headline}>Album preview</h3>
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
            <div>
              {step !== 1 && (
                <div className={classes.filterTabs}>
                  <Tabs
                    tabs={filterPostsTabs}
                    selected={selected}
                    onSelect={handleTabChange}
                  ></Tabs>
                </div>
              )}
              {loader ? (
                <Frame>
                  <Loading />
                </Frame>
              ) : (
                <div
                  style={{ height: step !== 1 ? 492 : 550 }}
                  className={classes.postsContainer}
                >
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
                        <div
                          style={{ width: '140px', height: '140px' }}
                        ></div>
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
              )}
              {activePost !== null && (
                <TaggedModal
                  setActivePost={(index) => setActivePost(index)}
                  instaData={instaData}
                  activePost={activePost}
                />
              )}
              {activePost !== null && (
                <div
                  className={styles.backGround}
                  onClick={() => setActivePost(null)}
                ></div>
              )}
            </div>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  </div>
    }
    
    
    </>

  )
}
