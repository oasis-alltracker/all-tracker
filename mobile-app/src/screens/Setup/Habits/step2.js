import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Switch } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import DateTimePicker from '@react-native-community/datetimepicker'
import Spinner from "react-native-loading-spinner-overlay";
import NotificationsHandler from "../../../api/notifications/notificationsHandler";
import { getAccessToken } from "../../../user/keychain";
import UserAPI from "../../../api/user/userAPI";

const HabitsNotifications = (props) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const { selectedTrackers } = props.route.params;

  const [time, setTime] = useState(new Date('1995-12-17T12:00:00'))
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onNext = async () => {
    setIsLoading(true);
    var systemNotificationsStatus = true;
    const token = await getAccessToken();

    if(isNotificationsEnabled) {
      
      timeArray = formatDateObjectBackend(time).split(":")
      hour = timeArray[0]
      minute = timeArray[1]

      systemNotificationsStatus = await NotificationsHandler.checkNotificationsStatus(token);

      if(systemNotificationsStatus){
        await NotificationsHandler.turnOnNotification(token, "habit", "Habit Journal", "Don't forget to update your habit progress", [{hour: Number(hour), minute: Number(minute), repeats: true}], true );
        await NotificationsHandler.updateNotification(token,
          "notifications",
          "undefined",
          "undefined",
          "undefined",
          "undefined",
          "on")
      }
    }
    else {
      await NotificationsHandler.updateNotification(token,
        "notifications",
        "undefined",
        "undefined",
        "undefined",
        "undefined",
        "off")
    }

    if(systemNotificationsStatus){
      if(selectedTrackers.toDosSelected) {
        navigationService.navigate("todos", {selectedTrackers});
      }
      else {
        
        const accessToken = await getAccessToken();
        const {status, data} = await UserAPI.updateUser(true , selectedTrackers, accessToken);
  
        //TO-DO check if user is subscribed
        setIsLoading(false);
        navigationService.navigate("main");
      }
    }
    else {
      Toast.show("To get reminders, you need to turn on notifications in your phone's settings.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
      });
    }

    setIsLoading(false);
  }
  const toggleSwitch = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  }

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }

    setTime(selectedDate);
  };

  const formatDateObject = (dateObject) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return dateObject.toLocaleString('en-US', options)
  }

  const formatDateObjectBackend = (dateObject) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };
    return dateObject.toLocaleString('en-US', options)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <Spinner
          visible={isLoading}>
        </Spinner>
        <View style={styles.imageCon}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/habits512.png")}
          />
          <Text style={styles.imageText}>habits</Text>
        </View>
        <Button
          disabled={true}
          style={[styles.bigButtons, styles.notification]}
        >
          <View style={styles.row}>
            <Text style={[styles.text]}>Notifications:</Text>
            <View >
              <Switch width={55}
                height={32}
                onValueChange={toggleSwitch}
                value={isNotificationsEnabled}
                trackColor={{true: '#d7f6ff',false: '#ffd8f7', }}
                thumbColor={isNotificationsEnabled ? '#d7f6ff' : '#ffd8f7'}/>
            </View> 
          </View>
          <Text style={[styles.text, styles.minitext]}>
          Get a daily reminder to update your habit progress.
          </Text>

          <View style={styles.timeRow}>
            {Platform.OS === 'ios' ? 
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                onChange={onChange}
              />
              :
              <TouchableOpacity
                style={styles.timeButton}
                testID="setMinMax"
                value="time"
                onPress={() => {
                setShow(true);
                }}
                title="toggleMinMaxDate">
                  <Text style={styles.timeText}>{formatDateObject(time)}</Text>
              </TouchableOpacity>
            }
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {show && (                 
                <DateTimePicker
                  testID="dateTimePicker"
                  value={time}
                  mode={'time'}
                  is24Hour={true}
                  onChange={onChange}
                />)
              }
          </View>

        </View>
        </Button>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={[styles.button, styles.back]}
        >
          Back
        </Button>
        <Button
          onPress={() => onNext()}
          style={styles.button}
        >
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
    alignSelf: "center",
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
    fontSize: 24,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 20,
    marginLeft: 10,
  },
  boldText: {
    fontFamily: "Sego-Bold",
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
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 200,
    borderRadius: 40,
    marginTop: 10,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
  notification: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 100,
  },
  center: {},
  selectImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop:25
  },
  flex: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#25436B",
    fontSize: 30,
    fontFamily: "Sego",
  },
  minitext: {
    fontSize: 15,
    marginTop: 10,
  },
  selectText: {
    margin: 20,
    fontSize: 20,
  },
  selectTime: {
    marginBottom: 0,
  },
  timeText: {
    fontSize: 16,
  },
  notificationCon: {
    height: "auto",
    flexDirection: "column",
    paddingHorizontal: 0,
    alignItems: "flex-start",
  },
  inactive: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  dayBt: {
    height: 35,
    borderRadius: 10,
    marginBottom: 0,
  },
  timeCon: {
    paddingHorizontal: 20,
  },
  dayList: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  whatTime: {
    fontSize: 20,
  },
  addButton: {
    alignSelf: "center",
    marginVertical: 15,
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  timeButton:{
    borderWidth: 1.5,
    borderColor: "rgba(172, 197, 204, 0.75)",
    height: 40,
    borderRadius: 20,
    width: 130,
  },
  timeText: {
    fontFamily: "Sego",
    fontSize: 18,
    color: "#25436B",
    textAlign: "center",
    alignItems: "center",
    marginTop:5
  },
  errorToast: {
    backgroundColor: "#FFD7D7",
    textColor: "#25436B",
  }
});

export default HabitsNotifications;
