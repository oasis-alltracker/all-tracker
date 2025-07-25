import { ValueSheet } from "../../ValueSheet";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
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
import ToDosAPI from "../../api/toDos/toDosAPI";
import HabitStatusesAPI from "../../api/habits/habitStatusesAPI";
import UserAPI from "../../api/user/userAPI";
import HabitStatusListAPI from "../../api/habits/habitStatusListAPI";
import moment from "moment";
import CreateHabitModal from "./modals/CreateHabitModal";
import UpdateHabitModal from "./modals/UpdateHabitModal";
import TaskModal from "./modals/TaskModal";
import { sharedStyles } from "../styles";
import TasksAPI from "../../api/tasks/tasksAPI";
import NotificationsHandler from "../../api/notifications/notificationsHandler";

const TodosHabits = ({ navigation }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [routes, setRoutes] = useState([{ key: "first", title: "First" }]);
  const [dots, setDots] = useState([]);

  const [day, setDay] = useState(new Date());
  const [statusList, setStatusList] = useState([]);

  const [tasks, setTasks] = useState([]);
  const [toDos, setToDos] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);
  const [dueToDos, setDueToDos] = useState([]);
  const [doneToDos, setDoneToDos] = useState([]);

  const [habits, setHabits] = useState([]);

  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const [updateStats, setUpdateStats] = useState(0);

  const createHabitRef = useRef(null);
  const updateHabitRef = useRef(null);

  const taskRef = useRef(null);

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();

      const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
        .trackingPreferences;

      await Promise.all(
        createStatusList(day),
        getHabits(),
        getToDos(token),
        getTasks(token)
      );

      setTrackingPreferences(trackingPreferencesLoaded);

      var routesPreference = routes;

      if (trackingPreferencesLoaded.habitsSelected) {
        routesPreference.push({ key: "second", title: "Second" });
      }
      if (trackingPreferencesLoaded.toDosSelected) {
        routesPreference.push({ key: "third", title: "Third" });
      }

      routesPreference.push({ key: "fourth", title: "Fourth" });

      setRoutes(routesPreference);

      var numDots = [0, 1];
      for (var i = 2; i < routesPreference.length; i++) {
        numDots.push(i);
      }
      setDots(numDots);
      setTimeout(() => {
        setIsLoading(false);
      }, 1200);
    };

    if (!isPageLoaded) {
      setIsPageLoaded(true);
      getPreferencesOnLoad();
    }
  }, []);

  useEffect(() => {
    if (trackingPreferences) {
      if (
        trackingPreferences.habitsSelected &&
        trackingPreferences.toDosSelected &&
        pageIndex == 3
      ) {
        setUpdateStats(updateStats + 1);
      } else if (
        (pageIndex == 2 && !trackingPreferences.habitsSelected) ||
        (pageIndex == 2 && !trackingPreferences.toDosSelected)
      ) {
        setUpdateStats(updateStats + 1);
      }
    }
  }, [pageIndex]);

  const updateDate = (dateChange) => {
    var dayValue = 60 * 60 * 24 * 1000 * dateChange;
    var newDate = new Date(new Date(day).getTime() + dayValue);
    setDay(newDate);
    refreshHabits(newDate);
    refreshTasksAndToDos(newDate);
  };

  //Habit methods
  const createHabit = async (habit, notificationTimes, isNotificationsOn) => {
    setIsLoading(true);
    try {
      var token = await getAccessToken();
      const habitID = await HabitsAPI.createHabit(
        token,
        habit,
        isNotificationsOn
      );

      if (isNotificationsOn) {
        var triggers = [];
        for (var notificationTime of notificationTimes) {
          triggers.push({
            hour: notificationTime[0],
            minute: notificationTime[1],
            repeats: true,
          });
        }
        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `habit-${habitID}`,
          habit.name,
          "Don't forget to update your habit progress",
          triggers,
          true
        );
      }

      await getHabits();
      await createStatusList(day);
      setTimeout(() => setIsLoading(false), 500);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const refreshHabits = async (date = false) => {
    setIsLoading(true);
    if (!date) {
      date = day;
    }
    try {
      token = await getAccessToken();

      await createStatusList(date);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please refresh the page.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please refresh the page.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
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
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
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

    return;
  };

  const onHabitStatusUpdate = async (habitStatus, count) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();

      await updateHabitStatusCount(habitStatus, count);
      await createStatusList(day);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const deleteHabit = async (habitID) => {
    setIsLoading(true);
    try {
      token = await getAccessToken();
      await HabitsAPI.deleteHabit(token, habitID);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `task-${habitID}`
      );

      await NotificationsHandler.turnOffNotification(
        token,
        `task-${habitID}`,
        prevNotification.expoIDs
      );

      var prevExpoIDs = prevNotification[0]?.expoIDs;
      await NotificationsHandler.deleteNotification(
        token,
        `task-${habitID}`,
        prevExpoIDs
      );
      await getHabits();
      await createStatusList(day);
      setTimeout(() => setIsLoading(false), 500);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateHabit = async (
    habitID,
    habit,
    notificationTimes,
    isNotificationsOn
  ) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await HabitsAPI.updateHabit(token, habitID, habit);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `habit-${habitID}`
      );
      var prevExpoIDs = prevNotification[0]?.expoIDs;

      if (isNotificationsOn) {
        var triggers = [];
        for (var notificationTime of notificationTimes) {
          triggers.push({
            hour: notificationTime[0],
            minute: notificationTime[1],
            repeats: true,
          });
        }

        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `habit-${habitID}`,
          habit.name,
          "Don't forget to update your habit progress",
          triggers,
          true,
          prevExpoIDs
        );
      } else {
        await NotificationsHandler.turnOffNotification(
          token,
          `habit-${habitID}`,
          prevExpoIDs
        );
      }
      await getHabits();
      await createStatusList(day);
      setTimeout(() => setIsLoading(false), 500);
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const getHabits = async () => {
    try {
      token = await getAccessToken();
      userHabits = await HabitsAPI.getHabits(token);
      setHabits(userHabits);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  //tuhdo methods
  const getToDos = async (token) => {
    try {
      userToDos = await ToDosAPI.getToDos(token, false);
      userDoneToDos = await ToDosAPI.getToDos(token, true);
      userDueToDos = await ToDosAPI.getToDosForToday(
        token,
        moment(day).format("YYYYMMDD")
      );
      setToDos(userToDos);
      setDoneToDos(userDoneToDos);
      setDueToDos(userDueToDos);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const createToDo = async (toDo, isNotificationsOn, time) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      toDoID = await ToDosAPI.createToDo(token, toDo);

      if (isNotificationsOn) {
        var month;
        if (Platform.OS == "android") {
          month = Number(toDo.dateStamp.substring(4, 6)) - 1;
        } else if (Platform.OS == "ios") {
          month = Number(toDo.dateStamp.substring(4, 6));
        }
        trigger = [
          {
            day: Number(toDo.dateStamp.substring(6, 8)),
            month: month,
            hour: time[0],
            minute: time[1],
            repeats: false,
          },
        ];
        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `task-${toDoID}`,
          "Task Reminder",
          toDo.name,
          trigger,
          true
        );
      }

      await getToDos(token);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateToDo = async (toDoSK, toDo, isNotificationsOn, time) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await ToDosAPI.updateToDo(token, toDoSK, toDo);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `task-${toDo.toDoID}`
      );
      var prevExpoIDs = prevNotification[0]?.expoIDs;

      if (isNotificationsOn) {
        var month;
        if (Platform.OS == "android") {
          month = Number(toDo.dateStamp.substring(4, 6)) - 1;
        } else if (Platform.OS == "ios") {
          month = Number(toDo.dateStamp.substring(4, 6));
        }
        trigger = [
          {
            day: Number(toDo.dateStamp.substring(6, 8)),
            month: month,
            hour: time[0],
            minute: time[1],
            repeats: false,
          },
        ];
        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `task-${toDo.toDoID}`,
          "Task Reminder",
          toDo.name,
          trigger,
          true,
          prevExpoIDs
        );
      } else {
        await NotificationsHandler.turnOffNotification(
          token,
          `task-${toDo.toDoID}`,
          prevExpoIDs
        );
      }

      await getToDos(token);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateDueToDoStatus = async (updatedToDo) => {
    try {
      var index = toDos.findIndex((item) => item.toDoID == updatedToDo.toDoID);
      var toDo = toDos[index];

      var toDoSK = toDo.SK;

      if (!toDo.selected) {
        toDo.selected = true;

        updatedToDo = {
          name: toDo.name,
          dateStamp: toDo.dateStamp,
          description: toDo.description,
          isComplete: true,
          toDoID: toDo.toDoID,
        };
        toDo.SK = `true-${toDo.dateStamp}-${toDo.toDoID}`;
        await ToDosAPI.updateToDo(token, toDoSK, updatedToDo);
      } else {
        toDo.selected = false;

        updatedToDo = {
          name: toDo.name,
          dateStamp: toDo.dateStamp,
          description: toDo.description,
          isComplete: false,
          toDoID: toDo.toDoID,
        };
        toDo.SK = `false-${toDo.dateStamp}-${toDo.toDoID}`;
        await ToDosAPI.updateToDo(token, toDoSK, updatedToDo);
      }
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateToDoStatus = async (updatedToDo) => {
    try {
      var dueToDoUpdated = false;

      var index = toDos.findIndex((item) => item.toDoID == updatedToDo.toDoID);
      var toDo = toDos[index];

      var dueIndex = dueToDos.findIndex(
        (item) => item.toDoID == updatedToDo.toDoID
      );
      var dueToDo = dueToDos[dueIndex];
      if (dueToDo != undefined) {
        dueToDoUpdated = true;
      }

      var toDoSK = toDo.SK;

      if (toDo.selected) {
        if (dueToDoUpdated) {
          dueToDo.selected = true;
        }
        updatedToDo = {
          name: toDo.name,
          dateStamp: toDo.dateStamp,
          description: toDo.description,
          isComplete: true,
          toDoID: toDo.toDoID,
        };
        toDo.SK = `true-${toDo.dateStamp}-${toDo.toDoID}`;
        await ToDosAPI.updateToDo(token, toDoSK, updatedToDo);
      } else {
        if (dueToDoUpdated) {
          dueToDo.selected = false;
        }

        updatedToDo = {
          name: toDo.name,
          dateStamp: toDo.dateStamp,
          description: toDo.description,
          isComplete: false,
          toDoID: toDo.toDoID,
        };
        toDo.SK = `false-${toDo.dateStamp}-${toDo.toDoID}`;
        await ToDosAPI.updateToDo(token, toDoSK, updatedToDo);
      }
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateDoneToDoStatus = async (updatedToDo) => {
    try {
      setIsLoading(true);
      index = doneToDos.findIndex((item) => item.toDoID == updatedToDo.toDoID);
      toDo = doneToDos[index];
      toDo.selected = true;
      toDo.isComplete = false;
      doneToDoUpdated = true;

      var toDoSK = toDo.SK;

      toDo.selected = false;

      updatedToDo = {
        name: toDo.name,
        dateStamp: toDo.dateStamp,
        description: toDo.description,
        isComplete: false,
        toDoID: toDo.toDoID,
      };
      toDo.SK = `false-${toDo.dateStamp}-${toDo.toDoID}`;
      await ToDosAPI.updateToDo(token, toDoSK, updatedToDo);

      var newToDos = [...toDos];
      var newDoneToDos = [...doneToDos];
      var newDueToDos = [...dueToDos];
      newToDos.push(toDo);
      newDoneToDos.splice(index, 1);
      if (
        toDo.dateStamp <= moment(day).format("YYYYMMDD") ||
        toDo.dateStamp == "noDueDate"
      ) {
        newDueToDos.push(toDo);
      }
      setToDos(newToDos);
      setDoneToDos(newDoneToDos);
      setDueToDos(newDueToDos);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const deleteToDo = async (toDoSK, toDoID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await ToDosAPI.deleteToDo(token, toDoSK);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `task-${toDoID}`
      );
      await NotificationsHandler.turnOffNotification(
        token,
        `task-${toDoID}`,
        prevNotification.expoIDs
      );
      await NotificationsHandler.deleteNotification(token, `task-${toDoID}`);

      await getToDos(token);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  //task methods
  const getTasks = async (token) => {
    try {
      userTasks = await TasksAPI.getTasks(token);
      userDueTasks = await TasksAPI.getDueAndOverdueTaks(
        token,
        moment(day).format("YYYYMMDD")
      );
      setTasks(userTasks);
      setDueTasks(userDueTasks);
    } catch (e) {
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const createTask = async (task, isNotificationsOn, time) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      taskID = await TasksAPI.createTask(token, task);
      if (isNotificationsOn) {
        triggers = [];
        for (var day of task.schedule) {
          triggers.push({
            weekday: day + 1,
            hour: time[0],
            minute: time[1],
            repeats: true,
          });
        }

        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `task-${taskID}`,
          "Task Reminder",
          task.name,
          triggers,
          true
        );
      }
      await getTasks(token);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateTask = async (taskSK, task, isNotificationsOn, time) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await TasksAPI.updateTask(token, taskSK, task);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `task-${taskSK}`
      );
      var prevExpoIDs = prevNotification[0]?.expoIDs;

      if (isNotificationsOn) {
        triggers = [];
        for (var day of task.schedule) {
          triggers.push({
            weekday: day + 1,
            hour: time[0],
            minute: time[1],
            repeats: true,
          });
        }

        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `task-${taskSK}`,
          "Task Reminder",
          task.name,
          triggers,
          true,
          prevExpoIDs
        );
      } else {
        await NotificationsHandler.turnOffNotification(
          token,
          `task-${taskSK}`,
          prevExpoIDs
        );
      }

      await getTasks(token);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateDueTaskStatus = async (updatedTask) => {
    try {
      var nextDueDate;
      var index = tasks.findIndex((item) => item.SK == updatedTask.SK);
      var task = tasks[index];

      if (!task.selected) {
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
        for (var recurringDay of task.schedule) {
          if (recurringDay > dayOfWeek) {
            nextDayOfWeek = recurringDay;
            break;
          }
        }
        if (nextDayOfWeek == 0) {
          nextDayOfWeek = task.schedule[0];
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

        task.selected = true;
        task.completionList.push(task.nextDueDate);
        nextDueDate = `${nextDueDateYear}${nextDueDateMonth}${nextDueDateDay}`;
        task.nextDueDate = nextDueDate;

        await TasksAPI.updateTask(token, task.SK, task);
      } else {
        task.selected = false;
        nextDueDate = task.completionList.pop();
        task.nextDueDate = nextDueDate;

        await TasksAPI.updateTask(token, task.SK, task);
      }
      return nextDueDate;
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const updateTaskStatus = async (updatedTask) => {
    try {
      var nextDueDate;
      var dueTaskUpdated = false;
      var index = tasks.findIndex((item) => item.SK == updatedTask.SK);
      var task = tasks[index];

      var dueIndex = dueTasks.findIndex((item) => item.SK == updatedTask.SK);
      var dueTask = dueTasks[dueIndex];
      if (dueTask != undefined) {
        dueTaskUpdated = true;
      }

      if (task.selected) {
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
        for (var recurringDay of task.schedule) {
          if (recurringDay > dayOfWeek) {
            nextDayOfWeek = recurringDay;
            break;
          }
        }
        if (nextDayOfWeek == 0) {
          nextDayOfWeek = task.schedule[0];
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

        nextDueDate = `${nextDueDateYear}${nextDueDateMonth}${nextDueDateDay}`;
        var completionList = task.completionList;
        completionList.push(task.nextDueDate);

        var newTask = {
          PK: task.PK,
          SK: task.SK,
          completionList: completionList,
          description: task.description,
          name: task.name,
          nextDueDate: nextDueDate,
          schedule: task.schedule,
          selected: true,
        };

        if (dueTaskUpdated) {
          dueTask.selected = true;
          dueTask.completionList.push(dueTask.nextDueDate);
          dueTask.nextDueDate = nextDueDate;
        }

        await TasksAPI.updateTask(token, task.SK, newTask);
      } else {
        nextDueDate = task.completionList[task.completionList.length - 1];
        if (dueTaskUpdated) {
          dueTask.selected = false;
          dueTask.completionList.pop();
          dueTask.nextDueDate = nextDueDate;
        }

        var completionList = task.completionList.slice(
          0,
          task.completionList.length - 1
        );

        var newTask = {
          PK: task.PK,
          SK: task.SK,
          completionList: completionList,
          description: task.description,
          name: task.name,
          nextDueDate: nextDueDate,
          schedule: task.schedule,
          selected: false,
        };
        await TasksAPI.updateTask(token, task.SK, newTask);
      }
      return nextDueDate;
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const deleteTask = async (taskID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await TasksAPI.deleteTask(token, taskID);

      var prevNotification = await NotificationsHandler.getNotifications(
        token,
        `task-${taskID}`
      );

      await NotificationsHandler.turnOffNotification(
        token,
        `task-${taskID}`,
        prevNotification.expoIDs
      );

      var prevExpoIDs = prevNotification[0]?.expoIDs;
      await NotificationsHandler.deleteNotification(
        token,
        `task-${taskID}`,
        prevExpoIDs
      );

      await getTasks(token);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const refreshTasksAndToDos = async (newDate) => {
    try {
      userDueToDos = await ToDosAPI.getToDosForToday(
        token,
        moment(newDate).format("YYYYMMDD")
      );
      setDueToDos(userDueToDos);

      userDueTasks = await TasksAPI.getDueAndOverdueTaks(
        token,
        moment(newDate).format("YYYYMMDD")
      );
      setDueTasks(userDueTasks);
    } catch (e) {
      console.log(e);
      if (Platform.OS === "ios") {
        Toast.show("Something went wrong. Please refresh the page.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      } else {
        Toast.show("Something went wrong. Please refresh the page.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
      }
    }
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <Main
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            day={day}
            statusList={statusList}
            dueToDos={dueToDos}
            dueTasks={dueTasks}
            trackingPreferences={trackingPreferences}
            updateDate={updateDate}
            createHabitRef={createHabitRef}
            taskRef={taskRef}
            refreshHabits={refreshHabits}
            updateHabitStatusCount={updateHabitStatusCount}
            onHabitStatusUpdate={onHabitStatusUpdate}
            updateDueToDoStatus={updateDueToDoStatus}
            updateDueTaskStatus={updateDueTaskStatus}
          />
        );
      case "second":
        return (
          <MyHabits
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
            updateDoneToDoStatus={updateDoneToDoStatus}
            updateTaskStatus={updateTaskStatus}
          />
        );
      case "fourth":
        return (
          <Statistics
            trackingPreferences={trackingPreferences}
            updateStats={updateStats}
          />
        );
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
          navigationState={{ index: pageIndex, routes }}
          renderScene={renderScene}
          onIndexChange={setPageIndex}
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
                  key === pageIndex && {
                    backgroundColor: ValueSheet.colours.primaryColour,
                    borderColor: ValueSheet.colours.borderNavy,
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
    backgroundColor: ValueSheet.colours.background,
    flex: 1,
  },
  headerButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
  errorToast: {
    textColor: ValueSheet.colours.background,
    zIndex: 999,
    elevation: 100,
  },
});

export default TodosHabits;
