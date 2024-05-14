import React, { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import UpdateHabitStatusModal from "./modals/UpdateHabitStatusModal";
import moment from "moment";
import { sharedStyles } from "../styles";

export default function Main({
  day,
  statusList,
  toDos,
  tasks,
  trackingPreferences,
  isLoading,
  updateDate,
  createHabitRef,
  taskRef,
  refreshHabits,
  updateHabitStatusCount,
  onHabitStatusUpdate,
  updateTaskStatus,
  updateToDoStatus,
}) {
  const updateHabitsStatusRef = useRef(null);
  const today = new Date();
  const tasksAndToDos = toDos.concat(tasks);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sharedStyles.container}
        scrollEnabled={false}
        removeClippedSubviews={false}
      >
        <Spinner visible={isLoading}></Spinner>

        <View
          style={[
            sharedStyles.headerImageContainer,
            {
              backgroundColor: "rgba(255, 207, 245, 0.65)",
              borderColor: "rgba(255, 207, 245, 0.70)",
            },
          ]}
        >
          <Image
            style={sharedStyles.headerImage}
            source={require("../../assets/images/mind-white.png")}
          />
        </View>

        <View style={sharedStyles.datePickerView}>
          <TouchableOpacity
            style={sharedStyles.changeDateButton}
            onPress={() => updateDate(-1)}
          >
            <Image
              style={[sharedStyles.decreaseDateImage]}
              source={require("../../assets/images/left.png")}
            />
          </TouchableOpacity>
          <>
            {moment(day).format("YYYYMMDD") ==
            moment(today).format("YYYYMMDD") ? (
              <Text style={sharedStyles.dateText}>Today</Text>
            ) : (
              <Text style={sharedStyles.dateText}>
                {day.toDateString().slice(4, -4)}
              </Text>
            )}
          </>
          <TouchableOpacity
            style={sharedStyles.changeDateButton}
            onPress={() => updateDate(1)}
          >
            <Image
              style={sharedStyles.increaseDateImage}
              source={require("../../assets/images/left.png")}
            />
          </TouchableOpacity>
        </View>

        {trackingPreferences.habitsSelected && (
          <>
            <View style={sharedStyles.trackerDashView}>
              <Text style={sharedStyles.trackerTitle}>Habits</Text>
              <View style={styles.buttonItems}>
                <TouchableOpacity
                  onPress={() => {
                    createHabitRef.current.open();
                  }}
                >
                  <Image
                    style={styles.plusMain}
                    source={require("../../assets/images/plus512.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={[styles.habitScrollContainterMain]}
                showsHorizontalScrollIndicator={false}
              >
                {statusList.length > 0 ? (
                  <>
                    {statusList.map((val, key) => {
                      return val.isPositive ? (
                        val.count === undefined || val.count < val.threshold ? (
                          <TouchableOpacity
                            style={[
                              styles.habitButtonMainNoToDo,
                              { backgroundColor: "rgba(215, 246, 255, 0.65)" },
                            ]}
                            key={key.toString()}
                            onPress={() => {
                              var count = 1;
                              var SK = `${moment(day).format("YYYYMMDD")}-${
                                val.SK
                              }`;
                              if (val.count !== undefined) {
                                count = val.count + 1;
                                SK = val.SK;
                              }

                              updateHabitStatusCount(val, count);

                              updateHabitsStatusRef.current.open(true, {
                                name: val.name,
                                SK: SK,
                                count: count,
                                isPositive: val.isPositive,
                                threshold: val.threshold,
                              });
                            }}
                          >
                            <Image
                              style={styles.habitImageMain}
                              source={{ uri: val.pngURL }}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={[
                              styles.habitButtonMain,
                              {
                                backgroundColor: "rgb(255, 255, 255)",
                                borderColor: "#CCCCCC",
                                borderWidth: 1,
                              },
                            ]}
                            key={key.toString()}
                            onPress={() => {
                              var count = 1;
                              var SK = `${moment(day).format("YYYYMMDD")}-${
                                val.SK
                              }`;
                              if (val.count !== undefined) {
                                count = val.count + 1;
                                SK = val.SK;
                              }

                              updateHabitStatusCount(val, count);

                              updateHabitsStatusRef.current.open(true, {
                                name: val.name,
                                SK: SK,
                                count: count,
                                isPositive: val.isPositive,
                                threshold: val.threshold,
                              });
                            }}
                          >
                            <ImageBackground
                              style={styles.habitImageMain}
                              source={{ uri: val.pngURL }}
                              resizeMode="cover"
                            >
                              <Image
                                style={styles.habitImageMain}
                                source={require("../../assets/images/check-mark.png")}
                              />
                            </ImageBackground>
                          </TouchableOpacity>
                        )
                      ) : val.count === undefined ||
                        val.count < val.threshold ? (
                        <TouchableOpacity
                          style={[
                            styles.habitButtonMain,
                            { backgroundColor: "rgba(255, 207, 245, 0.65)" },
                          ]}
                          key={key.toString()}
                          onPress={() => {
                            var count = 1;
                            var SK = `${moment(day).format("YYYYMMDD")}-${
                              val.SK
                            }`;
                            if (val.count !== undefined) {
                              count = val.count + 1;
                              SK = val.SK;
                            }

                            updateHabitStatusCount(val, count);

                            updateHabitsStatusRef.current.open(true, {
                              name: val.name,
                              SK: SK,
                              count: count,
                              isPositive: val.isPositive,
                              threshold: val.threshold,
                            });
                          }}
                        >
                          <Image
                            style={styles.habitImageMain}
                            source={{ uri: val.pngURL }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[
                            styles.habitButtonMain,
                            {
                              backgroundColor: "rgb(255, 255, 255)",
                              borderColor: "#CCCCCC",
                              borderWidth: 1,
                            },
                          ]}
                          key={key.toString()}
                          onPress={() => {
                            var count = 1;
                            var SK = `${moment(day).format("YYYYMMDD")}-${
                              val.SK
                            }`;
                            if (val.count !== undefined) {
                              count = val.count + 1;
                              SK = val.SK;
                            }

                            updateHabitStatusCount(val, count);

                            updateHabitsStatusRef.current.open(true, {
                              name: val.name,
                              SK: SK,
                              count: count,
                              isPositive: val.isPositive,
                              threshold: val.threshold,
                            });
                          }}
                        >
                          <ImageBackground
                            style={styles.habitImageMain}
                            source={{ uri: val.pngURL }}
                            resizeMode="cover"
                          >
                            <Image
                              style={styles.habitImageMain}
                              source={require("../../assets/images/x-mark.png")}
                            />
                          </ImageBackground>
                        </TouchableOpacity>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.habitButtonMain,
                        {
                          backgroundColor: "rgb(255, 255, 255)",
                          borderColor: "#CCCCCC",
                          borderWidth: 1,
                        },
                      ]}
                      onPress={() => {
                        createHabitRef.current.open();
                      }}
                    >
                      <Image
                        style={styles.habitImageMain}
                        source={require("../../assets/images/plus512.png")}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </ScrollView>
            </View>
          </>
        )}

        {trackingPreferences.toDosSelected && (
          <>
            <View style={[sharedStyles.trackerDashView]}>
              <Text style={sharedStyles.trackerTitle}>To-dos</Text>
              <View style={styles.buttonItems}>
                <TouchableOpacity
                  onPress={() => {
                    taskRef.current.open();
                  }}
                >
                  <Image
                    style={styles.plusMain}
                    source={require("../../assets/images/plus512.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {tasksAndToDos.length > 0 ? (
              <>
                {tasksAndToDos.map((item, index) => (
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
                    key={index}
                    item={item}
                    updateTaskStatus={updateTaskStatus}
                    updateToDoStatus={updateToDoStatus}
                  />
                ))}
              </>
            ) : (
              <>
                <Text style={styles.quoteText}>
                  "Luck is the residue of hard work."
                </Text>
              </>
            )}
          </>
        )}
      </ScrollView>
      <UpdateHabitStatusModal
        getRef={(ref) => (updateHabitsStatusRef.current = ref)}
        onHabitStatusUpdate={onHabitStatusUpdate}
        refreshHabits={refreshHabits}
      />
    </>
  );
}

export const RenderTodos = ({
  onPress = () => {},
  item,
  updateTaskStatus,
  updateToDoStatus,
}) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemMain}>
      <TouchableOpacity
        onPress={() => {
          if (!item.isLocked) {
            setIsCheck((pr) => !pr);
            if (item.PK.includes("task")) {
              updateTaskStatus(item);
            } else {
              updateToDoStatus(item);
            }
          }
        }}
        style={styles.checkMain}
      >
        {isCheck && (
          <Image
            style={styles.checkImageMain}
            source={require("../../assets/images/check.png")}
          />
        )}
      </TouchableOpacity>
      {isCheck ? (
        <Text style={styles.itemTextMainStrikeThru}>{item.name}</Text>
      ) : (
        <Text style={styles.itemTextMain}>{item.name}</Text>
      )}

      <Text style={styles.itemText2Main}>logic</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emptyHabits: {
    fontSize: 20,
    color: "#25436B",
    fontFamily: "Sego",
    paddingLeft: 15,
  },
  plusMain: {
    width: 40,
    height: 40,
  },
  refresh: {
    width: 30,
    height: 30,
  },
  habitScrollContainterMain: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 2,
    paddingTop: 2,
    marginTop: 10,
    height: 160,
  },
  habitScrollContainterMainNoToDo: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 2,
    paddingHorizontal: 20,
    paddingTop: 2,
    marginTop: 10,
    height: 160,
  },
  habitImageMain: {
    width: 80,
    height: 80,
  },

  habitButtonMain: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0)",
  },
  habitImageMainNoToDo: {
    width: 80,
    height: 80,
  },

  habitButtonMainNoToDo: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0)",
  },
  contentContainerStyleMain: {
    paddingHorizontal: 20,
  },
  itemMain: {
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
  checkMain: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkImageMain: {
    width: 20,
    height: 20,
  },
  itemTextMain: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    flex: 1,
  },
  itemTextMainStrikeThru: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    flex: 1,
    textDecorationLine: "line-through",
  },
  itemText2Main: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  buttonItems: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
  quoteText: {
    fontFamily: "Sego",
    color: "#25436B",
    fontSize: 16,
    marginTop: 20,
  },
});
