import { Button, ButtonGroup, Card, Icon } from '@shopify/polaris'
import React from 'react'
import { MobileAcceptMajor, MobileCancelMajor } from '@shopify/polaris-icons'
import styles from './styles.module.css'

export const Plan = ({ name, description, data, price, isPrimary, extraInfo, isPro }) => {
  return (
    <Card sectioned>
      <div className={styles.container}>
        {
          isPro && <span className={styles.pro}>PRO</span>
        }
        <h3 className={styles.mainHeadline}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.line} />
        <ul className={styles.list}>
          {data.map((elem) => {
            return (
              <li className={styles.elem} key={elem.name}>
                {elem.checked ? (
                  <Icon source={MobileAcceptMajor} color="success" />
                ) : (
                  <Icon source={MobileCancelMajor} color="subdued" />
                )}
                <div className={styles.name}>{elem.name}</div>
              </li>
            )
          })}
        </ul>
          <Button size='large' primary={isPrimary}>
            {price}
          </Button>   
          <h4 className={styles.extraInfo}>{extraInfo}</h4>  
      </div>
    </Card>
  )
}
