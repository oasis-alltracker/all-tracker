import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import RNModal from "react-native-modal";
import { Image, TouchableOpacity, Platform } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-toast-message";
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
          setTimeout(() => {
            //necessary to display the toast over the modal on open
            displayToast(props.isPositive);
          }, 10);
        }
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);

  const displayToast = (positive) => {
    if (positive) {
      Toast.show({
        type: "success",
        text1: "Habit complete",
        text2: "Great job!",
      });
    } else {
      Toast.show({
        type: "info",
        text1: "You striked out",
        text2: "Try again tomorrow!",
      });
    }
  };

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
    if (threshold - count <= 1) {
      displayToast(isPositive);
    }
    if (count >= threshold) {
      displayToast(isPositive);
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
      <Toast position="top" topOffset={25} visibilityTime={2500} />
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
});
