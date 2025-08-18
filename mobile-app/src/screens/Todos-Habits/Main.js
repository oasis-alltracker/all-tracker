import React, { useRef, useState, useEffect, memo, useContext } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { todoCompare } from "../../utils/commonUtils";
import UpdateHabitStatusModal from "./modals/UpdateHabitStatusModal";
import moment from "moment";
import { sharedStyles } from "../styles";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";

const Main = ({
  day,
  statusList,
  dueToDos,
  dueTasks,
  trackingPreferences,
  updateDate,
  createHabitRef,
  taskRef,
  refreshHabits,
  updateHabitStatusCount,
  onHabitStatusUpdate,
  updateDueToDoStatus,
  updateDueTaskStatus,
}) => {
  const theme = useContext(ThemeContext).value;
  const updateHabitsStatusRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const today = new Date();
  const [tasksAndToDos, setTasksAndToDos] = useState([]);
  const [toDosHeight, setToDosHeight] = useState(height * 0.2);

  useEffect(() => {
    var tempTasksAndToDos = dueToDos.concat(dueTasks);
    tempTasksAndToDos.sort((a, b) => todoCompare(a, b));
    setTasksAndToDos(tempTasksAndToDos);
  }, [dueToDos, dueTasks]);

  useEffect(() => {
    if (trackingPreferences.habitsSelected) {
      setToDosHeight(height * 0.26);
    } else {
      setToDosHeight(height * 0.5);
    }
  }, [trackingPreferences]);

  const RenderMainTodos = ({
    onPress = () => {},
    currentDay,
    item,
    updateDueTaskStatus,
    updateDueToDoStatus,
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
          Number(day)
        );
        setItemDate(newItemDate);
      } else {
        setItemDate("noDueDate");
      }
    }, []);

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.itemRenderMain, sharedStyles["border_" + theme]]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={async () => {
              setIsCheck((pr) => !pr);
              item.selected = !item.selected;
              if (item.PK.includes("task")) {
                var nextDueDate = await updateDueTaskStatus(item);
                var year = nextDueDate.substring(0, 4);
                var month = nextDueDate.substring(4, 6);
                var day = nextDueDate.substring(6, 8);
                var newItemDate = new Date(
                  Number(year),
                  Number(month) - 1,
                  Number(day)
                );
                setItemDate(newItemDate);
                if (item.selected) {
                  item.completionList.push(item.nextDueDate);
                  item.nextDueDate = nextDueDate;
                } else {
                  item.completionList.pop();
                  item.nextDueDate = nextDueDate;
                }
              } else {
                await updateDueToDoStatus(item);
              }
            }}
            style={[styles.checkRender, sharedStyles["border_" + theme]]}
          >
            {isCheck && (
              <Image
                style={styles.checkImageRender}
                source={require("../../assets/images/check.png")}
              />
            )}
          </TouchableOpacity>
          <View style={{ width: width * 0.63 }}>
            {isCheck ? (
              <Text
                style={[
                  styles.itemRenderTextMainStrikeThru,
                  sharedStyles["textColour_" + theme],
                ]}
              >
                {item.name}
              </Text>
            ) : (
              <Text
                style={[
                  styles.itemRenderTextMain,
                  sharedStyles["textColour_" + theme],
                ]}
              >
                {item.name}
              </Text>
            )}
          </View>
        </View>
        {itemDate != "noDueDate" && (
          <>
            {item.toDoID ? (
              <>
                {moment(itemDate).format("YYYYMMDD") ==
                moment(currentDay).format("YYYYMMDD") ? (
                  <Text
                    style={[
                      styles.dueTodayText,
                      sharedStyles["textColour_" + theme],
                    ]}
                  >
                    Today
                  </Text>
                ) : (
                  <>
                    {moment(itemDate).format("YYYYMMDD") <
                    moment(currentDay).format("YYYYMMDD") ? (
                      <Text style={styles.itemRenderText2Main}>
                        {itemDate.toDateString().slice(4, -4)}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.itemRenderText3Main,
                          sharedStyles["textColour_" + theme],
                        ]}
                      >
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
                  <Text
                    style={[
                      styles.dueTodayText,
                      sharedStyles["textColour_" + theme],
                    ]}
                  >
                    Today
                  </Text>
                ) : (
                  <>
                    {moment(itemDate).format("YYYYMMDD") <
                    moment(currentDay).format("YYYYMMDD") ? (
                      <Text style={styles.itemRenderText2Main}>
                        {itemDate.toDateString().slice(4, -4)}
                      </Text>
                    ) : (
                      <Text
                        style={[
                          styles.itemRenderText3Main,
                          sharedStyles["textColour_" + theme],
                        ]}
                      >
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

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={sharedStyles.container}
        scrollEnabled={false}
        removeClippedSubviews={false}
      >
        <View
          style={[sharedStyles.headerImageContainer, styles.imageContainer]}
        >
          <Image
            style={[sharedStyles.headerImage, sharedStyles.tint_light]}
            source={require("../../assets/images/mind-white.png")}
          />
        </View>

        <View style={sharedStyles.datePickerView}>
          <TouchableOpacity
            style={[
              sharedStyles.changeDateButton,
              sharedStyles["changeDateButton_" + theme],
            ]}
            onPress={() => updateDate(-1)}
          >
            <Image
              style={[sharedStyles.decreaseDateImage]}
              source={require("../../assets/images/left.png")}
            />
          </TouchableOpacity>
          <>
            <View style={sharedStyles.dateTextContainer}>
              {moment(day).format("YYYYMMDD") ==
              moment(today).format("YYYYMMDD") ? (
                <Text
                  style={[
                    sharedStyles.dateText,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  Today
                </Text>
              ) : (
                <Text
                  style={[
                    sharedStyles.dateText,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  {day.toDateString().slice(4, -5)}
                </Text>
              )}
            </View>
          </>
          <TouchableOpacity
            style={[
              sharedStyles.changeDateButton,
              sharedStyles["changeDateButton_" + theme],
            ]}
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
              <Text
                style={[
                  sharedStyles.trackerTitle,
                  sharedStyles["trackerTitleColour_" + theme],
                ]}
              >
                Habits
              </Text>
              <View style={styles.buttonItems}>
                <TouchableOpacity
                  onPress={() => {
                    createHabitRef.current.open();
                  }}
                >
                  <Image
                    style={[styles.plusMain, sharedStyles["tint_" + theme]]}
                    source={require("../../assets/images/plus512.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "100%" }}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={[styles.habitScrollContainerMain]}
                showsHorizontalScrollIndicator={false}
              >
                {statusList.length > 0 ? (
                  <>
                    {statusList.map((val, key) => {
                      return val.isPositive ? (
                        val.count === undefined || val.count < val.threshold ? (
                          <TouchableOpacity
                            style={[
                              styles.habitButtonMain,
                              styles["habitButtonColour_" + theme],
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
                              styles.habitButtonBordered,
                              sharedStyles["borderedContainer_" + theme],
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
                            styles.habitButtonBordered,
                            sharedStyles["borderedContainer_" + theme],
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
                        styles.habitButtonBordered,
                        sharedStyles["borderedContainer_" + theme],
                      ]}
                      onPress={() => {
                        createHabitRef.current.open();
                      }}
                    >
                      <Image
                        style={[
                          styles.habitImageMain,
                          sharedStyles["tint_" + theme],
                        ]}
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
              <Text
                style={[
                  sharedStyles.trackerTitle,
                  sharedStyles["trackerTitleColour_" + theme],
                ]}
              >
                To-dos
              </Text>
              <View style={styles.buttonItems}>
                <TouchableOpacity
                  onPress={() => {
                    taskRef.current.open();
                  }}
                >
                  <Image
                    style={[styles.plusMain, sharedStyles["tint_" + theme]]}
                    source={require("../../assets/images/plus512.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {tasksAndToDos.length > 0 ? (
              <View style={{ height: toDosHeight }}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.toDoScrollContainer,
                    { width: width - 30 },
                  ]}
                >
                  {tasksAndToDos.map((item, index) => (
                    <RenderMainTodos
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
                      currentDay={day}
                      key={index}
                      item={item}
                      updateDueTaskStatus={updateDueTaskStatus}
                      updateDueToDoStatus={updateDueToDoStatus}
                    />
                  ))}
                </ScrollView>
              </View>
            ) : (
              <View style={{ width: "100%", textAlign: "left" }}>
                <Text
                  style={[
                    styles.quoteText,
                    sharedStyles["textColour_" + theme],
                  ]}
                >
                  - "Luck is the residue of hard work."
                </Text>
              </View>
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
};
export default memo(Main);

const styles = StyleSheet.create({
  plusMain: {
    width: 40,
    height: 40,
  },
  habitScrollContainerMain: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    height: 130,
  },
  habitImageMain: {
    width: 60,
    height: 60,
  },
  habitButtonMain: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  habitButtonBordered: {
    borderWidth: 1,
  },
  habitButtonColour_light: {
    backgroundColor: ValueSheet.colours.light.secondaryColour65,
  },
  habitButtonColour_dark: {
    backgroundColor: ValueSheet.colours.dark.secondaryColour65,
  },
  buttonItems: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 5,
  },
  quoteText: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 15,
    marginTop: 22,
    paddingHorizontal: 40,
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
  },
  itemRenderMain: {
    flexDirection: "row",
    borderWidth: 2,
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
    alignItems: "center",
    justifyContent: "center",
  },
  checkImageRender: {
    width: 20,
    height: 20,
  },
  itemRenderTextMain: {
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginLeft: 20,
    paddingVertical: 5,
    flex: 1,
    paddingRight: 5,
  },
  itemRenderTextMainStrikeThru: {
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginLeft: 20,
    paddingVertical: 5,
    flex: 1,
    textDecorationLine: "line-through",
    paddingRight: 5,
  },
  itemRenderText2Main: {
    color: ValueSheet.colours.light.borderPink,
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingRight: 6,
  },
  itemRenderText3Main: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingRight: 6,
  },
  dueTodayText: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingRight: 3,
  },
  imageContainer: {
    backgroundColor: ValueSheet.colours.light.pink65,
    borderColor: ValueSheet.colours.light.borderPink70,
  },
});
