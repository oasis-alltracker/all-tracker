import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import RNModal from "react-native-modal";
import { Image, TouchableOpacity } from "react-native";
import { Button } from "../../../components";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

export default function UpdateHabitStatusModal({ getRef, onHabitStatusUpdate, refreshHabits }) {
  const [visible, setVisible] = useState(false);

  const [isPositive, setIsPositive] = useState(false);
  const [SK, setSK] = useState(false);
  const [count, setCount] = useState(false);
  const [name, setName] = useState(false);
  const [threshold, setThreshold] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ref = {
      open(isEdit = false, props) {

        setVisible(true)

        setName(props.name)
        setSK(props.SK)
        setIsPositive(props.isPositive)
        setCount(props.count)
        setThreshold(props.threshold)

        if(props.count >= props.threshold) {
          setCount(props.threshold)
          if(props.isPositive) {
            Toast.show("Habit complete. Great job!", {
              ...styles.positiveToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            });
          }
          else{
            Toast.show("You striked out. Try again tomorrow!", {
              ...styles.negativeToast,
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            });
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
    setIsLoading(true)
    await refreshHabits();
    setIsLoading(false)
    setVisible(false);
  }

  const onSave = async () => {
    setIsLoading(true)
    const habit = {
      isPositive: isPositive,
      SK: SK,
      count: count,
      name: name,
    }

    await onHabitStatusUpdate(habit, count)
    setIsLoading(false)
    setVisible(false);
    
  }

  const onPlusPressed = () => {
    if(count > 0){
      setCount(count-1);
    }
  }
  const onMinusPressed = () => {
    if(threshold - count == 1){
      if(isPositive) {
        Toast.show("Habit complete. Great job!", {
          ...styles.positiveToast,
          duration: Toast.durations.LONG,
        });
      }
      else{
        Toast.show("You striked out. Try again tomorrow!", {
          ...styles.negativeToast,
          duration: Toast.durations.LONG,
        });
      }
    }
    if(count >= threshold) {
      if(isPositive) {
        Toast.show("Habit complete. Great job!", {
          ...styles.positiveToast,
          duration: Toast.durations.LONG,
        });
      }
      else{
        Toast.show("You striked out. Try again tomorrow!", {
          ...styles.negativeToast,
          duration: Toast.durations.LONG,
        });
      }
    }
    else {
      setCount(count+1);
    }
  }

  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => backDropPressed()}
      onBackdropPress={() => backDropPressed()}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.modal}
    >
      <Spinner
        visible={isLoading}>
      </Spinner>
      <View style={styles.container}>
        <View style={[styles.row, {paddingBottom: 10}]}>
          <Text style={styles.inputTitle}>{name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>You have</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => onMinusPressed()} style={styles.countButton}>
            <Image
              style={styles.plusMain}
              source={require("../../../assets/images/remove.png")}
            />
          </TouchableOpacity>

          <View style={styles.countContainer}>
            <Text style={styles.countText}>{threshold-count}</Text>
          </View>

          <TouchableOpacity onPress={() => onPlusPressed()} style={styles.countButton}>
            <Image
              style={styles.plusMain}
              source={require("../../../assets/images/plus512.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {isPositive? 
            <>
              <Text style={styles.text}>completions left</Text>    
            </>
            :
            <>
              <Text style={styles.text}>strikes left</Text>  
            </>
            }

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
  },
  container: {
    width: "90%",
    paddingVertical: 20,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 15
  },
  inputTitle: {
    color: "#25436B",
    fontSize: 35,
    fontFamily: "Sego-Bold",
    flex: 1,
    // backgroundColor: "green",
    lineHeight: 35,
    marginTop: 15,
    paddingVertical: 10,
  },
  text: {
    color: "#25436B",
    fontSize: 27,
    fontFamily: "Sego",
  },
  countText: {
    color: "#25436B",
    fontSize: 42,
    fontFamily: "Sego-Bold",
  },
  countContainer: {
    borderRadius: 5,
    width: 70,
    height: 70,
    borderColor: "rgba(172, 197, 204, 0.75)",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.8)",
    borderRadius: 20,
    width: 100,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: "Sego-Bold",
    fontSize: 20,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 35,
    marginHorizontal: 15
  },
  button: {
    width: "47%",
  },
  plusMain: {
    width: 40,
    height: 40,
  },
  countButton: {
    paddingHorizontal: 15
  },
  positiveToast: {
    backgroundColor: "#D7F6FF",
    textColor: "#25436B",
  },
  negativeToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});
