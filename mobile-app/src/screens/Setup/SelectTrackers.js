import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import { Header, Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccessToken } from '../../user/keychain'
import UserAPI from "../../api/user/userAPI";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";


const SelectTrackers = () => {

  const [habitsSelected, setHabitsSelected] = useState(false);
  const [toDosSelected, setToDosSelected] = useState(false);
  const [dietSelected, setDietSelected] = useState(false);
  const [fitnessSelected, setFitnessSelected] = useState(false);
  const [moodSelected, setMoodSelected] = useState(false);
  const [sleepSelected, setSleepSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const comingSoon = () => {
    Toast.show("Coming soon!", {
      duration: Toast.durations.SHORT,
    });
  }

  const setSelectedTrackers = async () => {
    setIsLoading(true);
    var selectedTrackers = {
      habitsSelected: habitsSelected,
      toDosSelected: toDosSelected,
      dietSelected: dietSelected,
      fitnessSelected: fitnessSelected,
      moodSelected: moodSelected,
      sleepSelected: sleepSelected
    }

    if(habitsSelected || toDosSelected || dietSelected || fitnessSelected || moodSelected || sleepSelected) {
      const accessToken = await getAccessToken()
      
      const {status, data} = await UserAPI.updateUser(false, selectedTrackers, accessToken)
      if (status == 200) {
        setIsLoading(false);
        if(habitsSelected){
          await navigationService.navigate("habitsCreation", selectedTrackers={selectedTrackers});
        }
        else if(toDosSelected){
          await navigationService.navigate("todos", selectedTrackers={selectedTrackers})
        }
        
      }
      else {
        setIsLoading(false);
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    }
    else{
      setIsLoading(false);
      Toast.show("You must select at least one tracker to continue.", {
        ...styles.errorToast,
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }


  }
  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Spinner
        visible={isLoading}>
      </Spinner>
      <Header />
      <Text style={styles.subtitle}>
        What would you like to track inside your journal?
      </Text>
      <View style={styles.middleContainer}>
        <View style={styles.center}>
          <TouchableOpacity style={[styles.button, !habitsSelected && {opacity: 0.7}, habitsSelected && {borderWidth: 2}, habitsSelected && {borderColor: "#25436B"}]}
            onPress={() => setHabitsSelected(!habitsSelected)}>
            <Image
              style={styles.image}
              source={require("../../assets/images/habits512.png")}
            />
            <Text style={styles.title}>habits</Text>

          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, !toDosSelected && {opacity: 0.7}, toDosSelected && {borderWidth: 2}, toDosSelected && {borderColor: "#25436B"}]}
            onPress={() => comingSoon()}>
            <Image
              style={styles.image}
              source={require("../../assets/images/to-dos512.png")}
            />
            <Text style={styles.title}>to-dos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "rgba(202, 189, 255, 0.68)",
                borderColor: "rgba(162, 151, 204, 0.744)",
              },
              !dietSelected && {opacity: 0.7},
              dietSelected && {borderWidth: 2}, 
              dietSelected && {borderColor: "#25436B"}
            ]}
            onPress={() => comingSoon()}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/diet512.png")}
            />
            <Text style={styles.title}>diet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "rgba(202, 189, 255, 0.68)",
                borderColor: "rgba(162, 151, 204, 0.744)",
              },
              !fitnessSelected && {opacity: 0.7},
              fitnessSelected && {borderWidth: 2}, 
              fitnessSelected && {borderColor: "#25436B"}
            ]}
            onPress={() => comingSoon()}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/fitness512.png")}
            />
            <Text style={styles.title}>fitness</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "rgba(255, 239, 189, 1)",
                borderColor: "rgba(204, 191, 152, 1)",
              },
              !sleepSelected && {opacity: 0.7},
              sleepSelected && {borderWidth: 2}, 
              sleepSelected && {borderColor: "#25436B"}
              
            ]}
            onPress={() => comingSoon()}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/sleep512.png")}
            />
            <Text style={styles.title}>sleep</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: "rgba(255, 239, 189, 1)",
                borderColor: "rgba(204, 191, 152, 1)",
              },
              !moodSelected && {opacity: 0.7},
              moodSelected && {borderWidth: 2}, 
              moodSelected && {borderColor: "#25436B"}
            ]}
            onPress={() => comingSoon()}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/mood512.png")}
            />
            <Text style={styles.title}>mood</Text>
            
          </TouchableOpacity>
        </View>
      </View>
      <Button
        onPress={() => setSelectedTrackers()}
        style={styles.nextButton}
      >
        Continue
      </Button>
    </SafeAreaView>
  );
};

export default SelectTrackers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    width: "100%",
  },
  image: {
    width: 50,
    height: 50,
  },
  button: {
    width: 135,
    height: 135,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
  },
  title: {
    color: "#25436B",
    fontSize: 22,
    marginTop: 7,
    fontFamily: "Sego",
  },
  subtitle: {
    color: "#25436B",
    fontSize: 20,
    fontFamily: "Sego-Bold",
    textAlign: "center",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  nextButton: {
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#25436B",
    fontSize: 25,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 15,
  },
});
