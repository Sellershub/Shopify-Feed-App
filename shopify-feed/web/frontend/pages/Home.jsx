import {
  Button,
  Card,
  Icon,
  Modal,
  Select,
  Tabs,
  TextContainer,
  TextField,
} from '@shopify/polaris'
import React, { useCallback, useState } from 'react'
import { Subscriptions } from '../components/subscriptions'
import { WhatsANew } from '../components/whats-a-new'
import { YourAccounts } from '../components/yourAccounts'
import { YourAlbums } from '../components/yourAlbums'
import { YourWidgets } from '../components/yourWidgets'
import styles from '../style/home.module.css'
import { homeTabs } from '../utils/data'
import { QuestionMarkMajor } from '@shopify/polaris-icons'

const options = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'lastWeek' },
]

export default function Home() {
  const [active, setActive] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')
  const [selected, setSelected] = useState(0)
  const [selectedTab, setSelectedTab] = useState('today')

  const handleChangeEmail = useCallback((e) => setEmail(e), [email])
  const handleChangeName = useCallback((e) => setName(e), [email])
  const handleChangeDetails = useCallback((e) => setDetails(e), [email])
  const handleChange = useCallback(() => setActive(!active), [active])
  const handleSelectTabChange = useCallback(
    (value) => setSelectedTab(value),
    [],
  )

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  )
  const activator = (
    <span className={styles.openBtn} onClick={handleChange}>
      <Icon source={QuestionMarkMajor} color="success" />
    </span>
  )
  return (
    <>
      <h1>OUR APPLICATION NAME</h1>
      <div className={styles.container}>
        <Card sectioned>
          <div className={styles.mainTabs}>
            <Tabs
              tabs={homeTabs}
              selected={selected}
              onSelect={handleTabChange}
            ></Tabs>
          </div>
          <div className={styles.content}>
            {selected === 0 && <YourWidgets />}
            {selected === 1 && <YourAlbums />}
            {selected === 2 && <YourAccounts />}
            {selected === 3 && <Subscriptions />}
            {selected === 4 && <WhatsANew />}
          </div>
        </Card>
        <Modal
          small={true}
          activator={activator}
          open={active}
          onClose={handleChange}
          title="Contact Customer Support"
        >
          <Modal.Section>
            <TextContainer>
              <TextField
                label="Name"
                autoComplete="off"
                onChange={handleChangeName}
                value={name}
              />
              <TextField
                label="Email"
                autoComplete="off"
                onChange={handleChangeEmail}
                value={email}
              />
                <Select
                  options={options}
                  onChange={handleSelectTabChange}
                  value={selectedTab}
                  label={''}
                />
              <TextField
                label="Additional details"
                autoComplete="off"
                multiline={4}
                onChange={handleChangeDetails}
                value={details}
              />
              <Button onClick={handleChange} fullWidth={true} primary={true}>
                Submit
              </Button>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </div>
    </>
  )
}
