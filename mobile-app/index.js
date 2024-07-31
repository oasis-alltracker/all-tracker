import "react-native-gesture-handler";
import { Text } from "react-native";
import { registerRootComponent } from "expo";

import App from "./App";
Text.defaultProps = { maxFontSizeMultiplier: 1.0 };

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
