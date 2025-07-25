import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SelectTrackers from "./SelectTrackers/SelectTrackers";
import ExplainSubscription from "./Subscriptions/ExplainSubscription";
import HabitsCreation from "./Habits/step1";
import HabitsNotifications from "./Habits/step2";
import Todos from "./Tasks/Todos";
import GoalSelection from "./Diet/GoalSelection";
import TargetWeight from "./Diet/TargetWeight";
import CurrentWeight from "./Diet/CurrentWeight";
import BirthYearInput from "./Diet/BirthYearInput";
import HeightInput from "./Diet/HeightInput";
import ActivityLevelSelection from "./Diet/ActivityLevelSelection";
import IntensitySelection from "./Diet/IntensitySelection";
import NewGoalsSummary from "./Diet/NewGoalsSummary";
import DietNotifications from "./Diet/DietNotifications";
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
      <Stack.Screen name="goalSelection" component={GoalSelection} />
      <Stack.Screen name="targetWeight" component={TargetWeight} />
      <Stack.Screen name="currentWeight" component={CurrentWeight} />
      <Stack.Screen name="birthYearInput" component={BirthYearInput} />
      <Stack.Screen name="heightInput" component={HeightInput} />
      <Stack.Screen
        name="activityLevelSelection"
        component={ActivityLevelSelection}
      />
      <Stack.Screen name="intensitySelection" component={IntensitySelection} />
      <Stack.Screen name="newGoalsSummary" component={NewGoalsSummary} />
      <Stack.Screen name="dietNotifications" component={DietNotifications} />

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
