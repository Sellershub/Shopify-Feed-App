import React from 'react'
import { useSelector } from 'react-redux'
import { widgetSetupSelector } from '../../../../redux/reducers/widgetSetup'
import { Desktop } from './Desktop'
import { Mobile } from './Mobile'

export const PopupShoppable = () => {
  const { settings } = useSelector(widgetSetupSelector)
  const { device } = settings
  
  return (
    <>{
      device ? <Mobile/> : <Desktop/> 
    }</>
  )
}
