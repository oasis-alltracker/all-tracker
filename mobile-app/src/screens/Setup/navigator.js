import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectTrackers from "./SelectTrackers/SelectTrackers";
import ExplainSubscription from "./Subscriptions/ExplainSubscription";
import HabitsCreation from "./Habits/step1";
import HabitsNotifications from "./Habits/step2";
import Todos from "./Tasks/Todos";
import DietStep1 from "./Diet/Step1";
import DietStep3 from "./Diet/Step3";
import DietStep2 from "./Diet/Step2";
import DietStep5 from "./Diet/Step5";
import DietStep4 from "./Diet/Step4";
import DietStep6 from "./Diet/Step6";
import DietStep7 from "./Diet/Step7";
import DietStep8 from "./Diet/Step8";
import DietStep9 from "./Diet/Step9";
import FitnessStep1 from "./Fitness/Step1";
import FitnessStep2 from "./Fitness/Step2";
import SleepStep1 from "./Sleep/Step1";
import SleepStep2 from "./Sleep/Step2";
import Mood from "./Mood/Mood";
import SetupFlow from "./SelectTrackers/SetupFlow";

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
      <Stack.Screen name="dietStep1" component={DietStep1} />
      <Stack.Screen name="dietStep2" component={DietStep2} />
      <Stack.Screen name="dietStep3" component={DietStep3} />
      <Stack.Screen name="dietStep4" component={DietStep4} />
      <Stack.Screen name="dietStep5" component={DietStep5} />
      <Stack.Screen name="dietStep6" component={DietStep6} />
      <Stack.Screen name="dietStep7" component={DietStep7} />
      <Stack.Screen name="dietStep8" component={DietStep8} />
      <Stack.Screen name="dietStep9" component={DietStep9} />
      <Stack.Screen name="fitness" component={FitnessStep1} />
      <Stack.Screen name="fitnessStep2" component={FitnessStep2} />
      <Stack.Screen name="sleep" component={SleepStep1} />
      <Stack.Screen name="sleepStep2" component={SleepStep2} />
      <Stack.Screen name="mood" component={Mood} />
      <Stack.Screen
        name="habitsNotifications"
        component={HabitsNotifications}
      />
      <Stack.Screen name="habitsCreation" component={HabitsCreation} />
      <Stack.Screen name="todos" component={Todos} />
      <Stack.Screen name="setupFlow" component={SetupFlow} />
    </Stack.Navigator>
  );
}

export default SetupNavigator;
