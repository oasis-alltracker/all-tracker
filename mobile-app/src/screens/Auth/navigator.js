import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../Landing";
import CreateAccountLock from "./CreateAccountLock";
import UnlockAccount from "./UnlockAccount";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"landing"}>
      <Stack.Screen name="landing" component={Landing} />
      <Stack.Screen name="createAccountLock" component={CreateAccountLock} />
      <Stack.Screen name="unlockAccount" component={UnlockAccount} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
