import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectTrackers from "./SelectTrackers";
import ExplainSubscription from "./ExplainSubscription";
import Agreement from "./Habits";
import Habits from "./Habits";
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
      <Stack.Screen name="agreement" component={Agreement} />
      <Stack.Screen name="diet" component={Diet} />
      <Stack.Screen name="fitness" component={Fitness} />
      <Stack.Screen name="sleep" component={Sleep} />
      <Stack.Screen name="mood" component={Mood} />
      <Stack.Screen name="habits" component={Habits} />
      <Stack.Screen name="todos" component={Todos} />
    </Stack.Navigator>
  );
}

export default SetupNavigator;
