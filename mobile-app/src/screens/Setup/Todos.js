import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../components";
import navigationService from "../../navigators/navigationService";
import UserAPI from "../../api/user/userAPI";
import Toast from "react-native-root-toast";
import { getAccessToken } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";

const Todos = (props) => {
  const { selectedTrackers } = props.route.params;
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    {
      name: "1 minute before",
    },
    {
      name: "10 minutes before",
    },
    {
      name: "1 hour before",
    },
    {
      name: "No, thanks",
    },
  ];

  const onNext = async () => {
    if (active == 0) {
      Toast.show("Please make a selection.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    } else {
      setIsLoading(true);

      var minuteOffset = -1;
      if (active == 1) {
        minuteOffset = 1;
      }
      if (active == 2) {
        minuteOffset = 10;
      }
      if (active == 3) {
        minuteOffset = 60;
      }

      try {
        const accessToken = await getAccessToken();
        await UserAPI.updateTaskPreference(minuteOffset, accessToken);

        if (selectedTrackers.dietSelected) {
          navigationService.navigate("dietStep1", { selectedTrackers });
        } else if (selectedTrackers.fitnessSelected) {
          navigationService.navigate("fitness", { selectedTrackers });
        } else if (selectedTrackers.moodSelected) {
          navigationService.navigate("mood", { selectedTrackers });
        } else if (selectedTrackers.sleepSelected) {
          navigationService.navigate("sleep", { selectedTrackers });
        } else {
          const accessToken = await getAccessToken();
          const { status, data } = await UserAPI.updateUser(
            true,
            selectedTrackers,
            accessToken
          );

          //TO-DO check if user is subscribed
          setIsLoading(false);
          await navigationService.reset("main", 0);
        }
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        Toast.show("Something went wrong. Please try again.", {
          ...styles.errorToast,
          duration: Toast.durations.LONG,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading}></Spinner>

      <View style={styles.center}>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../assets/images/to-dos.png")}
          />
          <Text style={styles.imageText}>to-dos</Text>
        </View>
        <Text style={styles.title}>
          Would you like to receive reminders for upcoming tasks?
        </Text>

        {data.map((val, key) => (
          <Button
            onPress={() => {
              setActive(key + 1);
            }}
            key={key.toString()}
            textStyle={styles.textStyle}
            style={[
              styles.bigButtons,
              active === key + 1 && { backgroundColor: "#D7F6FF" },
            ]}
          >
            {val.name}
          </Button>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button onPress={() => onNext()} style={styles.button}>
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 216, 247, 0.62)",
    borderWidth: 2,
    borderColor: "rgba(204, 173, 198, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    marginTop: 15,
    marginBottom: 35,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
  bigButtons: {
    width: "100%",
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
    height: 60,
    borderRadius: 20,
    marginTop: 0,
  },
  center: {
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  },
});

export default Todos;
