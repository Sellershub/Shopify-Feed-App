import { Button, ButtonGroup, Tabs } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { useNavigate } from '@shopify/app-bridge-react'

import styles from '../../style/widgetSetup.module.css'
import { AutoInstall } from './placement/AutoInstall'
import { Manual } from './placement/Manual'
import { widgetThirdStepTabs } from '../../utils/data'
import { useDispatch, useSelector } from 'react-redux'
import {
  createWidget,
  editWidget,
  widgetSetupSelector,
} from '../../redux/reducers/widgetSetup'
import axios from 'axios'
import { NGROK_TUNNEL } from '../../Constants'

export const ThirdStep = ({ setBack, save = null, btnText = 'Continue' }) => {
  const dispatch = useDispatch()
  const {
    widget,
    widgetName,
    settings,
    selectedWidgetAlbumId,
    widgetId,
  } = useSelector(widgetSetupSelector)
  const {
    position,
    device,
    layout,
    heading,
    selectedSettings,
    items,
  } = settings
  const {
    columns,
    mobileColumns,
    backgroundColor,
    padding,
    borderRadius,
  } = layout
  const {
    caption,
    color,
    enableHover,
    opacity,
    textAlign,
    textSize,
    textWeight,
  } = items

  const [selectedTab, setSelectedTab] = useState(0)
  const navigate = useNavigate()

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTab(selectedTabIndex),
    [],
  )

  const handleBack = useCallback(() => setBack(), [])
  const handleContinue = useCallback(async () => {
    const userId = localStorage.getItem('userId')
    if (btnText === 'Save') {
      await dispatch(
        editWidget({
          albumId: selectedWidgetAlbumId,
          userId,
          widgetId,
          widgetName,
          widgetOptions: settings,
        }),
      )
      save()
    } else if (btnText === 'Add') {
      await dispatch(
        createWidget({
          userId,
          albumId: widget[0].albumId,
          widgetOptions: settings,
          widgetName,
        }),
      )
      save()
    } else {
      await dispatch(
        createWidget({
          userId,
          albumId: widget[0].albumId,
          widgetOptions: settings,
          widgetName,
        }),
      )
      navigate('/Home')
    }
    // const widget = <div>{[1, 2].map(e=><div>{e}</div>)}</div>
    const widgetHTML = widget
      .map((item) => {
        return `<div style="display: flex; position: relative;"> ${item.media_type === 'IMAGE' ? `<img style="border-radius: ${borderRadius}px; margin: ${padding}px" width='100%' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png'/>` : `<video style="border-radius: ${borderRadius}px; aspect-ratio: 1; margin: ${padding}px;" width={'100%'} height="auto"  controls><source src={${item.media_url}} type="video/mp4" /></video>`}${enableHover ? `<div style="background-color: ${items.backgroundColor}; opacity: ${opacity / 100}; border-radius: ${borderRadius}px; width: 100%; height: 100%; display: flex; position: absolute; z-index: 7; top: 0; left: 0; flex-direction: column; align-items: center; justify-content: center;">${caption && `<h3 style=" color: ${color}; text-align: ${textAlign}; font-size: ${textSize}px; font-weight: ${textWeight}; display: block; opacity: 1 !important;">Lorem Ipsum is simply dummy text of the...</h3>`}</div>` : ''}</div>`
      })
      .join('')

    const widgetContainer = `<div style="background-color: ${backgroundColor}; display: grid; grid-template-columns: ${[...Array(Number(columns)).keys()].map(() => 'auto').join(' ')};">${widgetHTML}</div>`

    const widgetContainerTest = "<img src='backsoon-postit.png'><p>We are busy updating the store for you and will be back within the hour.</p>"
    const data = await axios
      .post(`${NGROK_TUNNEL}/api/shopify/test`, {
        themeId: 134375637237,
        key: 'sections/footer.liquid',
        jsonBlock: widgetContainerTest,
      })
      .then((data) => {
        return data
      })
      .catch((err) => console.log('errauthhhhh', err))
    console.log(data)
  }, [])
  return (
    <div className={styles.cardContainer}>
      <div>
        <h3 className={styles.subTitle}>
          Select where you want to place your widget
        </h3>
        <div className={styles.deviceTabs}>
          <Tabs
            tabs={widgetThirdStepTabs}
            selected={selectedTab}
            onSelect={handleTabChange}
          >
            {selectedTab === 0 && <AutoInstall />}
            {selectedTab === 1 && <Manual />}
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
  )
}
