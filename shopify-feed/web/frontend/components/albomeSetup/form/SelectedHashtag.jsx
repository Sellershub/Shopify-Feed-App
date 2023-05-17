import { Tag, TextField } from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { selectHideAll } from '../../../redux/reducers/albumCreation'
import classes from '../../../style/albumSetup.module.css'

export const SelectedHashtag = () => {
  const [tags, setTags] = useState([])
  const [pendingTags, setPendingTags] = useState('')
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const removeTag = useCallback(
    (tag) => () => {
      setTags((prev) => prev.filter((prevTag) => prevTag !== tag))
      dispatch(
        selectHideAll({
          type: 'tags',
          tags: [tags.filter((prevTag) => prevTag !== tag)],
        }),
      )
    },
    [],
  )
  const handleChange = (value) => {
    setValue(value)
    const lastChar = value.charAt(value.length - 1)
    setPendingTags(value)
  }

  const handleKeyPress = (event) => {
    const enterKeyPressed = event.keyCode === 13
    if (enterKeyPressed && !tags.includes(pendingTags).tr) {
      event.preventDefault()
      setTags((prev) => [...prev, pendingTags])
      dispatch(selectHideAll({ type: 'tags', tags: [...tags, pendingTags] }))
      setValue('')
    }
  }

  return (
    <div>
      <p className={classes.paragraph}>
        Write hashtags # which you want to be included to this album
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {tags.map((item) => {
          return (
            <div key={item} style={{ padding: 6 }}>
              <Tag onRemove={removeTag(item)} key={item}>
                #{item}
              </Tag>
            </div>
          )
        })}
      </div>
      <div>
        <div
          style={{ paddingTop: 5, paddingBottom: 5 }}
          onKeyDown={handleKeyPress}
        >
          <TextField value={value} onChange={handleChange} />
        </div>
        <p className={classes.paragraph}>
          The album will include photos with selected hashtags
        </p>
      </div>
    </div>
  )
}
