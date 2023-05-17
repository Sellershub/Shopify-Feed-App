import React from 'react'
import { ChevronLeftMinor, RefreshMajor } from '@shopify/polaris-icons'
import { Icon } from '@shopify/polaris'
import { PopupSettings } from './PopupSettings'
import { LayoutSettings } from './LayoutSettings'
import { HeadingSettings } from './HeadingSettings'
import { ItemSettings } from './ItemSettings'
import { ShoppableSettings } from './ShoppableSettings'
import { chooseSetting, setDefalultSettings } from '../../../redux/reducers/widgetSetup'
import { useDispatch } from 'react-redux'

export const Settings = ({ name }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div
        style={{
          padding: 12,
          display: 'flex',
          background: '#F6F6F7',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 44,
          borderRadius: 8,
        }}
      >
        <div style={{ display: 'flex' }}>
          <span
            style={{
              cursor: 'pointer',
              width: 18,
              position: 'relative',
              top: 1,
            }}
            onClick={() => dispatch(chooseSetting(null))}
          >
            <Icon backdrop={false} source={ChevronLeftMinor} color="base" />
          </span>
          <div style={{ marginLeft: 9, fontWeight: 600, fontSize: 14 }}>
            {name}
          </div>
        </div>
        <span
        onClick={()=>dispatch(setDefalultSettings())}
          style={{ marginRight: 5, width: 15, position: 'relative', top: 2 }}
        >
          <Icon backdrop={false} source={RefreshMajor} color="base" />
        </span>
      </div>
      {name === 'Layout Settings' && <LayoutSettings/>}
      {name === 'Heading Settings' && <HeadingSettings/>}
      {name === 'Item Settings' && <ItemSettings/>}
      {name === 'Popup Settings' && <PopupSettings/>}
      {name === 'Shoppable Settings' && <ShoppableSettings/>}
    </div>
  )
}
