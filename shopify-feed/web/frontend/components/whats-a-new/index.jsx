import {
  Button,
  Card,
  Grid,
  Modal,
  TextContainer,
  TextField,
} from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { subscriptionImage } from '../../assets/subscriptions'
import { freePlan, monthlyProPlan, yearlyProPlan } from '../../utils/data'
import { whatANews } from '../../utils/news'
import { News } from './news'

import styles from './styles.module.css'

export const WhatsANew = () => {
  const [active, setActive] = useState(false);
  const [feature, setFeature] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = useCallback(() => setActive(!active), [active])
  const handleChangeFeature = useCallback((e) => setFeature(e), [feature])
  const handleChangeEmail = useCallback((e) => setEmail(e), [email])
  const activator = (
    <Button size="large" onClick={handleChange}>
      Leave Feedback
    </Button>
  )
  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeadline}>What's new</h1>
      <div className={styles.content}>
        <Grid
          gap={{ md: '0', lg: '5', xl: '5' }}
          columns={{
            xs: 2,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
          }}
        >
          {whatANews.map((news) => {
            return <News key={news.id} news={news} />
          })}
        </Grid>
      </div>
      <div className={styles.footer}>
        <h2>Your opinion of us is important to us</h2>
        <Modal
          small={true}
          activator={activator}
          open={active}
          onClose={handleChange}
          title="How likely are you to recommend our service to a friend or colleague?"
        >
          <Modal.Section>
            <TextContainer>
              <TextField
                label="What feature can we add to improve?"
                autoComplete="off"
                multiline={4}
                onChange={handleChangeFeature}
                value={feature}
              />
              <TextField
                label="Email (optional)"
                autoComplete="off"
                multiline={4}
                onChange={handleChangeEmail}
                value={email}
              />
              <Button fullWidth={true} onClick={handleChange} primary={true}>Send feedback</Button>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    </div>
  )
}
