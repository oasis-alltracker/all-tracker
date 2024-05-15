import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RenderTodos } from "./Main";
import Spinner from "react-native-loading-spinner-overlay";

const { width, height } = Dimensions.get("window");

export default function MyTasks({
  isLoading,
  taskRef,
  toDos,
  tasks,
  doneToDos,
  updateTaskStatus,
  updateToDoStatus,
}) {
  const [tasksAndToDos, setTasksAndToDos] = useState([]);
  const [completedToDos, setCompletedToDos] = useState([]);

  const today = new Date();

  useEffect(() => {
    setTasksAndToDos(toDos.concat(tasks));
    setCompletedToDos([...doneToDos]);
  }, [toDos, tasks]);

  const Tasks = () => (
    <View style={{ height: 240 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
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

        {completedToDos.map((item, index) => {
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
  );

  const CreatTasks = () => (
    <TouchableOpacity
      onPress={() => {
        createHabitRef.current.open();
      }}
      style={styles.addButton}
    >
      <Text style={styles.buttonText}>Click here to create a task</Text>
      <View style={styles.plusCon}>
        <Image
          style={styles.plusImage}
          source={require("../../assets/images/plus.png")}
        />
      </View>
    </TouchableOpacity>
  );

  const DoneToDos = () => (
    <View style={{ height: 80 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {completedToDos.map((item, index) => {
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
  );

  return (
    <>
      <Spinner visible={isLoading}></Spinner>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        removeClippedSubviews={false}
      >
        <View style={styles.headerImageCon}>
          <Image
            style={styles.headerImage}
            source={require("../../assets/images/to-dos512.png")}
          />
        </View>

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
                source={require("../../assets/images/plus512.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.center}>
          {tasksAndToDos.length > 0 ? <Tasks /> : <CreatTasks />}
        </View>

        <View style={[styles.line, { paddingTop: 5, marginBottom: 15 }]}>
          <Text style={styles.completedTitle}>Completed</Text>
          <View style={styles.buttonItems}>
            <TouchableOpacity>
              <Image
                style={styles.nextButton}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.center}>{<DoneToDos />}</View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  plus: {
    width: 40,
    height: 40,
  },
  headerImageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 90,
    height: 90,
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
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  completedTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    paddingLeft: 4,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
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
  itemText: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    flex: 1,
  },
  itemText2: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  nextButton: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 20,
    width: width - 30,
  },
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(215, 246, 255, 0.35)",
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    borderColor: "rgba(204, 204, 204, 0.728)",
    width: width - 30,
    height: 240,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttonText: {
    color: "rgba(37, 67, 107, 0.6)",
    fontFamily: "Sego",
    paddingBottom: 15,
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
