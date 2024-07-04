import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Contact from "./Contact";
import Goals from "./Goals";
import SettingsHome from "./SettingsHome";
import Notifications from "./Notifications/index";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"settingsHome"}>
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="goals" component={Goals} />

      <Stack.Screen name="settingsHome" component={SettingsHome} />
      <Stack.Screen name="notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
