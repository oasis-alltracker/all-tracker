import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import RNModal from "react-native-modal";
import { Image, TouchableOpacity, Platform } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import { ValueSheet } from "../../../ValueSheet";

export default function UpdateHabitStatusModal({
  getRef,
  onHabitStatusUpdate,
  refreshHabits,
}) {
  const [visible, setVisible] = useState(false);

  const [isPositive, setIsPositive] = useState(false);
  const [SK, setSK] = useState(false);
  const [count, setCount] = useState(0);
  const [name, setName] = useState(0);
  const [threshold, setThreshold] = useState(false);

  useEffect(() => {
    let ref = {
      open(isEdit = false, props) {
        setVisible(true);

        setName(props.name);
        setSK(props.SK);
        setIsPositive(props.isPositive);
        setCount(props.count);
        setThreshold(props.threshold);

        if (props.count >= props.threshold) {
          setCount(props.threshold);
          if (props.isPositive) {
            if (Platform.OS === "ios") {
              Toast.show("Habit complete. Great job!", {
                ...styles.positiveToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
              });
            } else {
              Toast.show("Habit complete. Great job!", {
                ...styles.positiveToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
              });
            }
          } else {
            if (Platform.OS === "ios") {
              Toast.show("You striked out. Try again tomorrow!", {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
              });
            } else {
              Toast.show("You striked out. Try again tomorrow!", {
                ...styles.errorToast,
                duration: Toast.durations.LONG,
                position: Toast.positions.TOP,
              });
            }
          }
        }
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  const backDropPressed = async () => {
    const habit = {
      isPositive: isPositive,
      SK: SK,
      count: count,
      name: name,
    };
    onHabitStatusUpdate(habit, count);
    setVisible(false);
  };

  const onSave = async () => {
    const habit = {
      isPositive: isPositive,
      SK: SK,
      count: count,
      name: name,
    };
    setVisible(false);
    onHabitStatusUpdate(habit, count);
  };

  const onMinusPressed = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const onPlusPressed = () => {
    if (threshold - count == 1) {
      if (isPositive) {
        if (Platform.OS === "ios") {
          Toast.show("Habit complete. Great job!", {
            ...styles.positiveToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        } else {
          Toast.show("Habit complete. Great job!", {
            ...styles.positiveToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          });
        }
      } else {
        if (Platform.OS === "ios") {
          Toast.show("You striked out. Try again tomorrow!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        } else {
          Toast.show("You striked out. Try again tomorrow!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          });
        }
      }
    }
    if (count >= threshold) {
      if (isPositive) {
        if (Platform.OS === "ios") {
          Toast.show("Habit complete. Great job!", {
            ...styles.positiveToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        } else {
          Toast.show("Habit complete. Great job!", {
            ...styles.positiveToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          });
        }
      } else {
        if (Platform.OS === "ios") {
          Toast.show("You striked out. Try again tomorrow!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
        } else {
          Toast.show("You striked out. Try again tomorrow!", {
            ...styles.errorToast,
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
          });
        }
      }
    } else {
      setCount(count + 1);
    }
  };

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => backDropPressed()}
      onBackdropPress={() => backDropPressed()}
      backdropColor={ValueSheet.colours.secondaryColour27}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.inputTitle}>{name}</Text>
        </View>

        <View style={styles.statusRow}>
          <TouchableOpacity
            onPress={() => onMinusPressed()}
            style={styles.countButton}
          >
            <Image
              style={styles.plusMain}
              source={require("../../../assets/images/remove.png")}
            />
          </TouchableOpacity>

          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count}</Text>
          </View>
          <View style={styles.thresholdContainer}>
            <Text style={styles.thresholdText}>/ {threshold}</Text>
          </View>

          <TouchableOpacity
            onPress={() => onPlusPressed()}
            style={styles.countButton}
          >
            <Image
              style={styles.plusMain}
              source={require("../../../assets/images/plus512.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomTextContainer}>
          {count == 0 ? (
            <>
              <Text style={styles.bottomText}>Keep at it!</Text>
            </>
          ) : (
            <>
              {count >= threshold ? (
                <>
                  <Text style={styles.bottomText}>Congatulations!</Text>
                </>
              ) : (
                <>
                  <Text style={styles.bottomText}>Almost there!</Text>
                </>
              )}
            </>
          )}
        </View>
        <View style={styles.row2}>
          <Button
            onPress={() => backDropPressed()}
            style={[styles.button, styles.back]}
          >
            Close
          </Button>
          <Button onPress={() => onSave()} style={styles.button}>
            Ok
          </Button>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    width: "90%",
    paddingVertical: 20,
    backgroundColor: ValueSheet.colours.background,
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: ValueSheet.colours.black50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 12,
    marginHorizontal: 15,
  },
  bottomTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 22,
  },
  inputTitle: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 37,
    fontFamily: ValueSheet.fonts.primaryBold,
    flex: 1,
    lineHeight: 38,
    marginTop: 15,
    paddingTop: 10,
  },
  bottomText: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  countText: {
    color: ValueSheet.colours.black50,
    fontSize: 38,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  countContainer: {
    borderRadius: 5,
    width: 60,
    marginLeft: 15,
    marginRight: 0,
    borderColor: ValueSheet.colours.borderGrey75,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
  thresholdText: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 38,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  thresholdContainer: {
    borderRadius: 5,
    width: 100,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
  back: {
    backgroundColor: "transparent",
    borderColor: ValueSheet.colours.grey,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 15,
  },
  button: {
    width: "47%",
  },
  plusMain: {
    width: 40,
    height: 40,
  },
  countButton: {
    paddingHorizontal: 0,
  },
  positiveToast: {
    backgroundColor: ValueSheet.colours.secondaryColour,
    textColor: ValueSheet.colours.primaryColour,
  },
});
