import React from "react";
import { Auth, Main, Settings, Setup, Contract, Onboarding } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function AppNavigator({ initialRoute, initialMainRoute }) {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={initialRoute}>
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="contract" component={Contract} />
      {/* New-account onboarding (Stream O). No swipe back into Terms. */}
      <Stack.Screen
        name="onboarding"
        component={Onboarding}
        options={{ gestureEnabled: false }}
      />
      {/* Legacy tracker setup: still reached from Settings and the macro goals modal. */}
      <Stack.Screen name="setup" component={Setup} />
      <Stack.Screen name="main">
        {(props) => <Main {...props} initialMainRoute={initialMainRoute} />}
      </Stack.Screen>
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
