import {
  ActionList,
  Button,
  Card,
  Frame,
  Icon,
  Loading,
  Popover,
} from '@shopify/polaris'
import React, { useCallback, useState, useEffect } from 'react'
import { createAlbum, deleteIcon } from '../../assets/albums'
import {
  MobileVerticalDotsMajor,
  EditMinor,
  DeleteMinor,
} from '@shopify/polaris-icons'
import styles from './styles.module.css'
import { addAccountIcon, instagramIcon } from '../../assets/ConnectAccount'
import { useDispatch, useSelector } from 'react-redux'
import { albumCreationSelector } from '../../redux/reducers/albumCreation'
import { useNavigate } from '@shopify/app-bridge-react'
import { ConnectAccount } from './connectAccount/ConnectAccount'
import {
  addWidgetIcon,
  createWidget,
  hiddenIcon,
  visibleIcon,
} from '../../assets/widgets'
import { widgetsSelector } from '../../redux/reducers/widgets'
import { accountsSelector } from '../../redux/reducers/accounts'

export const YourAccounts = () => {
  const [addAccount, setAddAccount] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [isEditing, setIsEditing] = useState('add')
  const { accounts, loader } = useSelector(accountsSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    // dispatch(getAllWidgets(userId))
  }, [addAccount])
  const handleNavigate = () => {
    setIsEditing('add')
    setAddAccount(true)
  }

  const AccountItem = ({
    setSelectedAccount,
    setIsEditing,
    setAddAccount,
    account,
  }) => {
    const { accountId } = account
    const [popoverActive, setPopoverActive] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    )
    const toggleHidden = useCallback(
      () => setIsHidden((popoverActive) => !popoverActive),
      [],
    )

    const actionsHandler = useCallback((val) => {
      setPopoverActive(false)
    }, [])

    const activator = (
      <div className={styles.selectDropdownIcon} onClick={togglePopoverActive}>
        <Icon source={MobileVerticalDotsMajor} color="base" />
      </div>
    )

    const editAccount = () => {
      setSelectedAccount(accountId)
      setIsEditing()
      setAddAccount()
    }
    const deleteAccountHandler = () => {
      // dispatch(deleteAlbum({userId, albumId}))
    }
    const popupItems = [
      {
        onAction: toggleHidden,
        suffix: (
          <div className={styles.edit}>
            {isHidden ? (
              <img src={hiddenIcon} alt="hiddenIcon" />
            ) : (
              <img src={visibleIcon} alt="visibleIcon" />
            )}
            <b>Paused</b>
          </div>
        ),
      },
      {
        onAction: editAccount,
        suffix: (
          <div className={styles.edit}>
            <Icon source={EditMinor} color="base" />
            <b>Edit</b>
          </div>
        ),
      },
      {
        onAction: deleteAccountHandler,
        suffix: (
          <div className={styles.delete}>
            <img src={deleteIcon} alt="deleteIcon" />
            <b>Delete</b>
          </div>
        ),
      },
    ]

    return (
      <div className={styles.item}>
        <div>
          <div className={styles.nameContainer}>
            <h2 className={styles.itemHeadline}>Name_account</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div onClick={toggleHidden} className={styles.visibleIcon}>
                {isHidden ? (
                  <img src={hiddenIcon} alt="hiddenIcon" />
                ) : (
                  <img src={visibleIcon} alt="visibleIcon" />
                )}
              </div>
              <Popover
                active={popoverActive}
                activator={activator}
                autofocusTarget="none"
                onClose={togglePopoverActive}
              >
                <ActionList
                  onActionAnyItem={actionsHandler}
                  actionRole="menuitem"
                  items={popupItems}
                />
              </Popover>
            </div>
          </div>
          <div className={styles.accountContainer}>
            <img width={20} src={instagramIcon} alt="instagramIcon" />
            <span>@instagram_account</span>
          </div>
        </div>

        <div className={styles.statistics}>
          <div>
            <span>Total items</span>
            <span>728</span>
          </div>
          <div>
            <span>In album</span>
            <span>21</span>
          </div>
          <div>
            <span>Schedule</span>
            <span>Daily</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {addAccount ? (
        <ConnectAccount
          selectedAccount={selectedAccount}
          isEditing={isEditing}
          goBack={() => setAddAccount(false)}
        />
      ) : (
        <div>
          {loader ? (
            <Frame>
              <Loading />
            </Frame>
          ) : (
            <>
              <h2 className={styles.headline}>Your Accounts</h2>
              <div className={styles.itemsContainer}>
                <div
                  onClick={handleNavigate}
                  style={{ cursor: 'pointer' }}
                  className={styles.item}
                >
                  <img src={addAccountIcon} alt="addAccountIcon" />
                  <h2 className={styles.itemHeadline}>Add New Account</h2>
                </div>
                {[0, 1].map((account) => {
                  return (
                    <AccountItem
                      setSelectedAccount={setSelectedAccount}
                      setIsEditing={() => setIsEditing('edit')}
                      setAddAccount={() => setAddAccount(true)}
                      key={account?.widgetId}
                      account={account}
                    />
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
