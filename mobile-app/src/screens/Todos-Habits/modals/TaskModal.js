import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button, Calendar } from "../../../components";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../../user/keychain";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import Spinner from "react-native-loading-spinner-overlay";

export default function TaskModal({
  getRef,
  createTask,
  createToDo,
  updateTask,
  updateToDo,
  deleteTask,
  deleteToDo,
}) {
  const [visible, setVisible] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [itemSK, setItemSK] = useState(null);
  const [itemID, setItemID] = useState(null);

  const [isRecurring, setIsRecurring] = useState(false);
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [time, setTime] = useState([12, 0]);
  const [dateStamp, setDateStamp] = useState("noDueDate");
  const [schedule, setSchedule] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [completionList, setCompletionList] = useState(false);
  const [nextDueDate, setNextDueDate] = useState(false);
  const [scheduleUpdated, setScheduleUpdated] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const calendarRef = useRef(null);

  const saveDateHandler = async (
    newIsRecurring,
    newIsNotificationsOn,
    newTime,
    newDateStamp,
    newSchedule
  ) => {
    setIsRecurring(newIsRecurring);
    setIsNotificationsOn(newIsNotificationsOn);
    setTime(newTime);
    setDateStamp(newDateStamp);
    if (JSON.stringify(newSchedule) !== JSON.stringify(schedule)) {
      setSchedule(newSchedule);
      setScheduleUpdated(true);
    }
  };

  const onBack = async () => {
    if (isEdit) {
      Alert.alert(
        "Delete Task",
        "Are you sure you want to delete this task?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            isPreferred: true,
            onPress: async () => {
              try {
                setIsLoading(true);
                if (isRecurring) {
                  await deleteTask(itemSK);
                } else {
                  await deleteToDo(itemSK, itemID);
                }
                setIsLoading(false);
                setVisible(false);
              } catch (e) {
                setIsLoading(false);
                console.log(e);
                Toast.show("Something went wrong. Please try again.", {
                  ...styles.errorToast,
                  duration: Toast.durations.LONG,
                });
              }
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    } else {
      setVisible(false);
    }
  };

  const onSave = async () => {
    Keyboard.dismiss();
    if (title == "" && description == "") {
      Toast.show("You must complete the form to create a task.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    } else if (title == "") {
      Toast.show("Don't forget to give this task a name.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    } else {
      try {
        setIsLoading(true);
        if (isEdit) {
          if (isRecurring) {
            task = {
              name: title,
              schedule: schedule,
              description: description,
              completionList: completionList,
              nextDueDate: nextDueDate,
            };
            if (scheduleUpdated) {
              var today = new Date();
              var year = today.getFullYear().toString();
              var month = (today.getMonth() + 1).toString();
              var day = today.getDate().toString();

              if (month.length == 1) {
                month = "0" + month;
              }
              if (day.length == 1) {
                day = "0" + day;
              }

              task.dateStamp = `${year}${month}${day}`;
            }
            setScheduleUpdated(false);
            await updateTask(itemSK, task, isNotificationsOn, time);
          } else {
            toDo = {
              name: title,
              description: description,
              dateStamp: dateStamp,
              isComplete: isComplete,
              toDoID: itemID,
            };
            await updateToDo(itemSK, toDo, isNotificationsOn, time);
          }
        } else {
          if (isRecurring) {
            var today = new Date();
            var year = today.getFullYear().toString();
            var month = (today.getMonth() + 1).toString();
            var day = today.getDate().toString();

            if (month.length == 1) {
              month = "0" + month;
            }
            if (day.length == 1) {
              day = "0" + day;
            }

            const todaysDateStamp = `${year}${month}${day}`;
            task = {
              name: title,
              schedule: schedule,
              description: description,
              dateStamp: todaysDateStamp,
            };
            await createTask(task, isNotificationsOn, time);
          } else {
            toDo = {
              name: title,
              description: description,
              dateStamp: dateStamp,
            };
            await createToDo(toDo, isNotificationsOn, time);
          }
        }
        setIsLoading(false);
        setVisible(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    }
  };

  useEffect(() => {
    const setNotificationData = async (itemID) => {
      token = await getAccessToken();
      notifications = await NotificationsHandler.getNotificationsForGroup(
        token,
        `task-${itemID}`
      );

      if (notifications.length == 1) {
        if ((notifications[0].preference = "on")) {
          setIsNotificationsOn(true);
        } else {
          setIsNotificationsOn(false);
        }

        setTime([
          notifications[0].triggers[0].hour,
          notifications[0].triggers[0].minute,
        ]);
      } else {
        setTime([12, 0]);
        setIsNotificationsOn(false);
      }
    };
    let ref = {
      open(isEdit = false, props) {
        setVisible(true);
        if (isEdit) {
          setIsEdit(true);
          setTitle(props.title);
          setDescription(props.description);
          setIsRecurring(props.isRecurring);
          setDateStamp(props.dateStamp);
          setSchedule(props.schedule);
          setItemSK(props.itemSK);
          if (props.isRecurring) {
            setItemID(props.itemSK);
            setNotificationData(props.itemSK);
          } else {
            setItemID(props.toDoID);
            setNotificationData(props.toDoID);
          }
          setIsComplete(props.isComplete);
          setNextDueDate(props.nextDueDate);
          setCompletionList(props.completionList);
        } else {
          setIsEdit(false);
          setTitle("");
          setDescription("");
          setIsRecurring(false);
          setDateStamp("noDueDate");
          setSchedule(null);
          setItemID(null);
          setIsNotificationsOn(false);
          setTime([12, 0]);
        }
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);
  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.modal}
    >
      <Spinner visible={isLoading}></Spinner>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.nameRow}>
              {!title && (
                <Image
                  style={styles.editData}
                  source={require("../../../assets/images/edit.png")}
                />
              )}

              <TextInput
                placeholderTextColor={"#7B97BC"}
                placeholder="Name"
                style={styles.inputTitle}
                onChangeText={setTitle}
                value={title}
              />
              <TouchableOpacity
                onPress={() => {
                  calendarRef.current.open(isEdit, {
                    isRecurring: isRecurring,
                    dateStamp: dateStamp,
                    schedule: schedule,
                    itemID: itemID,
                    time: time,
                    notifications: isNotificationsOn,
                  });
                }}
              >
                <Image
                  style={styles.searchImage}
                  source={require("../../../assets/images/date-picker.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.descriptionRow}>
              <TextInput
                multiline
                placeholderTextColor={"#7B97BC"}
                placeholder="Description (optional)"
                style={styles.input}
                onChangeText={setDescription}
                value={description}
              />
            </View>
            <View style={styles.buttonsRow}>
              <Button
                onPress={() => onBack()}
                style={[styles.button, styles.back]}
              >
                {isEdit ? "Delete" : "Cancel"}
              </Button>
              <Button onPress={() => onSave()} style={styles.button}>
                Save
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Calendar
        saveDateHandler={saveDateHandler}
        getRef={(ref) => (calendarRef.current = ref)}
      />
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  searchImage: {
    width: 25,
    height: 25,
    marginTop: 10,
  },
  editData: {
    width: 32,
    height: 32,
    marginTop: 10,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  descriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  inputTitle: {
    color: "#25436B",
    fontSize: 30,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 5,
    marginTop: 15,
    paddingVertical: 5,
    paddingRight: 10,
  },
  title: {
    color: "#25436B",
    fontSize: 35,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 20,
    fontSize: 20,
  },
  key: {
    color: "#25436B",
    fontSize: 25,
    fontFamily: "Sego",
  },
  errorToast: {
    textColor: "#25436B",
  },
  input: {
    width: 100,
    paddingHorizontal: 2,
    color: "#25436B",
    flex: 1,
    fontFamily: "Sego",
    fontSize: 14,
    height: 110,
    textAlignVertical: "top",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  check: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkImage: {
    width: 20,
    height: 20,
  },
});
