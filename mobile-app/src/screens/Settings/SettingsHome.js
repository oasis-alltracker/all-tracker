import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { Header } from "../../components";
import navigationService from "../../navigators/navigationService";
import { logout } from "../../user/keychain";

const buttons = [
  {
    img: require("../../assets/images/person-profile.png"),
    title: "Personal",
    childs: [
      {
        title: "Personal detail",
        route: "personal",
      },
      {
        title: "Goals",
        route: "goals",
      },
    ],
  },
  {
    img: require("../../assets/images/adjustment.png"),
    title: "General",
    childs: [
      {
        title: "Notifications",
        route: "notifications",
      },
      {
        title: "Units",
        route: "units",
      },
    ],
  },
  {
    img: require("../../assets/images/tracking.png"),
    title: "Personal",
    childs: [
      {
        title: "Tracking preferences",
        route: "tracks",
      },
      {
        title: "Coming soon",
        route: "comingSoon",
      },
    ],
  },
  {
    img: require("../../assets/images/help.png"),
    title: "Help",
    childs: [
      {
        title: "Contact",
        route: "contact",
      },
    ],
  },
  {
    img: require("../../assets/images/user-key.png"),
    title: "Account",
    childs: [
      {
        title: "Logout",
        route: "",
        isLogout: true,
      },
    ],
  },
];

const SettingsHome = () => {
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
  return (
    <View style={styles.cotainer}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {buttons.map((item, index) => (
          <View style={styles.item} key={index}>
            <View style={styles.itemHead}>
              <Image source={item.img} style={styles.itemImg} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            {item.childs.map((item, index) => (
              <TouchableOpacity
                onPress={(e) => {
                  if (item.isLogout) {
                    logoutHandler();
                  } else {
                    navigationService.navigate(item.route);
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
        ))}
      </ScrollView>
    </View>
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
    marginBottom: 10,
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
    transform: [{ rotate: "180deg" }],
    width: 10,
    height: 20,
  },
});

export default SettingsHome;
