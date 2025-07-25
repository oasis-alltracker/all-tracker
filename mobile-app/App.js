import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigators";
import navigationService from "./src/navigators/navigationService";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { ActivityIndicator, StyleSheet, Platform, Alert } from "react-native";
import { getAccessToken, isLoggedIn, logout } from "./src/user/keychain";
import { Settings } from "react-native-fbsdk-next";
import UserAPI from "./src/api/user/userAPI";
import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import Purchases from "react-native-purchases";
import { Toaster } from "react-native-customizable-toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FullWindowOverlay } from "react-native-screens";

export default function App() {
  const [fontsLoaded] = useFonts({
    Sego: require("./src/assets/fonts/segoesc.ttf"),
    "Sego-Bold": require("./src/assets/fonts/segoesc_bold.ttf"),
  });
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [initialRoute, setInitialRoute] = useState("auth");
  const [initialMainRoute, setInitialMainRoute] = useState("mainscreen");

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const showAlert = () => {
    Alert.alert(
      "Internet Connection",
      "You are offline. Some features may not be available."
    );
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((event) => {
        if (event.notification.request.content.title === "Habit Journal") {
          setInitialMainRoute("todos-habits");
        } else if (
          event.notification.request.content.title === "Task Reminder"
        ) {
          setInitialMainRoute("todos-habits");
        } else if (
          event.notification.request.content.title === "Wellness check-in"
        ) {
          setInitialMainRoute("mood-sleep");
        } else if (
          event.notification.request.content.title === "Sleep review"
        ) {
          setInitialMainRoute("mood-sleep");
        } else if (
          event.notification.request.content.title === "Bedtime reminder"
        ) {
          setInitialMainRoute("mood-sleep");
        }
      });

    Settings.initializeSDK();

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      if (await isLoggedIn()) {
        const accessToken = await getAccessToken();
        try {
          const { status: status, data: userData } = await UserAPI.getUser(
            accessToken
          );
          if (userData) {
            if (userData["isSetupComplete"]) {
              setInitialRoute("main");
            } else {
              setInitialRoute("auth");
            }
          } else {
            logout();
          }
        } catch (e) {
          logout();
        }
      }
      setLoading(false);
    };

    if (Platform.OS === "android") {
      Purchases.configure({ apiKey: "goog_qebjpCbePNjgIZTDmsuXLciQyyt" });
    } else if (Platform.OS === "ios") {
      Purchases.configure({ apiKey: "appl_UOmgvrKMTaUIkAHVZouJukEKHLQ" });
    }
    checkIsLoggedIn();
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        showAlert();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Provider store={store}>
          <StatusBar translucent backgroundColor="transparent" />
          <PersistGate loading={null} persistor={persistor}>
            {loading || !isConnected ? (
              <ActivityIndicator
                color={"#3097E7"}
                size={"large"}
                style={{ ...StyleSheet.absoluteFillObject, zIndex: 1 }}
              />
            ) : (
              <NavigationContainer ref={navigationService._navigator}>
                <AppNavigator
                  initialRoute={initialRoute}
                  initialMainRoute={initialMainRoute}
                />
              </NavigationContainer>
            )}
          </PersistGate>
          <FullWindowOverlay>
            <Toaster />
          </FullWindowOverlay>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
