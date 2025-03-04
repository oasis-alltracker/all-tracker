import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnterEmail from "./EnterEmail";
import EnterPassword from "./EnterPassword";
import EnterCode from "./EnterCode";
import CreatePassword from "./CreatePassword";
import TempPassword from "./TempPassword";
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
      <Stack.Screen name="enterEmail" component={EnterEmail} />
      <Stack.Screen name="enterPassword" component={EnterPassword} />
      <Stack.Screen name="enterCode" component={EnterCode} />
      <Stack.Screen name="createPassword" component={CreatePassword} />
      <Stack.Screen name="tempPassword" component={TempPassword} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
