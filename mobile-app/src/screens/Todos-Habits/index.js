import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView } from "react-native-tab-view";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

import Main from "./Main";
import MyTasks from "./MyTasks";
import MyHabits from "./MyHabits";
import Statistics from "./Statistics";

import MenuIcon from "../../assets/icons/menu";

import { getAccessToken } from "../../user/keychain";
import HabitsAPI from "../../api/habits/habitsAPI";
import ToDosAPI from "../../api/tasks/toDosAPI";
import HabitStatusesAPI from "../../api/habits/habitStatusesAPI";
import UserAPI from "../../api/user/userAPI";
import HabitStatusListAPI from "../../api/habits/habitStatusListAPI";
import moment from "moment";
import CreateHabitModal from "./modals/CreateHabitModal";
import UpdateHabitModal from "./modals/UpdateHabitModal";
import TaskModal from "./modals/TaskModal";
import { sharedStyles } from "../styles";
import TasksAPI from "../../api/tasks/tasksAPI";

const TodosHabits = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [routes, setRoutes] = useState([{ key: "first", title: "First" }]);
  const [dots, setDots] = useState([]);

  const [day, setDay] = useState(new Date());
  const [statusList, setStatusList] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [toDos, setToDos] = useState([]);
  const [doneToDos, setDoneToDos] = useState([]);

  const [habits, setHabits] = useState([]);

  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const createHabitRef = useRef(null);
  const updateHabitRef = useRef(null);

  const taskRef = useRef(null);

  const updateDate = (dateChange) => {
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
    refreshHabits(newDate);
  };

  //Habit methods
  const createHabit = async (habit) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.createHabit(token, habit);

      await getHabits();
      await createStatusList(day);
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
    return;
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

  const deleteHabit = async (habitID) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.deleteHabit(token, habitID);
      await getHabits();
      await createStatusList(day);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateHabit = async (habitID, habit) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await HabitsAPI.updateHabit(token, habitID, habit);
      await getHabits();
      await createStatusList(day);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const getHabits = async () => {
    try {
      token = await getAccessToken();
      userHabits = await HabitsAPI.getHabits(token);
      setHabits(userHabits);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  //tuhdo methods
  const createToDo = async (toDo) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await ToDosAPI.createToDo(token, toDo);
      await ToDosAPI.getToDos(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const getToDos = async (token) => {
    try {
      userToDos = await ToDosAPI.getToDos(token, false);
      userDoneToDos = await ToDosAPI.getToDos(token, true);
      setToDos(userToDos);
      setDoneToDos(userDoneToDos);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateToDo = async (toDoID, toDo) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await ToDosAPI.updateToDo(token, toDoID, toDo);
      await ToDosAPI.getToDos(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateToDoStatus = async (toDo) => {
    try {
      if (!toDo.isLocked) {
        var toDoID = toDo.SK;
        toDo.isLocked = true;

        if (!toDo.selected) {
          toDo.selected = true;
          updatedToDo = {
            name: toDo.name,
            dateStamp: toDo.dateStamp,
            description: toDo.description,
            isComplete: true,
            toDoID: toDoID.toDoID,
          };
          toDo.SK = `true-${toDo.dateStamp}-${toDo.toDoID}`;
          await ToDosAPI.updateToDo(token, toDoID, updatedToDo);
        } else {
          toDo.selected = false;

          updatedToDo = {
            name: toDo.name,
            dateStamp: toDo.dateStamp,
            description: toDo.description,
            isComplete: false,
            toDoID: toDoID.toDoID,
          };
          toDo.SK = `false-${toDo.dateStamp}-${toDo.toDoID}`;
          await ToDosAPI.updateToDo(token, toDoID, updatedToDo);
        }
        toDo.isLocked = false;
      }
    } catch (e) {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const deleteToDo = async (toDoID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await ToDosAPI.deleteToDo(token, toDoID);
      await ToDosAPI.getToDos(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  //task methods
  const getTasks = async (token) => {
    try {
      userTasks = await TasksAPI.getTasks(token);
      setTasks(userTasks);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const createTask = async (toDo) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await TasksAPI.createTask(token, toDo);
      await TasksAPI.getTasks(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateTask = async (taskID, task) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await TasksAPI.updateTask(token, taskID, task);
      await TasksAPI.getTasks(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      if (!task.isLocked) {
        task.isLocked = true;

        if (!task.selected) {
          task.selected = true;
          task.completionList.push(task.nextDueDate);
          var year = task.nextDueDate.substring(0, 4);
          var month = task.nextDueDate.substring(4, 6);
          var day = task.nextDueDate.substring(6, 8);
          var lastCompletionDate = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
          );
          var dayOfWeek = lastCompletionDate.getDay();
          var nextDayOfWeek = 0;
          for (var recurringDay of task.schedule.days) {
            if (recurringDay > dayOfWeek) {
              nextDayOfWeek = recurringDay;
              break;
            }
          }
          if (nextDayOfWeek == 0) {
            nextDayOfWeek = task.schedule.days[0];
          }

          var dateChange = 0;
          //use brain cells please
          if (nextDayOfWeek > dayOfWeek) {
            dateChange = nextDayOfWeek - dayOfWeek;
          } else if (nextDayOfWeek == dayOfWeek) {
            dateChange = 7;
          } else {
            dateChange = 7 - dayOfWeek + nextDayOfWeek;
          }

          lastCompletionDate.setDate(lastCompletionDate.getDate() + dateChange);

          var nextDueDateYear = lastCompletionDate.getFullYear().toString();
          var nextDueDateMonth = (lastCompletionDate.getMonth() + 1).toString();
          var nextDueDateDay = lastCompletionDate.getDate().toString();

          if (nextDueDateMonth.length == 1) {
            nextDueDateMonth = "0" + nextDueDateMonth;
          }
          if (nextDueDateDay.length == 1) {
            nextDueDateDay = "0" + nextDueDateDay;
          }

          task.nextDueDate = `${nextDueDateYear}${nextDueDateMonth}${nextDueDateDay}`;

          await TasksAPI.updateTask(token, task.SK, task);
        } else {
          task.selected = false;
          task.nextDueDate = task.completionList.pop();
          await TasksAPI.updateTask(token, task.SK, task);
        }
        task.isLocked = false;
      }
    } catch (e) {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  const deleteTask = async (taskID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await TasksAPI.deleteTask(token, taskID);
      await TasksAPI.getTasks(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }
  };

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();
      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
        .trackingPreferences;
      setTrackingPreferences(trackingPreferencesLoaded);

      var routesPreference = routes;

      if (trackingPreferencesLoaded.habitsSelected) {
        routesPreference.push({ key: "second", title: "Second" });
        await createStatusList(day);
        await getHabits();
      }
      if (trackingPreferencesLoaded.toDosSelected) {
        routesPreference.push({ key: "third", title: "Third" });
        await getToDos(token);
        await getTasks(token);
      }
      routesPreference.push({ key: "fourth", title: "Fourth" });

      setRoutes(routesPreference);

      var numDots = [0, 1];
      for (var i = 2; i < routesPreference.length; i++) {
        numDots.push(i);
      }
      setDots(numDots);
    };

    if (!isPageLoaded) {
      setIsPageLoaded(true);
      getPreferencesOnLoad();
    }
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Main
            isLoading={isLoading}
            day={day}
            statusList={statusList}
            toDos={toDos}
            tasks={tasks}
            trackingPreferences={trackingPreferences}
            updateDate={updateDate}
            createHabitRef={createHabitRef}
            taskRef={taskRef}
            refreshHabits={refreshHabits}
            updateHabitStatusCount={updateHabitStatusCount}
            onHabitStatusUpdate={onHabitStatusUpdate}
            updateToDoStatus={updateToDoStatus}
            updateTaskStatus={updateTaskStatus}
          />
        );
      case "second":
        return (
          <MyHabits
            isLoading={isLoading}
            habits={habits}
            createHabitRef={createHabitRef}
            updateHabitRef={updateHabitRef}
          />
        );
      case "third":
        return (
          <MyTasks
            isLoading={isLoading}
            taskRef={taskRef}
            toDos={toDos}
            tasks={tasks}
            doneToDos={doneToDos}
            updateToDoStatus={updateToDoStatus}
            updateTaskStatus={updateTaskStatus}
          />
        );
      case "fourth":
        return <Statistics trackingPreferences={trackingPreferences} />;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.container} removeClippedSubviews={false}>
      <View style={styles.container}>
        <Spinner visible={isLoading}></Spinner>
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
        <View style={sharedStyles.pagination}>
          {dots.map((val, key) => {
            return (
              <View
                key={key.toString()}
                style={[
                  sharedStyles.dot,
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
      <CreateHabitModal
        getRef={(ref) => (createHabitRef.current = ref)}
        createHabit={createHabit}
      />
      <UpdateHabitModal
        getRef={(ref) => (updateHabitRef.current = ref)}
        updateHabit={updateHabit}
        deleteHabit={deleteHabit}
      />
      <TaskModal
        getRef={(ref) => (taskRef.current = ref)}
        createTask={createTask}
        createToDo={createToDo}
        updateTask={updateTask}
        deleteTask={deleteTask}
        updateToDo={updateToDo}
        deleteToDo={deleteToDo}
      />
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
});

export default TodosHabits;
