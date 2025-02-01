import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import { logout } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";
import { SafeAreaView } from "react-native-safe-area-context";

const dietSettings = {
  img: require("../../assets/images/person-profile.png"),
  title: "Personal",
  childs: [
    {
      title: "Goals",
      route: "goals",
    },
  ],
};

const generalSettings = {
  img: require("../../assets/images/tracking.png"),
  title: "Tracking",
  childs: [
    {
      title: "Tracking Preferences",
      route: "setup",
      isUnits: true,
    },
    {
      title: "Notifications",
      route: "notifications",
    },
  ],
};

const helpSettings = {
  img: require("../../assets/images/help.png"),
  title: "Help",
  childs: [
    {
      title: "Contact",
      route: "contact",
      isContact: true,
    },
  ],
};

const accountSettings = {
  img: require("../../assets/images/user-key.png"),
  title: "Account",
  childs: [
    {
      title: "Logout",
      isLogout: true,
    },
    {
      title: "Delete Account",
      isDeleteAccount: true,
    },
  ],
};

const SettingsHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessToken();
      await UserAPI.deleteUser(token);
      logout();
      setIsLoading(false);
      navigationService.reset("landing", 0);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const deleteAccountHandler = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account and all of its associated data?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          isPreferred: true,
          onPress: () => {
            deleteAccount();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const logoutHandler = () => {
    Alert.alert(
      "Logout",
      "Do you want to logout?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          isPreferred: true,
          onPress: () => {
            logout();
            navigationService.reset("landing", 0);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    const getDataOnLoad = async () => {
      token = await getAccessToken();
      if (isLoading) {
        const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data
          .trackingPreferences;
        setIsLoading(false);
        setTrackingPreferences(trackingPreferencesLoaded);
      }
    };
    getDataOnLoad();
  }, []);

  return (
    <SafeAreaView style={styles.cotainer}>
      <Header style={{ paddingTop: 0 }} />
      <Spinner visible={isLoading}></Spinner>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.item}>
          <View style={styles.itemHead}>
            <Image source={generalSettings.img} style={styles.itemImg} />
            <Text style={styles.itemTitle}>{generalSettings.title}</Text>
          </View>
          {generalSettings.childs.map((item, index) => (
            <TouchableOpacity
              onPress={(e) => {
                navigationService.navigate(item.route);
              }}
              style={styles.child}
              key={index}
            >
              <Text style={styles.childTitle}>{item.title}</Text>
              <Image
                style={styles.arrowRight}
                resizeMode="stretch"
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          ))}
        </View>

        {trackingPreferences.dietSelected && (
          <View style={styles.item}>
            <View style={styles.itemHead}>
              <Image source={dietSettings.img} style={styles.itemImg} />
              <Text style={styles.itemTitle}>{dietSettings.title}</Text>
            </View>
            {dietSettings.childs.map((item, index) => (
              <TouchableOpacity
                onPress={(e) => {
                  navigationService.navigate(item.route);
                }}
                style={styles.child}
                key={index}
              >
                <Text style={styles.childTitle}>{item.title}</Text>
                <Image
                  style={styles.arrowRight}
                  resizeMode="stretch"
                  source={require("../../assets/images/left.png")}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.item}>
          <View style={styles.itemHead}>
            <Image source={helpSettings.img} style={styles.itemImg} />
            <Text style={styles.itemTitle}>{helpSettings.title}</Text>
          </View>
          {helpSettings.childs.map((item, index) => (
            <TouchableOpacity
              onPress={(e) => {
                navigationService.navigate(item.route);
              }}
              style={styles.child}
              key={index}
            >
              <Text style={styles.childTitle}>{item.title}</Text>
              <Image
                style={styles.arrowRight}
                resizeMode="stretch"
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.item}>
          <View style={styles.itemHead}>
            <Image source={accountSettings.img} style={styles.itemImg} />
            <Text style={styles.itemTitle}>{accountSettings.title}</Text>
          </View>
          {accountSettings.childs.map((item, index) => (
            <TouchableOpacity
              onPress={(e) => {
                if (item.isLogout) {
                  logoutHandler();
                } else if (item.isDeleteAccount) {
                  deleteAccountHandler();
                }
              }}
              style={styles.child}
              key={index}
            >
              <Text style={styles.childTitle}>{item.title}</Text>
              <Image
                style={styles.arrowRight}
                resizeMode="stretch"
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainerStyle: {
    paddingBottom: 40,
  },
  item: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 40,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 30,
  },
  itemHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemImg: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  itemTitle: {
    fontFamily: "Sego-Bold",
    color: "#25436B",
    fontSize: 28,
  },
  child: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingRight: 15,
  },
  childTitle: {
    fontFamily: "Sego",
    color: "#25436B",
    fontSize: 22,
  },
  arrowRight: {
    width: 10,
    height: 20,
    marginTop: 6,
  },
});

export default SettingsHome;
