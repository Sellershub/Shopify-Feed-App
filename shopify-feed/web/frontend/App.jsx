import { BrowserRouter } from 'react-router-dom'
import { NavigationMenu } from '@shopify/app-bridge-react'
import Routes from './Routes'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import './styles.css'

import { AppBridgeProvider, QueryProvider, PolarisProvider } from './components'
import React, { useEffect } from 'react'
import axios from 'axios'
import { NGROK_TUNNEL } from './Constants'

export default function App() {
  useEffect(() => {
    axios
  .get(`${NGROK_TUNNEL}/api/shopify/auth`)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("userId", data)
        return data
      })
      .catch((err) => console.log('err', err))
  }, [])
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager('./pages/**/!(*.test.[jt]sx)*.([jt]sx)')

  return (
    <PolarisProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppBridgeProvider>
            <QueryProvider>
              <NavigationMenu
                navigationLinks={[
                  {
                    label: 'Page name',
                    destination: '/pagename',
                  },
                ]}
              />
              <Routes pages={pages} />
            </QueryProvider>
          </AppBridgeProvider>
        </BrowserRouter>
      </Provider>
    </PolarisProvider>
  )
}
