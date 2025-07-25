import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Image } from "react-native";
import { Button, RenderTodos } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import UserAPI from "../../../api/user/userAPI";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import ToDosAPI from "../../../api/toDos/toDosAPI";
import TaskModal from "../../Todos-Habits/modals/TaskModal";
import TasksAPI from "../../../api/tasks/tasksAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { todoCompare } from "../../../utils/commonUtils";
import { ValueSheet } from "../../../ValueSheet";

const Todos = (props) => {
  const { selectedTrackers } = props.route.params;
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);

  const [toDos, setToDos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [tasksAndToDos, setTasksAndToDos] = useState([]);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const taskRef = useRef(null);

  const today = new Date();

  const getToDos = async (token) => {
    try {
      userToDos = await ToDosAPI.getToDos(token, false);

      setToDos(userToDos);
    } catch (e) {
      setIsLoading(false);
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

  const updateToDo = async (toDoSK, toDo, isNotificationsOn, time) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await ToDosAPI.updateToDo(token, toDoSK, toDo);
      if (isNotificationsOn) {
        prevNotification = await NotificationsHandler.getNotifications(
          token,
          `task-${toDo.toDoID}`
        );
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
          prevNotification.expoIDs
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

  const updateToDoStatus = async (updatedToDo) => {
    try {
      var index = toDos.findIndex((item) => item.toDoID == updatedToDo.toDoID);
      var toDo = toDos[index];

      if (!toDo.isLocked) {
        var toDoSK = toDo.SK;
        toDo.isLocked = true;

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
        toDo.isLocked = false;
      }
    } catch (e) {
      console.log(e);
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

  //task methods
  const getTasks = async (token) => {
    try {
      userTasks = await TasksAPI.getTasks(token);
      setTasks(userTasks);
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

      if (isNotificationsOn) {
        prevNotification = await NotificationsHandler.getNotifications(
          token,
          `task-${taskSK}`
        );

        triggers = [];
        for (var day of task.schedule) {
          triggers.push({
            weekday: day + 1,
            hour: time[0],
            minute: time[1],
          });
        }

        expoIDs = await NotificationsHandler.turnOnNotification(
          token,
          `task-${taskSK}`,
          "Task Reminder",
          task.name,
          triggers,
          true,
          prevNotification.expoIDs
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

  const updateTaskStatus = async (updatedTask) => {
    try {
      var index = tasks.findIndex((item) => item.SK == updatedTask.SK);
      var task = tasks[index];

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

          task.nextDueDate = `${nextDueDateYear}${nextDueDateMonth}${nextDueDateDay}`;

          await TasksAPI.updateTask(token, task.SK, task);
        } else {
          task.selected = false;
          task.nextDueDate = task.completionList.pop();
          await TasksAPI.updateTask(token, task.SK, task);
        }
        task.isLocked = false;
        var newTasks = [...tasks];
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

  const deleteTask = async (taskID) => {
    try {
      setIsLoading(true);
      token = await getAccessToken();
      await TasksAPI.deleteTask(token, taskID);
      await getTasks(token);
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

  const getAndSortTasksAndTodosOnLoad = async (token) => {
    userToDos = await ToDosAPI.getToDos(token, false);
    userTasks = await TasksAPI.getTasks(token);
    setToDos(userToDos);
    setTasks(userTasks);

    var tempTasksAndToDos = userToDos.concat(userTasks);
    tempTasksAndToDos.sort((a, b) => todoCompare(a, b));
    setTasksAndToDos(tempTasksAndToDos);
  };

  useEffect(() => {
    const getPreferencesOnLoad = async () => {
      token = await getAccessToken();
      await getAndSortTasksAndTodosOnLoad(token);
      setIsPageLoaded(true);
      setIsLoading(false);
    };

    if (!isPageLoaded) {
      setIsLoading(true);
      getPreferencesOnLoad();
    }
  }, []);

  useEffect(() => {
    if (isPageLoaded) {
      setIsLoading(true);
      var tempTasksAndToDos = toDos.concat(tasks);
      tempTasksAndToDos.sort((a, b) => todoCompare(a, b));
      setTasksAndToDos(tempTasksAndToDos);
      setIsLoading(false);
    }
  }, [tasks, toDos]);

  const Tasks = () => (
    <>
      <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
        <Text style={styles.tasksTitle}>My tasks</Text>
        <View style={styles.buttonItems}>
          <TouchableOpacity
            onPress={() => {
              taskRef.current.open();
            }}
          >
            <Image
              style={styles.plus}
              source={require("../../../assets/images/plus512.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: height * 0.365 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContainer,
            { width: width - 30 },
          ]}
        >
          {tasksAndToDos.map((item, index) => {
            return (
              <RenderTodos
                onPress={() => {
                  var isRecurring = false;
                  if (item.PK.includes("task")) {
                    isRecurring = true;
                  }
                  taskRef.current.open(true, {
                    title: item.name,
                    description: item.description,
                    isRecurring: isRecurring,
                    dateStamp: item.dateStamp,
                    itemSK: item.SK,
                    toDoID: item.toDoID,
                    schedule: item.schedule,
                    isComplete: item.isComplete,
                    nextDueDate: item.nextDueDate,
                    completionList: item.completionList,
                  });
                }}
                currentDay={today}
                key={index}
                item={item}
                updateTaskStatus={updateTaskStatus}
                updateToDoStatus={updateToDoStatus}
              />
            );
          })}
        </ScrollView>
      </View>
      <TaskModal
        getRef={(ref) => (taskRef.current = ref)}
        createTask={createTask}
        createToDo={createToDo}
        updateTask={updateTask}
        deleteTask={deleteTask}
        updateToDo={updateToDo}
        deleteToDo={deleteToDo}
      />
    </>
  );

  const CreatTasks = () => (
    <>
      <Text style={styles.title}>
        Get started by creating tasks for yourself
      </Text>
      <TouchableOpacity
        onPress={() => {
          taskRef.current.open();
        }}
        style={[styles.addButton, { height: height * 0.34, width: width - 30 }]}
      >
        <Text style={styles.buttonText}>Click here to create a task</Text>
        <View style={styles.plusCon}>
          <Image
            style={styles.plusImage}
            source={require("../../../assets/images/plus.png")}
          />
        </View>
      </TouchableOpacity>
      <TaskModal
        getRef={(ref) => (taskRef.current = ref)}
        createTask={createTask}
        createToDo={createToDo}
        updateTask={updateTask}
        deleteTask={deleteTask}
        updateToDo={updateToDo}
        deleteToDo={deleteToDo}
      />
    </>
  );

  const onNext = async () => {
    try {
      if (selectedTrackers.dietSelected) {
        navigationService.navigate("goalSelection", { selectedTrackers });
      } else if (selectedTrackers.fitnessSelected) {
        navigationService.navigate("fitness", { selectedTrackers });
      } else if (selectedTrackers.moodSelected) {
        navigationService.navigate("mood", { selectedTrackers });
      } else if (selectedTrackers.sleepSelected) {
        navigationService.navigate("sleep", { selectedTrackers });
      } else {
        setIsLoading(true);
        const accessToken = await getAccessToken();

        const { status: status, data: userData } = await UserAPI.getUser(
          accessToken
        );

        if (userData && !userData["isSetupComplete"]) {
          const { status, data } = await UserAPI.updateUser(
            true,
            selectedTrackers,
            accessToken
          );
          navigationService.reset("main", 0);
        } else {
          setIsLoading(true);
          if (!selectedTrackers.toDosSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "task"
            );
          }
          if (!selectedTrackers.habitsSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "habit"
            );
          }
          if (!selectedTrackers.moodSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "mood"
            );
          }
          if (!selectedTrackers.sleepSelected) {
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "morning"
            );
            await NotificationsHandler.turnOffGroupPreferenceNotifications(
              token,
              "sleep"
            );
          }
          setIsLoading(false);
          navigationService.reset("main", 0);
        }
        setIsLoading(false);
      }
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

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/to-dos512.png")}
          />
          <Text style={styles.imageText}>to-dos</Text>
        </View>
        {tasksAndToDos.length > 0 ? <Tasks /> : <CreatTasks />}
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button onPress={() => onNext()} style={styles.button}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: ValueSheet.colours.pink65,
    borderColor: ValueSheet.colours.borderPink70,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  plus: {
    width: 40,
    height: 40,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  tasksTitle: {
    fontSize: 31,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  title: {
    padding: 10,
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 20,
  },
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: ValueSheet.colours.secondaryColour27,
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: ValueSheet.colours.borderGrey75,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttonText: {
    color: ValueSheet.colours.black50,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingBottom: 15,
  },
  plusImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 20,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
  },
  center: {
    alignItems: "center",
  },
});

export default Todos;
