import React, { useState, useEffect, memo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import moment from "moment";

import Spinner from "react-native-loading-spinner-overlay";

const { width, height } = Dimensions.get("window");

const MyTasks = ({
  isLoading,
  taskRef,
  toDos,
  tasks,
  doneToDos,
  updateTaskStatus,
  updateToDoStatus,
}) => {
  const [tasksAndToDos, setTasksAndToDos] = useState([]);
  const [completedToDos, setCompletedToDos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const [myTasksHeight, setMyTasksHeight] = useState(290);
  const [completedRotation, setCompletedRotation] = useState("0deg");

  const today = new Date();

  useEffect(() => {
    setTasksAndToDos(toDos.concat(tasks));
    setCompletedToDos([...doneToDos]);
  }, [toDos, tasks, doneToDos]);

  const RenderMyTaskTodos = ({
    onPress = () => {},
    currentDay,
    item,
    updateTaskStatus,
    updateToDoStatus,
    isMainPage,
  }) => {
    const [isCheck, setIsCheck] = useState(false);
    const [itemDate, setItemDate] = useState("noDueDate");

    useEffect(() => {
      if (item.isComplete || item.selected) {
        setIsCheck(true);
      } else {
        setIsCheck(false);
      }

      var itemDateStamp = "noDueDate";
      if (!item.toDoID) {
        itemDateStamp = item.nextDueDate;
      } else if (item.dateStamp != "noDueDate") {
        itemDateStamp = item.dateStamp;
      }

      if (itemDateStamp != "noDueDate") {
        var year = itemDateStamp.substring(0, 4);
        var month = itemDateStamp.substring(4, 6);
        var day = itemDateStamp.substring(6, 8);

        var newItemDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );
        setItemDate(newItemDate);
      } else {
        setItemDate("noDueDate");
      }
    }, []);

    return (
      <TouchableOpacity onPress={onPress} style={styles.itemRenderMain}>
        <TouchableOpacity
          onPress={async () => {
            setIsCheck((pr) => !pr);
            if (item.PK.includes("task")) {
              await updateTaskStatus(item, isMainPage);
            } else {
              await updateToDoStatus(item, false);
            }
          }}
          style={styles.checkRender}
        >
          {isCheck && (
            <Image
              style={styles.checkImageRender}
              source={require("../../assets/images/check.png")}
            />
          )}
        </TouchableOpacity>
        {isCheck ? (
          <Text style={styles.itemRenderTextMainStrikeThru}>{item.name}</Text>
        ) : (
          <Text style={styles.itemRenderTextMain}>{item.name}</Text>
        )}
        {itemDate != "noDueDate" && (
          <>
            {item.toDoID ? (
              <>
                {moment(itemDate).format("YYYYMMDD") ==
                moment(currentDay).format("YYYYMMDD") ? (
                  <Text style={styles.dueTodayText}>Today</Text>
                ) : (
                  <>
                    {moment(itemDate).format("YYYYMMDD") <
                    moment(currentDay).format("YYYYMMDD") ? (
                      <Text style={styles.itemRenderText2Main}>
                        {itemDate.toDateString().slice(4, -4)}
                      </Text>
                    ) : (
                      <Text style={styles.itemRenderText3Main}>
                        {itemDate.toDateString().slice(4, -4)}
                      </Text>
                    )}
                  </>
                )}
              </>
            ) : (
              <View>
                {moment(itemDate).format("YYYYMMDD") ==
                moment(currentDay).format("YYYYMMDD") ? (
                  <Text style={styles.dueTodayText}>Today</Text>
                ) : (
                  <>
                    {moment(itemDate).format("YYYYMMDD") <
                    moment(currentDay).format("YYYYMMDD") ? (
                      <Text style={styles.itemRenderText2Main}>
                        {itemDate.toDateString().slice(4, -4)}
                      </Text>
                    ) : (
                      <Text style={styles.itemRenderText3Main}>
                        {itemDate.toDateString().slice(4, -4)}
                      </Text>
                    )}
                  </>
                )}
                <Image
                  style={styles.repeatImage}
                  resizeMode="contain"
                  source={require("../../assets/images/repeat.png")}
                />
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    );
  };

  const Tasks = () => {
    return (
      <View style={{ height: myTasksHeight }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {tasksAndToDos.map((item, index) => {
            return (
              <RenderMyTaskTodos
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
                isMainPage={false}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

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
    <View style={{ height: 120 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {completedToDos.map((item, index) => {
          return (
            <RenderMyTaskTodos
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
            <TouchableOpacity
              onPress={() => {
                if (showCompleted) {
                  setShowCompleted(false);
                  setMyTasksHeight(290);
                  setCompletedRotation("0deg");
                } else {
                  setShowCompleted(true);
                  setMyTasksHeight(190);
                  setCompletedRotation("90deg");
                }
              }}
            >
              <Image
                style={[
                  styles.nextButton,
                  {
                    transform: [
                      {
                        rotate: completedRotation,
                      },
                    ],
                  },
                ]}
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        {showCompleted && <View style={styles.center}>{<DoneToDos />}</View>}
      </ScrollView>
    </>
  );
};
export default memo(MyTasks);

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
    height: 190,
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
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  repeatImage: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  toDoScrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 20,
    width: width - 30,
  },
  repeatImage: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  toDoScrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 20,
    width: width - 30,
  },
  itemRenderMain: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkRender: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkImageRender: {
    width: 20,
    height: 20,
  },
  itemRenderTextMain: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    paddingVertical: 5,
    flex: 1,
  },
  itemRenderTextMainStrikeThru: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    paddingVertical: 5,
    flex: 1,
    textDecorationLine: "line-through",
  },
  itemRenderText2Main: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  itemRenderText3Main: {
    color: "#25436B",
    fontSize: 13,
    fontFamily: "Sego",
  },
  dueTodayText: {
    color: "#25436B",
    fontSize: 13,
    fontFamily: "Sego",
    paddingRight: 16,
  },
});
