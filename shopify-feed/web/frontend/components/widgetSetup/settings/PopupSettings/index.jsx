import { ChoiceList, TextField } from '@shopify/polaris'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import {
  selectPopup,
  widgetSetupSelector,
} from '../../../../redux/reducers/widgetSetup'
import classes from './popup.module.css'

export const PopupSettings = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { popup } = settings
  const {
    profile,
    profileTab,
    folowBtn,
    caption,
    date,
    instaView,
    instaViewTab,
    folowBtnText
  } = popup
  const profileTabHandleChange = useCallback(
    (value) => dispatch(selectPopup({ type: 'profileTab', value })),
    [],
  )
  const instaViewTabHandleChange = useCallback(
    (value) => dispatch(selectPopup({ type: 'instaViewTab', value })),
    [],
  )
  const folowBtnTextHandleChange = useCallback(
    (newValue) =>
      dispatch(selectPopup({ type: 'folowBtnText', value: newValue })),
    [],
  )
  return (
    <div className={classes.container}>
      <div className={classes.switchContainer}>
        <Switch
          className={classes.switch}
          offHandleColor="#ffffff"
          onHandleColor="#ffffff"
          offColor="#BABFC3"
          onColor="#008060"
          width={36}
          height={20}
          onChange={() =>
            dispatch(selectPopup({ type: 'profile', value: !profile }))
          }
          checked={profile}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Enable user profile
        </h2>
      </div>
      {profile && (
        <div style={{ marginLeft: 10 }}>
          <ChoiceList
            title=""
            choices={[
              { label: 'Open profile in same tab', value: 'same' },
              {
                label: 'Open profile in new tab',
                value: 'new',
              },
              {
                label: 'No link',
                value: 'no link',
              },
            ]}
            selected={profileTab}
            onChange={profileTabHandleChange}
          />
        </div>
      )}

      <div className={classes.switchContainer}>
        <Switch
          className={classes.switch}
          offHandleColor="#ffffff"
          onHandleColor="#ffffff"
          offColor="#BABFC3"
          onColor="#008060"
          width={36}
          height={20}
          onChange={() =>
            dispatch(selectPopup({ type: 'folowBtn', value: !folowBtn }))
          }
          checked={folowBtn}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Enable “Follow” button
        </h2>
      </div>
      {
        folowBtn && <div className={classes.ctaBtnInput}>
        <TextField
          value={folowBtnText}
          onChange={folowBtnTextHandleChange}
          autoComplete="off"
          placeholder="Enter album name"
        />
      </div>
      }
      <div className={classes.switchContainer}>
        <Switch
          className={classes.switch}
          offHandleColor="#ffffff"
          onHandleColor="#ffffff"
          offColor="#BABFC3"
          onColor="#008060"
          width={36}
          height={20}
          onChange={() =>
            dispatch(selectPopup({ type: 'caption', value: !caption }))
          }
          checked={caption}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Enable caption
        </h2>
      </div>
      <div className={classes.switchContainer}>
        <Switch
          className={classes.switch}
          offHandleColor="#ffffff"
          onHandleColor="#ffffff"
          offColor="#BABFC3"
          onColor="#008060"
          width={36}
          height={20}
          onChange={() => dispatch(selectPopup({ type: 'date', value: !date }))}
          checked={date}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Enable date
        </h2>
      </div>
      <div className={classes.switchContainer}>
        <Switch
          className={classes.switch}
          offHandleColor="#ffffff"
          onHandleColor="#ffffff"
          offColor="#BABFC3"
          onColor="#008060"
          width={36}
          height={20}
          onChange={() =>
            dispatch(selectPopup({ type: 'instaView', value: !instaView }))
          }
          checked={instaView}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Enable “View on Instagram”
        </h2>
      </div>
      {instaView && (
        <div style={{ marginLeft: 10 }}>
          <ChoiceList
            title=""
            choices={[
              { label: 'Open profile in same tab', value: 'same' },
              {
                label: 'Open profile in new tab',
                value: 'new',
              },
            ]}
            selected={instaViewTab}
            onChange={instaViewTabHandleChange}
          />
        </div>
      )}
    </div>
  )
}
