import { Button, ButtonGroup, Card, Tabs } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { SelectedHashtag } from './form/SelectedHashtag'
import { useNavigate } from '@shopify/app-bridge-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  albumCreationSelector,
  createAlbums,
  editAlbum,
  selectHideAll,
} from '../../redux/reducers/albumCreation'
import classes from '../../style/albumSetup.module.css'
import { postSelectingTabs } from '../../utils/data'

export const SecondStep = ({
  setBack,
  btnText = 'Continue',
  save,
  instaData,
}) => {
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { albumId, albumName } = useSelector(albumCreationSelector)

  const userId = localStorage.getItem('userId')
  const handleTabChange = useCallback((selectedTabIndex) => {
    if (selectedTabIndex === 0) {
      dispatch(selectHideAll({ type: 'select' }))
    }
    if (selectedTabIndex === 2) {
      dispatch(selectHideAll({ type: 'hide' }))
    }
    setSelected(selectedTabIndex)
  }, [])
  const handleBack = useCallback(() => setBack(), [])
  const handleContinue = async () => {
    if (btnText === 'Save') {
      await dispatch(
        editAlbum({ albumName, posts: instaData, userId, albumId }),
      )
      save()
    } else if (btnText === 'Add') {
      await dispatch(createAlbums({ albumName, posts: instaData, userId }))
      save()
    } else {
      await dispatch(createAlbums({ albumName, posts: instaData, userId }))
      navigate('/WidgetSetup')
    }
  }

  return (
    <div className={classes.cardContainer}>
      <Card sectioned>
        <div className={classes.stepContainer}>
          <div>
            <h3 className={classes.infoHeadline}>
              Photo from album can be shown in the widget on website.
            </h3>
            <div className={classes.tabsType}>
              <Tabs tabs={postSelectingTabs} selected={selected} onSelect={handleTabChange}>
                <Card.Section>
                  {selected == 0 && (
                    <>
                      <p className={classes.paragraph}>
                        In this album all photo will be shown in this album. All
                        photos are selected by default.You will be able to edit
                        selections later.
                      </p>
                      <p className={classes.paragraph}>You will be able to edit selections later.</p>
                    </>
                  )}
                  {selected == 1 && <SelectedHashtag />}
                  {selected == 2 && (
                    <div>
                      <p className={classes.paragraph}>
                        In this album only selected photo will be shown in this
                        album. All photos are deselected by default.
                      </p>
                      <p className={classes.paragraph}>
                        Select photos in right preview window. You will able to
                        select more photos later.
                      </p>
                    </div>
                  )}
                </Card.Section>
              </Tabs>
            </div>
          </div>

          <ButtonGroup fullWidth>
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleContinue} primary={true}>
              {btnText}
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </div>
  )
}
