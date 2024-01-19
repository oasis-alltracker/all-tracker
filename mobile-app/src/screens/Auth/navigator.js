import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnterEmail from "./EnterEmail";
import EnterPassword from "./EnterPassword";
import EnterCode from "./EnterCode";
import CreatePassword from "./CreatePassword";
import TempPassword from "./TempPassword";

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
      <Stack.Screen name="createPassword" component={CreatePassword} />
      <Stack.Screen name="tempPassword" component={TempPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
