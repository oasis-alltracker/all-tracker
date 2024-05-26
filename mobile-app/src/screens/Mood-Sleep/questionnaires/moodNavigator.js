import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WellnessStep1 from "./wellnessQuestionnaire/WellnessStep1";
import WellnessStep2 from "./wellnessQuestionnaire/WellnessStep2";
import WellnessStep3 from "./wellnessQuestionnaire/WellnessStep3";
import WellnessStep4 from "./wellnessQuestionnaire/WellnessStep4";
import WellnessStep5 from "./wellnessQuestionnaire/WellnessStep5";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function MoodNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"moodTest"}>
      <Stack.Screen name="moodStep1" component={WellnessStep1} />
      <Stack.Screen name="moodStep2" component={WellnessStep2} />
      <Stack.Screen name="moodStep3" component={WellnessStep3} />
      <Stack.Screen name="moodStep4" component={WellnessStep4} />
      <Stack.Screen name="moodStep5" component={WellnessStep5} />
    </Stack.Navigator>
  );
}

export default MoodNavigator;
