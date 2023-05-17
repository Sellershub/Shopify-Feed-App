import { Card } from '@shopify/polaris'
import React from 'react'
import { subscriptionImage } from '../../assets/subscriptions'
import { freePlan, monthlyProPlan, yearlyProPlan } from '../../utils/data'
import { Plan } from './plan'

import styles from './styles.module.css'

export const Subscriptions = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeadline}>Subscriptions</h1>
      <div className={styles.subscriptionsContainer}>
          <div className={styles.currentPlanContainer}>
            <img src={subscriptionImage} alt="subscriptionImage"/>
            <span className={styles.currentPlanTitle}>Current plan: Free</span>
            <ul className={styles.list}>
              <li className={styles.elem}>
                <span className={styles.elemLabel}>Accounts:</span>
                <span className={styles.elemValue}>2/5</span>
              </li>
              <li className={styles.elem}>
                <span className={styles.elemLabel}>Widgets:</span>
                <span className={styles.elemValue}>4/9</span>
              </li>
              <li className={styles.elem}>
                <span className={styles.elemLabel}>Albums:</span>
                <span className={styles.elemValue}>5/10</span>
              </li>
              <li className={styles.elem}>
                <span className={styles.elemLabel}>Monthly views:</span>
                <span className={styles.elemValue}>78/148</span>
              </li>
              <li className={styles.elem}>
                <span className={styles.elemLabel}>Watermark:</span>
                <span className={styles.elemValue}>ON</span>
              </li>
            </ul>
          </div>
        <Plan
          isPro={false}
          extraInfo="Monthly 148 pages views"
          isPrimary={false}
          price="Free"
          data={freePlan}
          name="Free plan"
          description="Free plan will include a lot of features but with some restrictions"
        />
        <Plan
          isPro={true}
          extraInfo="14 day free trial"
          isPrimary={false}
          price="$9.99/monthly"
          data={monthlyProPlan}
          name="Monthly Pro Plan"
          description="Paid plan will contain extensions
          to free features"
        />
        <Plan
          isPro={true}
          extraInfo="20% Off"
          isPrimary={true}
          price="$8.99/monthly"
          data={yearlyProPlan}
          name="Yearly Pro Plan"
          description="Paid plan will contain extensions to free
          features"
        />
      </div>
    </div>
  )
}
