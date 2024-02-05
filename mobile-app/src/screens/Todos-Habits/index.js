import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import MenuIcon from "../../assets/icons/menu";
import Main from "./Main";
import MyTasks from "./MyTasks";
import MyHabits from "./MyHabits";
import Statistics from "./Statistics";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap } from "react-native-tab-view";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";

const renderScene = SceneMap({
  first: Main,
  second: MyHabits,
  third: MyTasks
});

const Habits = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);

  const [routes, setRoutes] = useState([]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const getPreferencesOnLoad = async() =>{
      if(isLoading){
        
        token = await getAccessToken()
        user = await UserAPI.getUser(token)

        routesPreference = [{ key: "first", title: "First" }]

        if(user.data.trackingPreferences.habitsSelected){
          routesPreference.push(          
            { key: "second", title: "Second" },)
        }
        if(user.data.trackingPreferences.toDosSelected){
          routesPreference.push(          
            { key: "third", title: "Third" },)
        }

        setRoutes(routesPreference)

        var numDots = [0];
        for(var i=0; i<routesPreference.length; i++){
          numDots.push(i+1)
        }
        setIsLoading(false)
      }    
    }
    getPreferencesOnLoad()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        visible={isLoading}>
      </Spinner>
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
        />
        <View style={styles.pagination}>
          {[0, 1].map((val, key) => {
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
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    borderWidth: 1,
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

export default Habits;
