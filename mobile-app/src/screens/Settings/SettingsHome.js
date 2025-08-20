import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Switch,
} from "react-native";
import { Button, Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import { logout } from "../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import { getAccessToken } from "../../user/keychain";
import UserAPI from "../../api/user/userAPI";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { ValueSheet } from "../../ValueSheet";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { sharedStyles } from "../styles";

const generalSettings = {
  img: require("../../assets/images/tracking.png"),
  title: "Customization",
  childs: [
    {
      title: "Preferences",
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
    {
      title: "Support",
      route: "support",
      isSupport: true,
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
  const systemTheme = useColorScheme();
  const theme = useContext(ThemeContext);

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessToken();
      await UserAPI.deleteUser(token);
      await SecureStore.deleteItemAsync("isAccountCreated");
      logout();
      setIsLoading(false);
      navigationService.reset("auth", 0);
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
            navigationService.reset("auth", 0);
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
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme.value]]}
    >
      <Header style={{ paddingTop: 0 }} />
      <Spinner visible={isLoading}></Spinner>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.item,
            sharedStyles["borderedContainer_" + theme.value],
          ]}
        >
          <View style={styles.itemHead}>
            <Image
              source={generalSettings.img}
              style={[styles.itemImg, sharedStyles["tint_" + theme.value]]}
            />
            <Text
              style={[
                styles.itemTitle,
                sharedStyles["textColour_" + theme.value],
              ]}
            >
              {generalSettings.title}
            </Text>
          </View>
          {generalSettings.childs.map((item, index) => (
            <TouchableOpacity
              onPress={(e) => {
                navigationService.navigate(item.route);
              }}
              style={styles.child}
              key={index}
            >
              <Text
                style={[
                  styles.childTitle,
                  sharedStyles["textColour_" + theme.value],
                ]}
              >
                {item.title}
              </Text>
              <Image
                style={styles.arrowRight}
                resizeMode="stretch"
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          ))}
          <View style={styles.child}>
            <Text
              style={[
                styles.childTitle,
                sharedStyles["textColour_" + theme.value],
              ]}
            >
              Dark Mode:{" "}
            </Text>
            <Switch
              onValueChange={() => {
                theme.setter(theme.value == "light" ? "dark" : "light");
              }}
              value={theme.value == "dark"}
              trackColor={{
                true: ValueSheet.colours.dark.secondaryColour65,
                false: ValueSheet.colours.light.purple,
              }}
              thumbColor={
                theme.value == "dark"
                  ? ValueSheet.colours.dark.secondaryColour
                  : ValueSheet.colours.light.purple
              }
            />
          </View>
        </View>

        <View
          style={[
            styles.item,
            sharedStyles["borderedContainer_" + theme.value],
          ]}
        >
          <View style={styles.itemHead}>
            <Image
              source={helpSettings.img}
              style={[styles.itemImg, sharedStyles["tint_" + theme.value]]}
            />
            <Text
              style={[
                styles.itemTitle,
                sharedStyles["textColour_" + theme.value],
              ]}
            >
              {helpSettings.title}
            </Text>
          </View>
          {helpSettings.childs.map((item, index) => (
            <TouchableOpacity
              onPress={(e) => {
                navigationService.navigate(item.route);
              }}
              style={styles.child}
              key={index}
            >
              <Text
                style={[
                  styles.childTitle,
                  sharedStyles["textColour_" + theme.value],
                ]}
              >
                {item.title}
              </Text>
              <Image
                style={styles.arrowRight}
                resizeMode="stretch"
                source={require("../../assets/images/left.png")}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={[
            styles.item,
            sharedStyles["borderedContainer_" + theme.value],
          ]}
        >
          <View style={styles.itemHead}>
            <Image
              source={accountSettings.img}
              style={[styles.itemImg, sharedStyles["tint_" + theme.value]]}
            />
            <Text
              style={[
                styles.itemTitle,
                sharedStyles["textColour_" + theme.value],
              ]}
            >
              {accountSettings.title}
            </Text>
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
              <Text
                style={[
                  styles.childTitle,
                  sharedStyles["textColour_" + theme.value],
                ]}
              >
                {item.title}
              </Text>
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
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 40,
  },
  item: {
    borderWidth: 1,
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
    fontFamily: ValueSheet.fonts.primaryBold,
    fontSize: 28,
  },
  child: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingRight: 15,
  },
  childTitle: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 22,
  },
  arrowRight: {
    width: 10,
    height: 20,
    marginTop: 6,
  },
});

export default SettingsHome;
