import { Image } from '@shopify/polaris'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chooseTemplate, widgetSetupSelector } from '../../../redux/reducers/widgetSetup'
import { desctopData } from '../../../utils/data'
import styles from './styles.module.css'


export const Desktop = () => {
  const {settings} = useSelector(widgetSetupSelector);
  const {selectedTemplate} = settings
  const dispatch = useDispatch()
  const handleActivePlan = (name) => {
    dispatch(chooseTemplate(name))

  }

  return (
    <div className={styles.container}>
      <h3 className={styles.chooseTemplateTxt}>Choose widget template</h3>
      <div className={styles.widgetContainer}>
        {desctopData.map((template) => {
          return (
            <div
              key={template.id}
              className={styles.widgetItem}
              onClick={() => handleActivePlan(template.headline)}
            >
              <Image
                color="#fff"
                style={{borderRadius: 4 , border: selectedTemplate === template.headline ? '1px solid black' : '1px solid transparent', cursor: 'pointer'}}

                source={template.src}
                alt={template.headline}
              />

              <div className={styles.text}>{template.headline}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
