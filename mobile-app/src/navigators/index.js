import React from "react";
import { Auth, Landing, Main, Settings, Setup, Contract } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function AppNavigator({ initialRoute }) {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={initialRoute}>
      <Stack.Screen name="landing" component={Landing} />
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="contract" component={Contract} />
      <Stack.Screen name="setup" component={Setup} />
      <Stack.Screen name="main" component={Main} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
