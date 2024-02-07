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
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

const dietSettings =
  {
    img: require("../../assets/images/person-profile.png"),
    title: "Personal",
    childs: [
      {
        title: "Personal details",
        route: "personal",
      },
      {
        title: "Goals",
        route: "goals",
      },
      {
        title: "Units",
        route: "units",
      },
    ],
  }

const generalSettings =
  {
    img: require("../../assets/images/tracking.png"),
    title: "Tracking",
    childs: [
      {
        title: "Notifications",
        route: "notifications",
      },
      {
        title: "Tracking preferences",
        route: "selectedTrackers",
        isUnits: true,
      },
    ],
  }


const helpSettings =
  {
    img: require("../../assets/images/help.png"),
    title: "Help",
    childs: [
      {
        title: "Contact",
        route: "contact",
        isContact: true,
      },
      
    ],
  }

const accountSettings =
  {
    img: require("../../assets/images/user-key.png"),
    title: "Account",
    childs: [
      {
        title: "Logout",
        isLogout: true
      },
      {
        title: "Delete account",
        isDeleteAccount: true
      },
    ],
  }

const SettingsHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trackingPreferences, setTrackingPreferences] = useState([]);

  const deleteAccountHandler = () => {
    Alert.alert(
      "Delete account",
      "Are you sure you want to delete your account and all of its associated date?",
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
    const getDataOnLoad = async() =>{
      token = await getAccessToken()
      if(!isPageLoaded){
        setIsPageLoaded(true)

        const trackingPreferencesLoaded = (await UserAPI.getUser(token)).data.trackingPreferences
        setTrackingPreferences(trackingPreferencesLoaded)
        setIsLoading(false)
      }    
    }
    getDataOnLoad()

  }, []);


  return (
    <View style={styles.cotainer}>
      <Header />
      <Spinner
        visible={isLoading}>
      </Spinner>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.item}>
            <View style={styles.itemHead}>
              <Image source={item.img} style={styles.itemImg} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            {generalSettings.map((item, index) => (
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

          { trackingPreferences.dietSelected && 
            <View style={styles.item}>
              <View style={styles.itemHead}>
                <Image source={item.img} style={styles.itemImg} />
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
              {dietSettings.map((item, index) => (
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
          }

          <View style={styles.item}>
            <View style={styles.itemHead}>
              <Image source={item.img} style={styles.itemImg} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            {helpSettings.map((item, index) => (
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
              <Image source={item.img} style={styles.itemImg} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            {accountSettings.map((item, index) => (
              <TouchableOpacity
                onPress={(e) => {

                  if (item.isLogout) {
                    logoutHandler();
                  }
                  else if(item.isDeleteAccount){
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
    width: 10,
    height: 20,
  },
});

export default SettingsHome;
