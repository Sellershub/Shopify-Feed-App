import { Card, TextField, Button, ButtonGroup } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import {
  albumCreationSelector,
  setAlbumName,
} from '../../redux/reducers/albumCreation'

// @ts-ignore
import classes from '../../style/albumSetup.module.css'
import { PhotoSourceItem } from './photoSourceItem'

const options = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'lastWeek' },
]

export const FirstStep = ({ setStep, goBack = null, isEditing }) => {
  const dispatch = useDispatch()
  const { albumName } = useSelector(albumCreationSelector)

  const [checked, setChecked] = useState(false)
  const [accounts, setAccounts] = useState([options[0]])
  const handleChange = useCallback((newValue) => {
    dispatch(setAlbumName(newValue))
  }, [])

  const handleContinue = () => {
    setStep()
  }

  return (
    <div className={classes.cardContainer}>
      <Card sectioned>
        <div className={classes.stepContainer}>
          <div>
            <h3 className={classes.infoHeadline}>
              Photo from album can be shown in the widget on website.
            </h3>
            <TextField
              value={albumName === null ? '' : albumName}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter album name"
            />
            <h3 className={classes.title}>Account’s photo sources</h3>
            {accounts.map((item, index) => {
              return (
                <PhotoSourceItem
                  lastIndex={accounts.length - 1}
                  key={item.label}
                  setAccounts={setAccounts}
                  item={item}
                  index={index}
                />
              )
            })}

            <div className={classes.auto_sync}>
              <div>
                <span className={classes.auto_sync_label}>Auto sync</span>
                <Switch
                  className={classes.switch}
                  offHandleColor="#BABFC3"
                  onHandleColor="#008060"
                  offColor="#fff"
                  onColor="#fff"
                  width={36}
                  height={20}
                  onChange={() => setChecked(!checked)}
                  checked={checked}
                  checkedIcon={false}
                  uncheckedIcon={false}
                />
              </div>
              <p className={classes.auto_sync_text}>
                Album with all account photos will be created. And synced
                automatically
              </p>
              <p className={classes.auto_sync_text}>
                Avaiable in <span>Pro plan</span>
              </p>
            </div>
          </div>
          <div>
            <ButtonGroup fullWidth>
              <Button onClick={() => Boolean(goBack) && goBack()}>
                {isEditing === 'add' ? 'Back' : 'Cancel'}
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!albumName}
                primary={Boolean(accounts)}
              >
                Continue
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Card>
    </div>
  )
}
