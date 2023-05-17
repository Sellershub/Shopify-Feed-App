import { Icon } from '@shopify/polaris'
import React, {  useState } from 'react'
import styles from './styles.module.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { DuplicateMinor, MobileAcceptMajor } from '@shopify/polaris-icons'

export const Manual = () => {
  const [copied, setCopied] = useState(false)
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Code for custom installation</h2>
      <div className={styles.positionsContainer}>
        <h4 className={styles.smallHeadline}>
          Select where you want to place your widget
        </h4>
        {copied ? (
          <div className={styles.copyContainerCopied}>
            <span>Code copied</span>
            <Icon source={MobileAcceptMajor} color="base" />
          </div>
        ) : (
          <CopyToClipboard text="code" onCopy={() => setCopied(true)}>
            <div className={styles.copyContainer}>
              <span>Copy Custom code in buffer</span>
              <Icon source={DuplicateMinor} color="base" />
            </div>
          </CopyToClipboard>
        )}
      </div>
    </div>
  )
}
