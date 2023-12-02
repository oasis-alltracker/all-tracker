import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Step1 from "./Step1";
import Step2 from "./Step2";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function FitnessNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"step1"}>
      <Stack.Screen name="step1" component={Step1} />
      <Stack.Screen name="step2" component={Step2} />
    </Stack.Navigator>
  );
}

export default FitnessNavigator;
