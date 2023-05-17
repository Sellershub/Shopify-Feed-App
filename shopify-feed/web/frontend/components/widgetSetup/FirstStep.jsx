import {
  Select,
  TextField,
  Button,
  ButtonGroup,
  Tabs,
} from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from '@shopify/app-bridge-react'


// @ts-ignore
import classes from '../../style/widgetSetup.module.css'
import { Desktop } from './chooseAlbum/Desktop'
import { Mobile } from './chooseAlbum/Mobile'
import { useDispatch, useSelector } from 'react-redux'
import {
  chooseDevice,
  getAlbumForWidget,
  setWidgetName,
  widgetSetupSelector,
} from '../../redux/reducers/widgetSetup'
import { deviceTabs } from '../../utils/data'

export const FirstStep = ({
  albumsOptions,
  setNext,
  isFirstSettings = true,
  goBack,
}) => {
  const { settings, widgetName ,selectedWidgetAlbum, loader,selectedWidgetAlbumId } = useSelector(widgetSetupSelector)
  const [selectedAlbum, setSelectedAlbum] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { device } = settings
  
  const handleTabChange = useCallback(
    (selectedTabIndex) => dispatch(chooseDevice(selectedTabIndex)),
    [],
  )
  const handleTextChange = useCallback((newValue) => {
    dispatch(setWidgetName(newValue))
  }, [])
  const handleSelectChange = useCallback((value) => {
    const userId = localStorage.getItem('userId')
    dispatch(getAlbumForWidget({ albumId: value, userId }))
    setSelectedAlbum(value)
  }, [])
  const handleContinue = () => {
    setNext()
  }
  const handleGoBack = () => {
    if (isFirstSettings) {
      navigate('/AlbomeSetup')
    } else {
      goBack()
    }
  }
  useEffect(()=>{
    setSelectedAlbum(selectedWidgetAlbumId)
  }, [selectedWidgetAlbumId])
  return (
    <div className={classes.cardContainer}>
      
      <div style={{ height: 400 }}>
        <TextField
          value={widgetName}
          onChange={handleTextChange}
          autoComplete="off"
          placeholder="Enter widget name"
        />
        <h3 className={classes.title}>Choose album</h3>
        <div className={classes.select}>
          <Select
            options={albumsOptions}
            onChange={handleSelectChange}
            value={selectedAlbum}
            label={''}
          />
        </div>
        <div className={classes.deviceTabs}>
          <Tabs tabs={deviceTabs} selected={device} onSelect={handleTabChange}>
            {device == 0 && <Desktop />}
            {device == 1 && <Mobile />}
          </Tabs>
        </div>
      </div>

      <div>
        <ButtonGroup fullWidth>
          <Button onClick={handleGoBack}>Back</Button>
          <Button onClick={handleContinue} disabled={!widgetName} primary={true}>
            Continue
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
