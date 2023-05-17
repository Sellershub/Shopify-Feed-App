import {
  Card,
  Page,
  Image,
  Stack,
  Button,
  DisplayText,
  Link,
} from '@shopify/polaris'
import React from 'react'
import { useState, useCallback } from 'react'
import Lottie from 'react-lottie'
//images
import { hello } from '../assets/home'
import { questionButton } from '../assets/home'
import animationData from '../lotties/hello.json'
//styles
import classes from '../style/index.module.css'

export default function HomePage() {
  const [active, setActive] = useState(false)

  const handleChange = useCallback(() => {
    setActive(!active)
  }, [active])
  // const handleChange = () => {
  //   setActive(!active);
  //   fetch(' https://54e247ce2d34.eu.ngrok.io',{
  //     mode: 'cors',
  //   }).then((data)=>{
  //     console.log('data',data)
  //   })
  // };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <>
      <div className={classes.container}>
        <Page fullWidth>
          <Card sectioned>
            <div style={{ height: '85vh' }}>
              <Stack alignment="center" distribution="fill" vertical>
                <div style={{ marginTop: 10,  }}>
                  <Lottie options={defaultOptions} height={400} width='100%' />
                </div>
                <DisplayText size="Large">
                  Hey, you have no connected{'\n'}
                  accounts yet!
                </DisplayText>

                <p style={{ marginBottom: 15 }}>
                  You need to connect you account to start widged creation
                </p>
                <Button onClick={handleChange} primary>
                  <Link removeUnderline monochrome url="/connectAccount">
                    <span style={{ color: 'fff' }}>Connect Account</span>
                  </Link>
                </Button>
              </Stack>
            </div>
          </Card>
          <div className={classes.questiionContainer}>
            <Image source={questionButton} alt="question " />
          </div>
        </Page>
      </div>
    </>
  )
}
