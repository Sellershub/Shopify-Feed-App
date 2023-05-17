import { Frame, Grid, Loading } from '@shopify/polaris'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { albumsSelector } from '../../../redux/reducers/albums'
import {
  getAlbumForWidget,
  widgetSetupSelector,
} from '../../../redux/reducers/widgetSetup'
import classes from '../../../style/widgetSetup.module.css'
import { PopupShoppable } from './popupShoppable'
import { WidgetMediaItem } from './widgetMediaItem'

export const Widget = ({ step }) => {
  const { loader, widget, settings } = useSelector(widgetSetupSelector)
  const { albumsOptions } = useSelector(albumsSelector)
  const { position, device, layout, heading, selectedSettings } = settings
  const { columns, mobileColumns, backgroundColor } = layout
  const { enableTitle, enableDescription, enableButton } = heading
  const dispatch = useDispatch()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (albumsOptions.length > 0) {
      dispatch(getAlbumForWidget({ albumId: albumsOptions[0].value, userId }))
    }
  }, [albumsOptions])
  return (
    <div
      className={classes.widgetContainer}
      style={{
        backgroundColor: backgroundColor,
        maxWidth: device === 0 ? 1000 : 340,
      }}
    >
      {enableTitle && (
        <h2 className={classes.followHeadline}>Follow us on Instagram</h2>
      )}
      {enableDescription && (
        <h3 className={classes.description}>
          Follow us, so you will never miss on update
        </h3>
      )}

      {loader ? (
        <Frame>
          <Loading />
        </Frame>
      ) : (
        <>
          {position == 2 && step === 3 && (
            <div className={classes.bigBlock}></div>
          )}
          {position == 3 && step === 3 && (
            <div className={classes.smallBlock}></div>
          )}
          {selectedSettings !== 'Popup Settings' &&
          selectedSettings !== 'Shoppable Settings' ? (
            <Grid
              gap={{ md: '0', lg: '0', xl: '0' }}
              columns={{
                xs: device ? mobileColumns : columns,
                sm: device ? mobileColumns : columns,
                md: device ? mobileColumns : columns,
                lg: device ? mobileColumns : columns,
                xl: device ? mobileColumns : columns,
              }}
            >
              {Boolean(widget) &&
                widget.map((media) => {
                  return media?.media_url ? (
                    <WidgetMediaItem key={media.id} media={media} />
                  ) : (
                    <div style={{ width: '140px', height: '140px' }}></div>
                  )
                })}
            </Grid>
          ) : (
            <PopupShoppable />
          )}

          {position == 1 && step === 3 && (
            <div className={classes.bigBlock}></div>
          )}
          {position == 3 && step === 3 && (
            <div className={classes.smallBlock}></div>
          )}
        </>
      )}
    </div>
  )
}
