/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import AppContainer from './navigation/AppNavigation'
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'react-native'
import { extendTheme, DNProvider } from 'dopenative'
import InstamobileTheme from './theme'

console.disableYellowBox = true

const App = () => {
  const theme = extendTheme(InstamobileTheme)
  enableScreens()

  return (
    <Provider store={store}>
      <DNProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <AppContainer />
      </DNProvider>
    </Provider>
  )
}

export default App
