import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from './layout.module.css'
import {
  selectLayout,
  widgetSetupSelector,
} from '../../../../redux/reducers/widgetSetup'

export const LayoutSettings = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { layout, device } = settings
  const {
    columns,
    rows,
    padding,
    borderRadius,
    mobileColumns,
    mobileRows,
    backgroundColor
  } = layout

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <h4 className={classes.label}>No. of columns</h4>
        <h4 className={classes.label}>No. of rows</h4>
      </div>
      <div className={classes.row}>
        <input
          onChange={(e) => {
            dispatch(
              selectLayout({
                type: device ? 'mobilecolumn' : 'column',
                value: e.target.value,
              }),
            )
          }}
          value={device ? mobileColumns : columns}
          min={1}
          max={8}
          className={classes.input}
          type="number"
        />
        <input
          onChange={(e) =>
            dispatch(
              selectLayout({
                type: device ? 'mobilerows' : 'row',
                value: e.target.value,
              }),
            )
          }
          value={device ? mobileRows : rows}
          min={1}
          max={8}
          className={classes.input}
          type="number"
        />
      </div>
      <div className={classes.row}>
        <h4 className={classes.label}>Item padding (px)</h4>
        <h4 className={classes.label}>Border radius (px)</h4>
      </div>
      <div className={classes.row}>
        <input
          onChange={(e) =>
            dispatch(
              selectLayout({
                type: 'padding',
                value: e.target.value,
              }),
            )
          }
          min={0}
          max={10}
          value={padding}
          className={classes.input}
          type="number"
        />
        <input
          onChange={(e) =>
            dispatch(
              selectLayout({
                type: 'border',
                value: e.target.value,
              }),
            )
          }
          min={0}
          max={15}
          value={borderRadius}
          className={classes.input}
          type="number"
        />
      </div>
      <div className={classes.row}>
        <h4 className={classes.label}>Background</h4>
      </div>
      <div className={classes.row}>
        <input
        onChange={(e) =>
          dispatch(
            selectLayout({
              type: 'background',
              value: e.target.value,
            }),
          )
        }
        style={{padding: 0, border: 'none'}}
        value={backgroundColor}
        type="color"
        />
      </div>
    </div>
  )
}
