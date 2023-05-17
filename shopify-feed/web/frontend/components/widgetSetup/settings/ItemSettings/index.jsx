import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'
import {
  selectItems,
  widgetSetupSelector,
} from '../../../../redux/reducers/widgetSetup'
import {
  TextAlignmentLeftMajor,
  TextAlignmentCenterMajor,
  TextAlignmentRightMajor,
} from '@shopify/polaris-icons'
import classes from './items.module.css'
import { Icon } from '@shopify/polaris'

export const ItemSettings = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { items } = settings
  const {
    enableHover,
    backgroundColor,
    opacity,
    color,
    textAlign,
    textSize,
    textWeight,
    caption,
  } = items

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
            dispatch(selectItems({ type: 'hover', value: !enableHover }))
          }
          checked={enableHover}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Enable hover effect
        </h2>
      </div>
      {enableHover && (
        <div className={classes.settingsContainer}>
          <h3 className={classes.title}>Background</h3>
          <div className={classes.row}>
            <div>
              <span className={classes.label}>Color</span>
              <input
                onChange={(e) =>
                  dispatch(
                    selectItems({
                      type: 'background',
                      value: e.target.value,
                    }),
                  )
                }
                className={classes.inputBg}
                style={{ padding: 0, border: 'none' }}
                value={backgroundColor}
                type="color"
              />
            </div>
            <div>
              <span className={classes.label}>Opacity</span>
              <input
                onChange={(e) =>
                  dispatch(
                    selectItems({
                      type: 'opacity',
                      value: e.target.value,
                    }),
                  )
                }
                className={classes.input}
                min={0}
                max={100}
                value={opacity}
                type="number"
              />
            </div>
          </div>
          <h3 className={classes.title}>Content</h3>
          <div className={classes.row}>
            <div>
              <span className={classes.label}>Color</span>
              <input
                onChange={(e) =>
                  dispatch(
                    selectItems({
                      type: 'color',
                      value: e.target.value,
                    }),
                  )
                }
                className={classes.inputBg}
                style={{ padding: 0, border: 'none' }}
                value={color}
                type="color"
              />
            </div>
            <div>
              <span className={classes.label}>Position</span>
              <span
                onClick={() =>
                  dispatch(
                    selectItems({
                      type: 'textAlign',
                      value: 'left',
                    }),
                  )
                }
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 5,
                  border: textAlign === 'left' ? '1px solid black' : 'none',
                }}
              >
                <Icon source={TextAlignmentLeftMajor} color="base" />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    selectItems({
                      type: 'textAlign',
                      value: 'center',
                    }),
                  )
                }
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 5,
                  border: textAlign === 'center' ? '1px solid black' : 'none',
                }}
              >
                <Icon source={TextAlignmentCenterMajor} color="base" />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    selectItems({
                      type: 'textAlign',
                      value: 'right',
                    }),
                  )
                }
                style={{
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 5,
                  border: textAlign === 'right' ? '1px solid black' : 'none',
                }}
              >
                <Icon source={TextAlignmentRightMajor} color="base" />
              </span>
            </div>
          </div>
          <div className={classes.row}>
            <div>
              <span className={classes.label}>Size (px)</span>
              <input
                onChange={(e) =>
                  dispatch(
                    selectItems({
                      type: 'textSize',
                      value: e.target.value,
                    }),
                  )
                }
                min={0}
                max={20}
                className={classes.input}
                value={textSize}
                type="number"
              />
            </div>
            <div>
              <span className={classes.label}>Weight</span>
              <span
                onClick={() =>
                  dispatch(
                    selectItems({
                      type: 'textWeight',
                      value: 300,
                    }),
                  )
                }
                style={{
                  fontWeight: 300,
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 5,
                  border: textWeight === 300 ? '1px solid black' : 'none',
                }}
              >
                A
              </span>
              <span
                onClick={() =>
                  dispatch(
                    selectItems({
                      type: 'textWeight',
                      value: 500,
                    }),
                  )
                }
                style={{
                  fontWeight: 500,
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 5,
                  border: textWeight === 500 ? '1px solid black' : 'none',
                }}
              >
                A
              </span>
              <span
                onClick={() =>
                  dispatch(
                    selectItems({
                      type: 'textWeight',
                      value: 900,
                    }),
                  )
                }
                style={{
                  fontWeight: 900,
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 5,
                  border: textWeight === 900 ? '1px solid black' : 'none',
                }}
              >
                A
              </span>


            </div>
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
            dispatch(selectItems({ type: 'caption', value: !caption }))
          }
          checked={caption}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
        Enable caption
        </h2>
      </div>
        </div>
      )}
    </div>
  )
}
