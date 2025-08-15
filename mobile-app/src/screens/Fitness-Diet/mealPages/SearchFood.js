import { ValueSheet } from "../../../ValueSheet";
import React, { useEffect, useState, useRef, useContext } from "react";
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
import { searchFatSecret } from "../../../api/diet/fatSecret/fatSecretAPI";
import { barcodeSearch } from "../../../api/diet/search/barcodeSearch";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

const SearchFood = ({ navigation, route }) => {
  var prevPage = route.params?.prevPage || "fitness-diet";
  var mealMacros = route.params?.meal || null;
  var barcodeInfo = route.params?.barcodeInfo || null;
  const mealName = route.params.mealName;
  const dayString = route.params.dayString;
  const day = new Date(dayString);
  const formattedDate = day.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dietUnit = route.params?.dietUnit;
  const energyMultiplier = dietUnit == "kcal" ? 1 : 4.184;
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setResults] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useContext(ThemeContext).value;

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

  useEffect(() => {
    if (route.params?.barcodeInfo != null) {
      processBarcodeScan(route.params?.barcodeInfo?.data);
    }
  }, [route]);

  useFocusEffect(
    React.useCallback(() => {
      getFoodItems(token);
      setSearchInput("");
    }, [])
  );

  useEffect(() => {
    barcodeInfo = route.params?.barcodeInfo || null;
  }, [route]);

  function errorResponse(error) {
    console.log(error);
    setIsLoading(false);
    Toast.show({
      type: "info",
      text1: "Something went wrong",
      text2: "Please try again later.",
    });
  }

  const processBarcodeScan = async (barcode) => {
    setIsLoading(true);
    var barcodeResult = await barcodeSearch(barcode);
    setIsLoading(false);
    if (barcodeResult != null) {
      addEntryRef.current.open(barcodeResult);
    } else {
      Toast.show({
        type: "info",
        text1: "That item could not be identified",
        text2: "Please scan it again or search for an equivalent item. ",
        visibilityTime: 3000,
      });
    }
  };

  const getFoodItems = async () => {
    try {
      token = await getAccessToken();
      setIsLoading(true);
      foodItems = await RecentFoodEntriesAPI.getRecentFoodEntries(token);
      setResults(foodItems);
      if (foodItems.length == 0) {
        setText("Your recent foods will be shown here");
      }
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

      if (response.length == 0) {
        setText("Sorry, that item isn't available.");
      }
    } catch (e) {
      errorResponse(e);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <View style={styles["topArea_" + theme]}>
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
          <Text
            style={[
              styles.textStyle,
              { color: ValueSheet.colours.light.primaryColour },
            ]}
          >
            {formattedDate}
          </Text>
        </View>
      </View>
      <View style={[styles.mainArea, sharedStyles["pageBackground_" + theme]]}>
        <View style={[styles.row, { marginBottom: 20 }]}>
          <View
            style={[
              styles.searchContainer,
              sharedStyles["borderedContainer_" + theme],
            ]}
          >
            <Image
              source={require("../../../assets/images/search2.png")}
              style={[{ width: 30, height: 30 }, sharedStyles["tint_" + theme]]}
            />
            <TextInput
              style={[
                styles.textStyle,
                sharedStyles["textColour_" + theme],
                styles.input,
              ]}
              onChangeText={setSearchInput}
              value={searchInput}
              placeholder="Food, meal or brand"
              placeholderTextColor={ValueSheet.colours[theme].inputGrey}
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
                dietUnit: dietUnit,
              });
            }}
          >
            <Image
              source={require("../../../assets/images/barcode.png")}
              style={[styles.smallImage, sharedStyles["tint_" + theme]]}
            />
          </TouchableOpacity>
        </View>
        {searchResults.length >= 1 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {searchResults.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.resultContainer,
                  sharedStyles["borderedContainer_" + theme],
                ]}
              >
                <View style={{ flexDirection: "vertical", flex: 1 }}>
                  <Text
                    style={[
                      styles.textStyle,
                      sharedStyles["textColour_" + theme],
                      { flexShrink: 1, flexWrap: "wrap" },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      sharedStyles["textColour_" + theme],
                      { fontSize: 12 },
                    ]}
                  >
                    {Math.round(item.calorieCount * energyMultiplier)}{" "}
                    {dietUnit}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    addEntryRef.current.open(item, dietUnit);
                  }}
                >
                  <Image
                    style={[styles.smallImage, sharedStyles["tint_" + theme]]}
                    source={require("../../../assets/images/plus512.png")}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.textContainer}>
            <Text style={[styles.greyText, styles["greyText_" + theme]]}>
              {text}
            </Text>
          </View>
        )}

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
    backgroundColor: ValueSheet.colours.background,
    justifyContent: "space-between",
  },
  scrollContainer: {
    overflow: "visible",
    paddingBottom: 30,
  },
  topArea_dark: {
    backgroundColor: ValueSheet.colours.dark.secondaryColour,
    flex: 1,
  },
  topArea_light: {
    backgroundColor: ValueSheet.colours.light.secondaryColour,
    flex: 1,
  },
  mainArea: {
    flex: 3,
    minWidth: 0,
    justifyContent: "flex-start",
    padding: 20,
  },
  resultContainer: {
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
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
    color: ValueSheet.colours.light.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
    textAlign: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  greyText: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
    textAlign: "center",
    alignSelf: "center",
  },
  greyText_dark: {
    color: ValueSheet.colours.dark.inputGrey,
  },
  greyText_light: {
    color: ValueSheet.colours.light.inputGrey,
  },
  textContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginBottom: 150,
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
