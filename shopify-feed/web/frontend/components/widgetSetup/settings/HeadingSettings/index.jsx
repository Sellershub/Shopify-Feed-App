import { ChoiceList } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import classes from './heading.module.css'
import {
  selectHeading,
  widgetSetupSelector,
} from '../../../../redux/reducers/widgetSetup'

export const HeadingSettings = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { heading } = settings
  const { radio, enableTitle, enableDescription, enableButton } = heading
  const handleChange = useCallback(
    (value) => dispatch(selectHeading({ type: 'select', value })),
    [],
  )
  const [radioType] = radio
  return (
    <div className={classes.container}>
      <ChoiceList
        title=""
        choices={[
          { label: 'Basic', value: 'basic' },
          {
            label: 'Choose and show your account information',
            value: 'choose',
          },
        ]}
        selected={radio}
        onChange={handleChange}
      />
      {radioType === 'basic' ? (
        <div className={classes.switchContainer}>
          <div>
            <Switch
              className={classes.switch}
              offHandleColor="#ffffff"
              onHandleColor="#ffffff"
              offColor="#BABFC3"
              onColor="#008060"
              width={36}
              height={20}
              onChange={() =>
                dispatch(selectHeading({ type: 'title', value: !enableTitle }))
              }
              checked={enableTitle}
              checkedIcon={false}
              uncheckedIcon={false}
            />
            <span className={classes.label}>Enable title</span>
          </div>
          <div>
            <Switch
              className={classes.switch}
              offHandleColor="#ffffff"
              onHandleColor="#ffffff"
              offColor="#BABFC3"
              onColor="#008060"
              width={36}
              height={20}
              onChange={() =>
                dispatch(
                  selectHeading({
                    type: 'description',
                    value: !enableDescription,
                  }),
                )
              }
              checked={enableDescription}
              checkedIcon={false}
              uncheckedIcon={false}
            />
            <span className={classes.label}>Enable description</span>
          </div>
        </div>
      ) : (
        <div className={classes.switchContainer}>
          <div>
            <Switch
              className={classes.switch}
              offHandleColor="#ffffff"
              onHandleColor="#ffffff"
              offColor="#BABFC3"
              onColor="#008060"
              width={36}
              height={20}
              onChange={() =>
                dispatch(
                  selectHeading({ type: 'button', value: !enableButton }),
                )
              }
              checked={enableButton}
              checkedIcon={false}
              uncheckedIcon={false}
            />
            <span className={classes.label}>Enable “Follow” button</span>
          </div>
        </div>
      )}
    </div>
  )
}
