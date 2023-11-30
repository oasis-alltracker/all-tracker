import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnterEmail from "./EnterEmail";
import EnterPassword from "./EnterPassword";
import EnterCode from "./EnterCode";
import Agreement from "./Agreement";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"enterEmail"}>
      <Stack.Screen name="enterEmail" component={EnterEmail} />
      <Stack.Screen name="enterPassword" component={EnterPassword} />
      <Stack.Screen name="enterCode" component={EnterCode} />
      <Stack.Screen name="agreement" component={Agreement} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
