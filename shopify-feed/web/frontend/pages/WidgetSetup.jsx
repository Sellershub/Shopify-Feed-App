import React from 'react'
import { Grid, Page, Image, Tabs, Loading, Frame } from '@shopify/polaris'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// @ts-ignore
import styles from '../style/widgetSetup.module.css'

//icons
import {backButton } from '../assets/albums'
import { FirstStep } from '../components/widgetSetup/FirstStep'
import { SecondStep } from '../components/widgetSetup/SecondStep'
import { useNavigate } from '@shopify/app-bridge-react'
import { ThirdStep } from '../components/widgetSetup/ThirdStep'
import { useEffect } from 'react'
import { albumsSelector, getAllAlbums } from '../redux/reducers/albums'
import { Widget } from '../components/widgetSetup/widget'
import {
  chooseDevice,
  widgetSetupSelector,
} from '../redux/reducers/widgetSetup'
import { deviceTabs } from '../utils/data'

export default function WidgetSetup(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)

  const { loader, albumsOptions } = useSelector(albumsSelector)
  const { settings } = useSelector(widgetSetupSelector)
  const { device } = settings

  const handleTabChange = useCallback(
    (selectedTabIndex) => dispatch(chooseDevice(selectedTabIndex)),
    [],
  )
  const handleGoBack = () => {
    if (step === 1) {
      navigate('/AlbomeSetup')
    }
    if (step === 2) {
      setStep(1)
    }
    if (step === 3) {
      setStep(2)
    }
  }
  
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    dispatch(getAllAlbums(userId));

  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.widgetSetup} onClick={handleGoBack}>
        <Image
          source={backButton}
          alt="back button"
          style={{ marginRight: 16, cursor: 'pointer' }}
        />
        <h1 className={styles.mainHeadline}>Widget setup</h1>
      </div>
      {loader ? (
       <Frame>
       <Loading />
     </Frame>
      ) : (
        <Page fullWidth>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 4, xl: 4 }}>
              <h2 className={styles.preview}>Customization</h2>
              {step == 1 && (
                <FirstStep
                  albumsOptions={albumsOptions}
                  setNext={() => setStep(2)}
                />
              )}
              {step === 2 && (
                <SecondStep
                  setBack={() => setStep(1)}
                  setNext={() => setStep(3)}
                />
              )}
              {step === 3 && <ThirdStep setBack={() => setStep(2)} />}
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 8, xl: 8 }}>
              <div>
                <div
                className={styles.previewContainer}
                  
                >
                  <h2 className={styles.preview}>Preview</h2>
                  <div className={styles.bigDeviceTabs}>
                    <Tabs
                      tabs={deviceTabs}
                      selected={device}
                      onSelect={handleTabChange}
                    ></Tabs>
                  </div>
                </div>
                <Widget step={step} />
              </div>
            </Grid.Cell>
          </Grid>
        </Page>
      )}
    </div>
  )
}
