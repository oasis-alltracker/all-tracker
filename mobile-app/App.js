/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState, useRef} from 'react'
import AppContainer from './src/navigation/AppNavigation'
import { enableScreens } from 'react-native-screens'
import { StatusBar } from 'react-native'
import { extendTheme, DNProvider  } from 'dopenative'
import AppTheme from './theme'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
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

export async function schedulePushNotification(title, body, trigger) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: trigger
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export async function cancelPushNotification(identifier) {
  await Notifications.cancelScheduledNotificationAsync(identifier);
}

export async function cancelAllPushNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
