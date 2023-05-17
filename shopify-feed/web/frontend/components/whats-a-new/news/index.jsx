import { Button, ButtonGroup, Card } from '@shopify/polaris'
import React from 'react'
import { flagIcon } from '../../../assets/whatsANew'
import styles from './styles.module.css'

export const News = ({ news }) => {
  const { title, description, date, img } = news
  return (
      <div className={styles.container}>
        <img className={styles.img} src={img} alt={title} />
        <div className={styles.titleContainer}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.description}>{description}</h3>
          </div>
          <img className={styles.flag} src={flagIcon} alt="flag"/>
        </div>
        <div className={styles.footer}>
          <Button size="large">Read more</Button>
          <h4 className={styles.date}>{date}</h4>
        </div>
      </div>
  )
}
