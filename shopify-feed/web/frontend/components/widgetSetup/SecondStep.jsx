import {
  Button,
  ButtonGroup,
  Icon,
  ResourceItem,
  ResourceList,
  Tabs,
} from '@shopify/polaris'
import React, { useCallback } from 'react'
import { useNavigate } from '@shopify/app-bridge-react'
import { useDispatch, useSelector } from 'react-redux'
import { Settings } from './settings/Settings'
import { ChevronRightMinor } from '@shopify/polaris-icons'
import styles from '../../style/widgetSetup.module.css'
import {
  chooseDevice,
  chooseSetting,
  widgetSetupSelector,
} from '../../redux/reducers/widgetSetup'
import { deviceTabs, settingsOptions, settingsOptionsMobile } from '../../utils/data'




export const SecondStep = ({ setNext, setBack }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { device, selectedSettings } = settings

  const handleTabChange = useCallback(
    (selectedTabIndex) => dispatch(chooseDevice(selectedTabIndex)),
    [],
  )
  const handleBack = useCallback(() => setBack(), [])
  const handleContinue = useCallback(() => {
    setNext()
  }, [])
  return (
    <div className={styles.cardContainer}>
      <div >

        <h3 className={styles.subTitle}>
          You is able to adjust parts of the widjest, just select what you want
          to edit
        </h3>
        <div>
          <div className={styles.deviceTabs}>
            <Tabs
              tabs={deviceTabs}
              selected={device}
              onSelect={handleTabChange}
            ></Tabs>
          </div>
        </div>
        <div className={styles.settingsContainer}>
          {selectedSettings === null ? (
            <ResourceList
              resourceName={{ singular: 'customer', plural: 'customers' }}
              items={device ? settingsOptionsMobile : settingsOptions}
              renderItem={(item) => {
                const { id, name } = item

                return (
                  <ResourceItem
                    onClick={(id) =>dispatch(chooseSetting(id))}
                    id={id}
                  >
                    <div className={styles.settingsItem}>
                      <span>{name}</span>
                      <Icon
                        backdrop={false}
                        source={ChevronRightMinor}
                        color="base"
                      />
                    </div>
                  </ResourceItem>
                )
              }}
            />
          ) : (
            <Settings
              name={selectedSettings}
            />
          )}
        </div>
      </div>

        <ButtonGroup fullWidth>
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleContinue} primary={true}>
            Continue
          </Button>
        </ButtonGroup>
    </div>
  )
}
