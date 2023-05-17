import React from 'react'
import { useSelector } from 'react-redux'
import { widgetSetupSelector } from '../../../../redux/reducers/widgetSetup'
import styles from './widgetMedia.module.css'

export const WidgetMediaItem = ({ media }) => {
  const { settings } = useSelector(widgetSetupSelector)
  const { layout, items } = settings
  const { padding, borderRadius } = layout
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
    <div className={enableHover ? styles.containerHovered : styles.container}>
      {media.media_type === 'IMAGE' ? (
        <img
          style={{ borderRadius: `${borderRadius}px`, padding: `${padding}px` }}
          className={styles.media}
          width={'100%'}
          src={media?.media_url}
        />
      ) : (
        <video
          style={{ borderRadius: `${borderRadius}px`, padding: `${padding}px` }}
          className={styles.media}
          width={'100%'}
          height="auto"
          controls
        >
          <source src={media?.media_url} type="video/mp4" />
        </video>
      )}
      <div
        style={{
          backgroundColor: backgroundColor,
          opacity: opacity / 100,
          borderRadius: `${borderRadius}px`,
        }}
        className={styles.hoverContainer}
      >
        {caption && (
          <h3
            style={{
              color: color,
              textAlign: textAlign,
              fontSize: `${textSize}px`,
              fontWeight: textWeight,
            }}
            className={styles.caption}
          >
            Lorem Ipsum is simply dummy text of the...
          </h3>
        )}
      </div>
    </div>
  )
}
