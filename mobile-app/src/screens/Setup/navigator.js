import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectTrackers from "./SelectTrackers";
import ExplainSubscription from "./ExplainSubscription";
import HabitsCreation from "./Habits/step1";
import HabitsNotifications from "./Habits/step2";
import Todos from "./Todos";
import Diet from "./Diet/navigator";
import Fitness from "./Fitness/navigator";
import Sleep from "./Sleep/navigator";
import Mood from "./Mood";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function SetupNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"setup"}>
      <Stack.Screen name="selectTrackers" component={SelectTrackers} />
      <Stack.Screen
        name="explainsubscription"
        component={ExplainSubscription}
      />
      <Stack.Screen name="diet" component={Diet} />
      <Stack.Screen name="fitness" component={Fitness} />
      <Stack.Screen name="sleep" component={Sleep} />
      <Stack.Screen name="mood" component={Mood} />
      <Stack.Screen
        name="habitsNotifications"
        component={HabitsNotifications}
      />
      <Stack.Screen name="habitsCreation" component={HabitsCreation} />
      <Stack.Screen name="todos" component={Todos} />
    </Stack.Navigator>
  );
}

export default SetupNavigator;
