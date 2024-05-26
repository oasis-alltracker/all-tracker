import React from "react";
import {
  Auth,
  Landing,
  Main,
  Settings,
  Setup,
  Contract,
  SleepQuestionnaire,
  MoodQuestionnaire,
} from "../screens";
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
      <Stack.Screen name="sleepTest" component={SleepQuestionnaire} />
      <Stack.Screen name="moodTest" component={MoodQuestionnaire} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
