import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigators";
import navigationService from "./src/navigators/navigationService";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { getAccessToken, isLoggedIn, logout } from "./src/user/keychain";
import UserAPI from "./src/api/user/userAPI";

export default function App() {
  const [fontsLoaded] = useFonts({
    Sego: require("./src/assets/fonts/segoesc.ttf"),
    "Sego-Bold": require("./src/assets/fonts/segoesc_bold.ttf"),
  });
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("landing");

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      if (await isLoggedIn()) {
        const accessToken = await getAccessToken();
        try{
          const { status: status, data: userData } = await UserAPI.getUser(
            accessToken
          );
          if(userData){
            if (userData["isSetupComplete"]) {
              setInitialRoute("main");
            } else {
              setInitialRoute("setup");
            }
          }
          else{
            logout();
          }
        }
        catch(e){
          logout();
        }

      }
      setLoading(false);
    };

    checkIsLoggedIn();
  }, [loading]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar translucent backgroundColor="transparent" />
        <PersistGate loading={null} persistor={persistor}>
          {loading ? (
            <ActivityIndicator
              color={"#3097E7"}
              size={"large"}
              style={{ ...StyleSheet.absoluteFillObject, zIndex: 1 }}
            />
          ) : (
            <NavigationContainer ref={navigationService._navigator}>
              <AppNavigator initialRoute={initialRoute} />
            </NavigationContainer>
          )}
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
