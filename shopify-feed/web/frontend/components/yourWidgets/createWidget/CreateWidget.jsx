import {
  Frame,
  Grid,
  Image,
  Loading,
  Page,
  Tabs,
} from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { backButton } from '../../../assets/albums'
import styles from './create.module.css'
import {
  deviceTabs,
  widgetStepsTabs,
} from '../../../utils/data'
import { Widget } from '../../widgetSetup/widget'
import { albumsSelector } from '../../../redux/reducers/albums'
import {
  chooseDevice,
  getSelectedWidget,
  widgetSetupSelector,
} from '../../../redux/reducers/widgetSetup'
import { useNavigate } from 'react-router-dom'
import { FirstStep } from '../../widgetSetup/FirstStep'
import { SecondStep } from '../../widgetSetup/SecondStep'
import { ThirdStep } from '../../widgetSetup/ThirdStep'

export const CreateWidget = ({ goBack, isEditing, selectedWidget }) => {
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
  const handleWidgetTabChange = useCallback(
    (selectedTabIndex) => {
      if(step === 2 && selectedTabIndex +1  === 1){
        setStep(1)
      }
      if(step === 3 && selectedTabIndex + 1 === 2){
        setStep(2)
      }
    },
    [step]
  )
  const handleGoBack = () => {
    if (step === 1) {
      goBack()
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

    if (isEditing === 'edit') {
      dispatch(getSelectedWidget({ widgetId: selectedWidget, userId }))
    } 
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.widgetSetup} onClick={handleGoBack}>
        <Image
          source={backButton}
          alt="back button"
          style={{ marginRight: 16, cursor: 'pointer' }}
        />
        <h1 className={styles.mainHeadline}>
        {isEditing === 'edit' ? 'Edit Widget' : 'New Widget'}
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
            <div className={styles.widgetStepsTabs}>
              <Tabs
                tabs={widgetStepsTabs}
                selected={step - 1}
                onSelect={handleWidgetTabChange}
                ></Tabs>
                </div>
              {step === 1 && (
                <FirstStep
                  albumsOptions={albumsOptions}
                  setNext={() => setStep(2)}
                  isFirstSettings={false}
                  goBack={goBack}
                />
              )}
              {step === 2 && (
                <SecondStep
                  setBack={() => setStep(1)}
                  setNext={() => setStep(3)}
                />
              )}
              {step === 3 && <ThirdStep btnText={isEditing === 'edit' ? 'Save' : 'Add'} setBack={() => setStep(2)} save={()=>goBack()}/>}
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 8, xl: 8 }}>
              <div>
                <div className={styles.previewContainer}>
                  <div className={styles.bigDeviceTabs}>
                    <Tabs
                      tabs={deviceTabs}
                      selected={device}
                      onSelect={handleTabChange}
                    ></Tabs>
                  </div>
                </div>
                <div className={styles.postsContainer}>
                  <Widget step={step} />
                </div>
              </div>
            </Grid.Cell>
          </Grid>
        </Page>
      )}
    </div>
  )
}
