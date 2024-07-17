import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SleepStep1 from "./sleepQuestionnaire/SleepStep1";
import SleepStep2 from "./sleepQuestionnaire/SleepStep2";
import SleepStep3 from "./sleepQuestionnaire/SleepStep3";
import SleepStep4 from "./sleepQuestionnaire/SleepStep4";
import SleepStep5 from "./sleepQuestionnaire/SleepStep5";
import SleepStep6 from "./sleepQuestionnaire/SleepStep6";
const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function SleepNavigator(props) {
  return (
    <Stack.Navigator
      dateStampNotif={props}
      screenOptions={options}
      initialRouteName={"sleepTest"}
    >
      <Stack.Screen name="sleepStep1">
        {(props) => (
          <SleepStep1
            {...props}
            dateStampNotif={props.route.params?.dateStamp}
            dateStringNotif={props.route.params?.dateString}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="sleepStep2" component={SleepStep2} />
      <Stack.Screen name="sleepStep3" component={SleepStep3} />
      <Stack.Screen name="sleepStep4" component={SleepStep4} />
      <Stack.Screen name="sleepStep5" component={SleepStep5} />
      <Stack.Screen name="sleepStep6" component={SleepStep6} />
    </Stack.Navigator>
  );
}

export default SleepNavigator;
