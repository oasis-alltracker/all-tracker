import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ComingSoon from "./ComingSoon";
import Contact from "./Contact";
import Goals from "./Goals";
import Tracks from "./Tracks";
import Personal from "./Personal";
import SettingsHome from "./SettingsHome";
import Units from "./Units";
import Notifications from "./Notifications/index";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"settingsHome"}>
      <Stack.Screen name="comingSoon" component={ComingSoon} />
      <Stack.Screen name="contact" component={Contact} />
      <Stack.Screen name="goals" component={Goals} />
      <Stack.Screen name="tracks" component={Tracks} />
      <Stack.Screen name="personal" component={Personal} />
      <Stack.Screen name="settingsHome" component={SettingsHome} />
      <Stack.Screen name="units" component={Units} />
      <Stack.Screen name="notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
