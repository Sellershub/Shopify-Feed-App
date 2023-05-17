import { TextField } from '@shopify/polaris'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'

export const TextInput = ({text, placeholder}) => {
  const [value, setValue] = useState(text) 
  const changeTextHandler = useCallback((text)=>setValue(text),[])
  return (
    <TextField
            value={value}
            onChange={changeTextHandler}
            autoComplete="off"
            placeholder={placeholder}/>
  )
}
