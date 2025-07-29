import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Contact from "./Contact";
import SettingsHome from "./SettingsHome";
import Notifications from "./Notifications/index";
import ExplainSubscription from "../Setup/Subscriptions/ExplainSubscription";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"settingsHome"}>
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="support" component={ExplainSubscription} />

      <Stack.Screen name="settingsHome" component={SettingsHome} />
      <Stack.Screen name="notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
