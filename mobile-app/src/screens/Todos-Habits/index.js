import React, { useState, useEffect } from "react";
import "react-native-gesture-handler"
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";
import Spinner from "react-native-loading-spinner-overlay";
import Toast from "react-native-root-toast";

import Main from "./Main";
import MyTasks from "./MyTasks";
import MyHabits from "./MyHabits";
import Statistics from "./Statistics";

import MenuIcon from "../../assets/icons/menu";

import { getAccessToken } from "../../user/keychain";
import HabitsAPI from "../../api/habits/habitsAPI";
import HabitStatusesAPI from "../../api/habits/habitStatusesAPI";
import UserAPI from "../../api/user/userAPI";
import HabitStatusListAPI from "../../api/habits/habitStatusListAPI";
import moment from "moment";


const Habits = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [routes, setRoutes] = useState([]);

  const [day, setDay] = useState(new Date());
  const [statusList, setStatusList] = useState([]);
  const [habits, setHabits] = useState([]);
  const [trackingPreferences, setTrackingPreferences] = useState([]);

 

  const updateDate = (dateChange) => {
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
    refreshHabits(newDate);
  };

  const createHabit = async (habit) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.createHabit(token, habit);

      await createStatusList(day);
      await getHabits()
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const refreshHabits = async (date = false) => {
    setIsLoading(true);
    if (!date) {
      date = day;
    }
    try {
      token = await getAccessToken();

      createStatusList(date);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateHabitStatusCount = async (habit, count) => {
    try {
      var habitStatus;
      token = await getAccessToken();
      if (habit.count === undefined) {
        habitStatus = {
          dateStamp: moment(day).format("YYYYMMDD"),
          name: habit.name,
          isPositive: habit.isPositive,
          threshold: habit.threshold,
          pngURL: habit.pngURL,
        };
        habitStatus.count = count;
        habitStatus.habitID = habit.SK;

        await HabitStatusesAPI.createHabitStatus(token, habitStatus);
      } else {
        habitStatus = {
          SK: habit.SK,
          count: count,
          isPositive: habit.isPositive,
        };

        await HabitStatusesAPI.updateHabitStatus(token, habit.SK, {
          count: count,
        });

      }

      return habitStatus;
    } catch (e) {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const createStatusList = async (showingDate = false) => {
    if (!showingDate) {
      showingDate = new Date();
    }
    const token = await getAccessToken();
    const statusList = await HabitStatusListAPI.getHabitStatusList(
      token,
      moment(showingDate).format("YYYYMMDD")
    );

    setStatusList(statusList);
    setIsLoading(false);
    return
  };

  const onHabitStatusUpdate = async (habitStatus, count) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();

      await updateHabitStatusCount(habitStatus, count);
      await createStatusList(day);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };


  const deleteHabit = async(habitID) => {
    setIsLoading(true);
    try{
      token = await getAccessToken()
      await HabitsAPI.deleteHabit(token, habitID)
      await getHabits();
      await createStatusList(day);
    }
    catch(e){
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }


  }
  const updateHabit = async(habitID, habit) => {
    try{
      setIsLoading(true);
      token = await getAccessToken()
      await HabitsAPI.updateHabit(token, habitID, habit)
      await getHabits();
      await createStatusList(day);
    }
    catch(e){
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }

  }

  const getHabits = async() => {
    setIsLoading(true);
    try{
      token = await getAccessToken()
      userHabits =  await HabitsAPI.getHabits(token)
      setHabits(userHabits);
    }
    catch(e){
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
    
    setIsLoading(false);
  }

  useEffect(() => {
    const getPreferencesOnLoad = async() =>{
        
      token = await getAccessToken()
      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
      .trackingPreferences;
      setTrackingPreferences(trackingPreferencesLoaded);

      routesPreference = [{ key: "first", title: "First" }]

      if(trackingPreferencesLoaded.habitsSelected){
        routesPreference.push(          
          { key: "second", title: "Second" },)
      }
      if(trackingPreferencesLoaded.toDosSelected){
        routesPreference.push(          
          { key: "third", title: "Third" },)
      }

      setRoutes(routesPreference)

      var numDots = [0];
      for(var i=0; i<routesPreference.length; i++){
        numDots.push(i+1)
      }
      console.log("data is done loading")
      setIsLoading(false)
   
    }

    const getDataOnLoad = async () => {
      token = await getAccessToken();

      await createStatusList(day);
      await getHabits();

      setIsLoading(false);
      console.log("preferences is done loading")
    };

    if (!isPageLoaded) {
      setIsPageLoaded(true)
      getPreferencesOnLoad()
      getDataOnLoad();
    }
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <Main day={day} statusList={statusList} trackingPreferences={trackingPreferences} updateDate={updateDate} createHabit={createHabit} refreshHabits={refreshHabits} updateHabitStatusCount={updateHabitStatusCount} onHabitStatusUpdate={onHabitStatusUpdate} />;
      case 'second':
        return <MyHabits habits={habits} createHabit={createHabit} deleteHabit={deleteHabit} updateHabit={updateHabit}/>;
      case 'third':
        return <MyTasks/>
      default:
        return null;
    }
  };
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
