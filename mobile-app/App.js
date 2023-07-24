/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import AppContainer from './src/navigation/AppNavigation'
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'react-native'
import { extendTheme, DNProvider  } from 'dopenative'
import AppTheme from './theme'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';

function App() {
  
  const theme = extendTheme(AppTheme)
  enableScreens()

  const [fontsLoaded] = useFonts({
    'Segoe': require('./src/assets/fonts/segoesc.ttf'),
    'Segoe_bold': require('./src/assets/fonts/segoesc_bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <DNProvider theme={theme}>
        <RootSiblingParent>
          <StatusBar barStyle="dark-content" />
          <AppContainer />
        </RootSiblingParent>
      </DNProvider>
    </Provider>
  );
}

export default App;
