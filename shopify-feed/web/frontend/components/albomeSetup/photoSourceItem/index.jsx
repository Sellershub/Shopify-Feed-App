import { Image, Select } from '@shopify/polaris'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { editIcon, plusIcon } from '../../../assets/albums'
import classes from '../../../style/albumSetup.module.css'

const options = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'lastWeek' },
]

export const PhotoSourceItem = ({ item, index, setAccounts, lastIndex }) => {
  const [selected, setSelected] = useState('today')
  const handleSelectChange = useCallback((value) => setSelected(value), [])
  return (
    <div
      key={item.name}
      style={{ display: 'flex', height: '36px', margin: '8px' }}
    >
      <div className={classes.select}>
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selected}
          label={''}
        />
      </div>
      {index === lastIndex ? (
        <div
          className={classes.addButon}
          onClick={() =>
            setAccounts((prev) => [
              ...prev,
              { label: `${index}`, value: `${Math.random()}` },
            ])
          }
        >
          <div className={classes.plusIcon}>
            <Image source={plusIcon} alt="PlusIcon" />
          </div>
        </div>
      ) : (
        <div
          onClick={() =>
            setAccounts((prev) => {
              const arr = prev.filter((el) => el.value !== item.value)
              return arr
            })
          }
          className={classes.addButon}
        >
          <div className={classes.editIcon}>
            <Image source={editIcon} alt="PlusIcon" />
          </div>
        </div>
      )}
    </div>
  )
}
