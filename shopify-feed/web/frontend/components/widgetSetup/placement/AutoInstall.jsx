import { Card, Image } from '@shopify/polaris'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { choosePosition, widgetSetupSelector } from '../../../redux/reducers/widgetSetup'
import { positionData } from '../../../utils/data'
import styles from './styles.module.css'

export const AutoInstall = () => {
  const dispatch = useDispatch()
  const { settings } = useSelector(widgetSetupSelector)
  const { position } = settings;
  const handleActivePlan = useCallback((id) => {
    dispatch(choosePosition(id))
  }, [])
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Choose Position</h2>
      <div className={styles.positionsContainer}>
        <h3 className={styles.smallHeadline}>
          Select where you want to place your widget
        </h3>
        <div className={styles.positions}>
          {positionData.map((pos) => {
            return (
              <div className={styles.positionItem} key={pos.id}>
                <div onClick={() => handleActivePlan(pos.id)}>
                  <Card subdued>
                    <div
                      style={{
                        border:
                          position == pos.id
                            ? '1.5px solid green'
                            : '1.5px solid transparent',
                        borderRadius: 4,
                      }}
                    >
                      <Image
                        color="#fff"
                        style={{ cursor: 'pointer' }}
                        source={pos.src}
                        alt={pos.headline}
                      />
                    </div>
                  </Card>
                  <h3 className={styles.positionHeadline}>{pos.headline}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
