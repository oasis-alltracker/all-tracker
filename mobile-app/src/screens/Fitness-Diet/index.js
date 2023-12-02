import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import MenuIcon from "../../assets/icons/menu";
import Main from "./Main";
import Statistics from "./Statistics";
import Diet from "./Diet";
import Fitness from "./Fitness";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";

const renderScene = SceneMap({
  first: Main,
  second: Diet,
  third: Fitness,
  fourth: Statistics,
});

const FitnessDiet = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();

  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.openDrawer()}
        >
          <MenuIcon />
        </TouchableOpacity>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width }}
          renderTabBar={() => null}
          lazy
        />
        <View style={styles.pagination}>
          {[0, 1, 2, 3].map((val, key) => {
            return (
              <View
                key={key.toString()}
                style={[
                  styles.dot,
                  key === index && {
                    backgroundColor: "#25436B",
                    borderColor: "#1E3556",
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  button: {
    height: 180,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  image: {
    width: 130,
    height: 130,
  },
  pagerView: {
    flex: 1,
    overflow: "visible",
  },
  headerButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
  },
  pagination: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 30,
    alignItems: "center",
    left: 0,
    justifyContent: "center",
  },
});

export default FitnessDiet;
