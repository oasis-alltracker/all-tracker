import { createStackNavigator } from "@react-navigation/stack";
import MealPage from "./MealPage";

const Stack = createStackNavigator();

const options = {
  headerShown: false,
  gestureEnabled: true,
};

function MealNavigator (){
    return (
        <Stack.Navigator screenOptions={options} initialRouteName={"mealPage"}>
            <Stack.Screen name="mealPage" component={MealPage} />
        </Stack.Navigator>
    );
}

export default MealNavigator;