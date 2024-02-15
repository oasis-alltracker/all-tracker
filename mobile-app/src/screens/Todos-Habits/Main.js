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
import CreateHabitModal from "./modals/CreateHabitModal";
import UpdateHabitStatusModal from "./modals/UpdateHabitStatusModal";
import moment from "moment";

export default function Main({day, statusList, trackingPreferences, updateDate, createHabit, refreshHabits, updateHabitStatusCount, onHabitStatusUpdate}) {
  const createHabitRef = useRef(null);
  const updateHabitsStatusRef = useRef(null);
  const today = new Date();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.containerMain}
      scrollEnabled={false}
    >
      <View style={styles.imageConMain}>
        <Image
          style={styles.imageMain}
          source={require("../../assets/images/mind-white.png")}
        />
      </View>
      <View style={styles.dateLineMain}>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => updateDate(-1)}
        >
          <Image
            style={[styles.preButtonMain, styles.nextButtonMain]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <>
          {moment(day).format("YYYYMMDD") ==
          moment(today).format("YYYYMMDD") ? (
            <Text style={styles.dateNameMain}>Today</Text>
          ) : (
            <Text style={styles.dateNameMain}>
              {day.toDateString().slice(4)}
            </Text>
          )}
        </>
        <TouchableOpacity
          style={styles.buttonMain}
          onPress={() => updateDate(1)}
        >
          <Image
            style={styles.preButtonMain}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.lineMain}>
        <Text style={styles.titleMain}>Habits</Text>
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
        {trackingPreferences.toDosSelected ? (
          <ScrollView
            horizontal={true}
            contentContainerStyle={[styles.habitScrollContainter]}
            showsHorizontalScrollIndicator={false}
          >
            {statusList.length > 0 ? (
              <>
                {statusList.map((val, key) => {
                  return val.isPositive ? (
                    val.count === undefined || val.count < val.threshold ? (
                      <TouchableOpacity
                        style={[
                          styles.habitButton,
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
                          style={styles.habitImage}
                          source={{ uri: val.pngURL }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.habitButton,
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
                          style={styles.habitImage}
                          source={{ uri: val.pngURL }}
                          resizeMode="cover"
                        >
                          <Image
                            style={styles.habitImage}
                            source={require("../../assets/images/check-mark.png")}
                          />
                        </ImageBackground>
                      </TouchableOpacity>
                    )
                  ) : val.count === undefined || val.count < val.threshold ? (
                    <TouchableOpacity
                      style={[
                        styles.habitButton,
                        { backgroundColor: "rgba(255, 207, 245, 0.65)" },
                      ]}
                      key={key.toString()}
                      onPress={() => {
                        var count = 1;
                        var SK = `${moment(day).format("YYYYMMDD")}-${val.SK}`;
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
                        style={styles.habitImage}
                        source={{ uri: val.pngURL }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.habitButton,
                        {
                          backgroundColor: "rgb(255, 255, 255)",
                          borderColor: "#CCCCCC",
                          borderWidth: 1,
                        },
                      ]}
                      key={key.toString()}
                      onPress={() => {
                        var count = 1;
                        var SK = `${moment(day).format("YYYYMMDD")}-${val.SK}`;
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
                          style={styles.habitImage}
                          source={require("../../assets/images/x-mark.png")}
                        />
                    </TouchableOpacity>
                  );
                })}
              </>
            ) : (
              <>
                  <TouchableOpacity
                      style={[
                        styles.habitButton,
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
                        style={styles.habitImage}
                        source={require("../../assets/images/plus512.png")}
                      />

                  </TouchableOpacity>
              </>
            )}
          </ScrollView>
        ) : (
          <ScrollView
            horizontal={true}
            contentContainerStyle={[styles.habitScrollContainterMainNoToDo]}
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
                          style={styles.habitImageMainNoToDo}
                          source={{ uri: val.pngURL }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.habitButtonMainNoToDo,
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
                          style={styles.habitImageMainNoToDo}
                          source={{ uri: val.pngURL }}
                          resizeMode="cover"
                        >
                          <Image
                            style={styles.habitImageMainNoToDo}
                            source={require("../../assets/images/check-mark.png")}
                          />
                        </ImageBackground>
                      </TouchableOpacity>
                    )
                  ) : val.count === undefined || val.count < val.threshold ? (
                    <TouchableOpacity
                      style={[
                        styles.habitButtonMainNoToDo,
                        { backgroundColor: "rgba(255, 207, 245, 0.65)" },
                      ]}
                      key={key.toString()}
                      onPress={() => {
                        var count = 1;
                        var SK = `${moment(day).format("YYYYMMDD")}-${val.SK}`;
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
                        style={styles.habitImageMainNoToDo}
                        source={{ uri: val.pngURL }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.habitButtonMainNoToDo,
                        {
                          backgroundColor: "rgb(255, 255, 255)",
                          borderColor: "#CCCCCC",
                          borderWidth: 1,
                        },
                      ]}
                      key={key.toString()}
                      onPress={() => {
                        var count = 1;
                        var SK = `${moment(day).format("YYYYMMDD")}-${val.SK}`;
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
                        style={styles.habitImageMainNoToDo}
                        source={{ uri: val.pngURL }}
                        resizeMode="cover"
                      >
                        <Image
                          style={styles.habitImageMainNoToDo}
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
                        styles.habitButtonMainNoToDo,
                        {
                          backgroundColor: "rgb(255, 255, 255)",
                          borderColor: "rgba(172, 197, 204, 0.75)",
                          borderWidth: 1,
                        },
                      ]}
                      onPress={() => {
                        createHabitRef.current.open();
                      }}
                    >
                      <Image
                        style={styles.habitImageMainNoToDo}
                        source={require("../../assets/images/plus512.png")}
                      />

                  </TouchableOpacity>
              </>
            )}
          </ScrollView>
        )}
      </View>

      {/* <View style={[styles.lineMain, { marginBottom: 10 }]}>
        <Text style={styles.titleMain}>To-dos</Text>
        <View style={styles.buttonItems}>
          <TouchableOpacity
            onPress={() => {
              modalRef1.current.open();
            }}
          >
            <Image
              style={styles.plusMain}
              source={require("../../assets/images/plus512.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
            }}
          >
            <Image
              style={styles.refresh}
              source={require("../../assets/images/reload.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      {todos.map((item, index) => (
        <RenderTodos
          onPress={() => {
            modalRef.current.open(true, {
              title: "Meditate",
              status: "Bad",
              count: "3",
            });
          }}
          key={index}
          item={item}
        />
      ))} */}
      <UpdateHabitStatusModal
        getRef={(ref) => (updateHabitsStatusRef.current = ref)}
        onHabitStatusUpdate={onHabitStatusUpdate}
        refreshHabits={refreshHabits}
      />
      <CreateHabitModal
        getRef={(ref) => (createHabitRef.current = ref)}
        createHabit={createHabit}
      />
    </ScrollView>
  );
}

export const RenderTodos = ({ onPress = () => {} }) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemMain}>
      <TouchableOpacity
        onPress={() => setIsCheck((pr) => !pr)}
        style={styles.checkMain}
      >
        {isCheck && (
          <Image
            style={styles.checkImageMain}
            source={require("../../assets/images/check.png")}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.itemTextMain}>Clean laundry</Text>
      <Text style={styles.itemText2Main}>Overdue</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  imageConMain: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageMain: {
    width: 100,
    height: 100,
    tintColor: "#25436B",
  },
  imageTextMain: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  preButtonMain: {
    width: 30,
    height: 30,
  },
  nextButtonMain: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateLineMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  buttonMain: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "#ccc",
    borderLeftColor: "#ccc",
  },
  dateNameMain: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
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
  lineMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  habitScrollContainterMain: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 2,
    paddingTop: 2,
    marginTop: 10,
    height: 300,
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
  titleMain: {
    fontSize: 36,
    color: "#25436B",
    fontFamily: "Sego",
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
  itemText2Main: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  buttonItems: {
    alignItems: "center",
    justifyContent: "space-between",
    marginRight:5
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

///////////////////////MAINNNN
