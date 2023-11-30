import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import Step10 from "./Step10";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function Dietnavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"step1"}>
      <Stack.Screen name="step1" component={Step1} />
      <Stack.Screen name="step2" component={Step2} />
      <Stack.Screen name="step3" component={Step3} />
      <Stack.Screen name="step4" component={Step4} />
      <Stack.Screen name="step5" component={Step5} />
      <Stack.Screen name="step6" component={Step6} />
      <Stack.Screen name="step7" component={Step7} />
      <Stack.Screen name="step8" component={Step8} />
      <Stack.Screen name="step9" component={Step9} />
      <Stack.Screen name="step10" component={Step10} />
    </Stack.Navigator>
  );
}

export default Dietnavigator;
