import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Switch from 'react-switch'

import classes from './styles.module.css'
import {
  selectShoppable,
  widgetSetupSelector,
} from '../../../../redux/reducers/widgetSetup'
import { ChoiceList, TextField } from '@shopify/polaris'

export const ShoppableSettings = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { shoppable, device } = settings
  const {
    showIcon,
    hotSpotColor,
    hotSpotHover,
    opacity,
    hotspotLink,
    displayProduct,
    ctaBtn,
    ctaBtnText,
    ctaBtnColor,
    ctaBtnTextColor,
  } = shoppable

  const hotspotLinkTabHandleChange = useCallback(
    (value) => dispatch(selectShoppable({ type: 'hotspotLink', value })),
    [],
  )
  const displayProductHandleChange = useCallback(
    (value) => dispatch(selectShoppable({ type: 'displayProduct', value })),
    [],
  )
  const ctaBtnTabHandleChange = useCallback(
    (value) => dispatch(selectShoppable({ type: 'ctaBtn', value })),
    [],
  )
  const ctaBtnTextHandleChange = useCallback(
    (newValue) =>
      dispatch(selectShoppable({ type: 'ctaBtnText', value: newValue })),
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
            dispatch(selectShoppable({ type: 'showIcon', value: !showIcon }))
          }
          checked={showIcon}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <h2 style={{ marginLeft: 6 }} className={classes.label}>
          Show icon cart on item
        </h2>
      </div>
      <h3 className={classes.title}>Hotspot color</h3>
      <div className={classes.row}>
        <div>
          <span className={classes.label}>Color</span>
          <input
            onChange={(e) =>
              dispatch(
                selectShoppable({
                  type: 'hotSpotColor',
                  value: e.target.value,
                }),
              )
            }
            className={classes.inputBg}
            style={{ padding: 0, border: 'none' }}
            value={hotSpotColor}
            type="color"
          />
        </div>
      </div>
      {!device && (
        <>
          <h3 className={classes.title}>Hotspot hover</h3>
          <div className={classes.row}>
            <div>
              <span className={classes.label}>Color</span>
              <input
                onChange={(e) =>
                  dispatch(
                    selectShoppable({
                      type: 'hotSpotHover',
                      value: e.target.value,
                    }),
                  )
                }
                className={classes.inputBg}
                style={{ padding: 0, border: 'none' }}
                value={hotSpotHover}
                type="color"
              />
            </div>
            <div>
              <span className={classes.label}>Opacity</span>
              <input
                onChange={(e) =>
                  dispatch(
                    selectShoppable({
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
          <h3 className={classes.title}>Hotspot link</h3>
          <div className={classes.row}>
            <div style={{ marginLeft: 10 }}>
              <ChoiceList
                title=""
                choices={[
                  { label: 'Open in new tab', value: 'new' },
                  {
                    label: 'Open in same tab',
                    value: 'same',
                  },
                ]}
                selected={hotspotLink}
                onChange={hotspotLinkTabHandleChange}
              />
            </div>
          </div>
          <h3 className={classes.title}>Display product item</h3>
          <div className={classes.row}>
            <div style={{ marginLeft: 10 }}>
              <ChoiceList
                title=""
                choices={[
                  { label: 'Vertical view', value: 'column' },
                  {
                    label: 'Horizontal view',
                    value: 'row',
                  },
                ]}
                selected={displayProduct}
                onChange={displayProductHandleChange}
              />
            </div>
          </div>
        </>
      )}

      <h3 className={classes.title}>CTA button</h3>
      <div className={classes.row}>
        <div
          style={{
            marginLeft: 10,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <ChoiceList
            title=""
            choices={[
              { label: 'Open product detail in same tab', value: 'same' },
              {
                label: 'Open product detail in new tab',
                value: 'new',
              },
            ]}
            selected={ctaBtn}
            onChange={ctaBtnTabHandleChange}
          />
          <div className={classes.ctaBtnInput}>
            <TextField
              value={ctaBtnText}
              onChange={ctaBtnTextHandleChange}
              autoComplete="off"
              placeholder="Enter album name"
            />
          </div>
        </div>
      </div>
      <h3 className={classes.title}>CTA button settings</h3>
      <div className={classes.ctaBtnSettings}>
        <div>
          <span className={classes.label}>Button Color</span>
          <input
            onChange={(e) =>
              dispatch(
                selectShoppable({
                  type: 'ctaBtnColor',
                  value: e.target.value,
                }),
              )
            }
            className={classes.inputBg}
            value={ctaBtnColor}
            type="color"
          />
        </div>
        <div>
          <span className={classes.label}>Text Color</span>
          <input
            onChange={(e) =>
              dispatch(
                selectShoppable({
                  type: 'ctaBtnTextColor',
                  value: e.target.value,
                }),
              )
            }
            className={classes.inputBg}
            value={ctaBtnTextColor}
            type="color"
          />
        </div>
      </div>
    </div>
  )
}
