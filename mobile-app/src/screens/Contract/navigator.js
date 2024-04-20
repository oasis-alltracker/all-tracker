import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Agreement from "./Agreement/Agreement";
import TermsOfService from "./Agreement/TermsOfService";
import UserAgreement from "./Agreement/UserAgreement";
import PrivacyPolicy from "./Agreement/PrivacyPolicy";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function ContractNavigator() {
  return (
    <Stack.Navigator screenOptions={options} initialRouteName={"agreement"}>
      <Stack.Screen name="agreement" component={Agreement} />
      <Stack.Screen name="termsOfService" component={TermsOfService} />
      <Stack.Screen name="userAgreement" component={UserAgreement} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}

export default ContractNavigator;
