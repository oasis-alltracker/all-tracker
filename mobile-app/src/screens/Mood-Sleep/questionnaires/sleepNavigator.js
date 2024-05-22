import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SleepStep1 from "./sleepQuestionnaire/SleepStep1";
import SleepStep2 from "./sleepQuestionnaire/SleepStep2";
import SleepStep3 from "./sleepQuestionnaire/SleepStep3";
import SleepStep4 from "./sleepQuestionnaire/SleepStep4";
import SleepStep5 from "./sleepQuestionnaire/SleepStep5";
const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function SetupNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"sleepStep1"}>
      <Stack.Screen name="sleepStep1" component={SleepStep1} />
      <Stack.Screen name="sleepStep2" component={SleepStep2} />
      <Stack.Screen name="sleepStep3" component={SleepStep3} />
      <Stack.Screen name="sleepStep4" component={SleepStep4} />
      <Stack.Screen name="sleepStep5" component={SleepStep5} />
    </Stack.Navigator>
  );
}

export default SetupNavigator;
