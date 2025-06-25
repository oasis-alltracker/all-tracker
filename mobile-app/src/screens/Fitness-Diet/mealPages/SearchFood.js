import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { getAccessToken } from "../../../user/keychain";
import navigationService from "../../../navigators/navigationService";
import RecentFoodEntriesAPI from "../../../api/diet/recentFoodEntriesAPI";
import Spinner from "react-native-loading-spinner-overlay";
import AddEntryModal from "../modals/AddEntryModal";
import { searchFatSecret } from "../../../api/diet/search/fatSecretAPI";
import { useFocusEffect } from "@react-navigation/native";

const SearchFood = ({ navigation, route }) => {
  var prevPage = route.params?.prevPage || "fitness-diet";
  var mealMacros = route.params?.meal || null;
  var barcodeData = route.params?.barcodeData || null;
  const mealName = route.params.mealName;
  const dayString = route.params.dayString;
  const day = new Date(dayString);
  const formattedDate = day.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addEntryRef = useRef(null);

  var mealImage;
  if (mealName === "Breakfast") {
    mealImage = require("../../../assets/images/breakfast.png");
  } else if (mealName === "Lunch") {
    mealImage = require("../../../assets/images/lunch.png");
  } else if (mealName === "Dinner") {
    mealImage = require("../../../assets/images/dinner.png");
  } else if (mealName === "Snacks") {
    mealImage = require("../../../assets/images/snack.png");
  }

  useFocusEffect(
    React.useCallback(() => {
      getFoodItems(token);
      setSearchInput("");
    }, [])
  );

  function errorResponse(error) {
    console.log(error);
    setIsLoading(false);
    if (Platform.OS === "ios") {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    } else {
      Toast.show("Something went wrong. Please try again.", {
        ...styles.errorToast,
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  }

  const getFoodItems = async () => {
    try {
      token = await getAccessToken();
      setIsLoading(true);
      foodItems = await RecentFoodEntriesAPI.getRecentFoodEntries(token);
      setResults(foodItems);
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  const searchFood = async (input) => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      response = await searchFatSecret(input);
      setResults(response);
      setIsLoading(false);
    } catch (e) {
      errorResponse(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <Spinner visible={isLoading}></Spinner>
        <TouchableOpacity
          onPress={() => {
            var params = {};
            if (prevPage == "mealPage") {
              params["dateString"] = day.toLocaleDateString();
              params["mealName"] = mealName;
              params["meal"] = mealMacros;
            }
            navigationService.navigate(prevPage, params);
          }}
        >
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.topAreaBody}>
          <View style={styles.mealHeader}>
            <Image style={styles.mealIcon} source={mealImage}></Image>
            <Text style={styles.title}>{mealName}</Text>
          </View>
          <Text style={styles.textStyle}>{formattedDate}</Text>
        </View>
      </View>
      <View style={styles.mainArea}>
        <View style={[styles.row, { marginBottom: 20 }]}>
          <View style={styles.searchContainer}>
            <Image
              source={require("../../../assets/images/search2.png")}
              style={{ width: 30, height: 30 }}
            />
            <TextInput
              style={[styles.textStyle, styles.input]}
              onChangeText={setSearchInput}
              value={searchInput}
              placeholder="Food, meal or brand"
              onSubmitEditing={() => searchFood(searchInput)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigationService.navigate("barcodeScanner", {
                mealName: mealName,
                dayString: dayString,
                prevPage: prevPage,
                meal: mealMacros,
              });
            }}
          >
            <Image
              source={require("../../../assets/images/barcode.png")}
              style={styles.smallImage}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {searchResults.map((item, index) => (
            <View key={index} style={styles.resultContainer}>
              <View style={{ flexDirection: "vertical", flex: 1 }}>
                <Text
                  style={[
                    styles.textStyle,
                    { flexShrink: 1, flexWrap: "wrap" },
                  ]}
                >
                  {item.name}
                </Text>
                <Text style={[styles.textStyle, { fontSize: 12 }]}>
                  {item.calorieCount} cals
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  addEntryRef.current.open(item);
                }}
              >
                <Image
                  style={styles.smallImage}
                  source={require("../../../assets/images/plus512.png")}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <AddEntryModal
          getRef={(ref) => (addEntryRef.current = ref)}
          mealName={mealName}
          day={day}
          prevPage={prevPage}
          meal={mealMacros}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  scrollContainer: {
    overflow: "visible",
    paddingBottom: 30,
  },
  topArea: {
    backgroundColor: "#D7F6FF",
    flex: 1,
  },
  mainArea: {
    backgroundColor: "#fff",
    flex: 3,
    minWidth: 0,
    justifyContent: "flex-start",
    padding: 20,
  },
  resultContainer: {
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    padding: 10,
  },
  topAreaBody: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    color: "#25436B",
    fontFamily: "Sego-Bold",
    textAlign: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
  },
  backArrow: {
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  mealIcon: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  smallImage: {
    width: 40,
    height: 40,
  },
  input: {
    width: "70%",
    fontSize: 18,
  },
});

export default SearchFood;
