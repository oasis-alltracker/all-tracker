import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button, Calendar } from "../../../components";

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
  const [itemID, setItemID] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const [time, setTime] = useState(null);
  const [dateStamp, setDateStamp] = useState(null);
  const [schedule, setSchedule] = useState(null);

  const calendarRef = useRef(null);

  const saveDateHandler = async (
    newIsRecurring,
    newTime,
    newDateStamp,
    newSchedule
  ) => {
    setIsRecurring(newIsRecurring);
    setTime(newTime);
    setDateStamp(newDateStamp);
    setSchedule(newSchedule);
  };

  const onBack = async () => {
    setVisible(false);
    if (isEdit) {
      if (isRecurring) {
        await deleteTask(itemID);
      } else {
        await deleteToDo(itemID);
      }
    }
  };

  const onSave = async () => {
    setVisible(false);
    if (!taskName && !description) {
      Toast.show("You must complete the form to create a habit.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    } else if (!taskName) {
      Toast.show("Don't forget to give this task a name.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    } else if (!description) {
      Toast.show("Don't forget to give this task a description.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    } else {
      try {
        if (isEdit) {
          if (isRecurring) {
            task = {
              name: title,
              schedule: schedule,
              description: description,
              dateStamp: dateStamp,
            };
            await updateTask(task, time, schedule);
          } else {
            toDo = {
              name: title,
              description: description,
              dateStamp: dateStamp,
            };
            await updateToDo(toDo, time, dateStamp);
          }
        } else {
          if (isRecurring) {
            task = {
              name: title,
              schedule: schedule,
              description: description,
              dateStamp: dateStamp,
            };
            await createTask(task, time, schedule);
          } else {
            toDo = {
              name: title,
              description: description,
              dateStamp: dateStamp,
            };
            await createToDo(toDo, time, dateStamp);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    let ref = {
      open(isEdit = false, props) {
        setVisible(true);
        if (isEdit) {
          setIsEdit(true);

          setTitle(props.title);
          setDescription(props.description);
          setIsRecurring(props.isRecurring);
          setTime(props.time);
          setDateStamp(props.dateStamp);
          setSchedule(props.schedule);
          setItemID(props.itemID);
        } else {
          setTitle("");
          setDescription("");
          setIsRecurring(false);
          setTime(null);
          setDateStamp("noDueDate");
          setSchedule(null);
          setItemID(null);
          setIsEdit(false);
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
      <View style={styles.container}>
        <View style={styles.nameRow}>
          <TextInput
            placeholderTextColor={"#7B97BC"}
            placeholder="Name"
            style={styles.inputTitle}
            onChange={setTitle}
            value={title}
          />
          <TouchableOpacity
            onPress={() => {
              calendarRef.current.open(isEdit);
            }}
          >
            <Image
              style={styles.searchImage}
              source={require("../../../assets/images/date-picker.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.descriptionRow}>
          <Image
            style={styles.editData}
            source={require("../../../assets/images/edit.png")}
          />
          <TextInput
            multiline
            placeholderTextColor={"#7B97BC"}
            placeholder="Description"
            style={styles.input}
            onChangeText={setDescription}
            value={description}
          />
        </View>
        <View style={styles.buttonsRow}>
          <Button onPress={() => onBack()} style={[styles.button, styles.back]}>
            {isEdit ? "Delete" : "Cancel"}
          </Button>
          <Button onPress={() => onSave()} style={styles.button}>
            Save
          </Button>
        </View>
      </View>
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
    width: 30,
    height: 30,
  },
  editData: {
    width: 40,
    height: 40,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  descriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 70,
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
    lineHeight: 35,
    marginTop: 15,
    paddingVertical: 10,
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
  input: {
    width: 100,
    paddingHorizontal: 20,
    color: "#25436B",
    flex: 1,
    fontFamily: "Sego",
    fontSize: 18,
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
