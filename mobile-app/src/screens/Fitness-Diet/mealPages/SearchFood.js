import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { getAccessToken } from "../../../user/keychain";
import navigationService from "../../../navigators/navigationService";
import FoodItemsAPI from "../../../api/diet/foodItemsAPI";
import Spinner from "react-native-loading-spinner-overlay";

const SearchFood = ({ naviagtion, route }) => {
  const mealName = route.params.mealName;
  const dayString = route.params.dayString;
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setResults] = useState([{name: "Beef", caloriesPerMeasure: 100},{name: "Shawarma", caloriesPerMeasure: 50}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  var mealImage;
  if (mealName === "Breakfast") {
    mealImage = require("../../../assets/images/breakfast.png");
  } else if (mealName === "Lunch") {
    mealImage = require("../../../assets/images/lunch.png");
  } else if (mealName === "Dinner") {
    mealImage = require("../../../assets/images/dinner.png");
  } else if (mealName === "Snack") {
    mealImage = require("../../../assets/images/snack.png");
  }

  useEffect(()=>{
    console.log("entered use effect");
    getFoodItems(token);
  },[]);

  function errorResponse(error){
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

  const getFoodItems = async()=>{
    try{
      token = await getAccessToken();
      setIsLoading(true);
      console.log("entered get food");
      foodItems = await FoodItemsAPI.getFoodItems(token);
      console.log(foodItems);
      setResults(foodItems);
      setIsLoading(false);
    }catch(e){
      errorResponse(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <Spinner visible={isLoading}></Spinner>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigate("fitness-diet");
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
          <Text style={styles.textStyle}>{dayString}</Text>
        </View>
      </View>
      <View style={styles.mainArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={[styles.row, {marginBottom:20,}]}>
            <View style={styles.searchContainer}>
              <Image 
                source={require("../../../assets/images/search2.png")}
                style={{width: 30, height: 30}}
              />
              <TextInput
                style={[styles.textStyle, styles.input ]}
                onChangeText={setSearchInput}
                value={searchInput}
                placeholder="Food, meal or brand"
              />
            </View>

            <TouchableOpacity>
              <Image 
                source={require("../../../assets/images/search2.png")}
                style={styles.smallImage}
              />
            </TouchableOpacity>
          </View>

          {searchResults.map((item, index)=>(
            <View key={index} style={styles.reusltContainer}>
              <View style={{flexDirection: "vertical", }}>
                <Text style={styles.textStyle}>
                  {item.name}
                </Text>
                <Text style={[styles.textStyle, {fontSize: 12}]}>
                  {item.caloriesPerMeasure} cals
                </Text>
              </View>
              
              <TouchableOpacity>
                <Image
                  style={styles.smallImage}
                  source={require("../../../assets/images/plus512.png")}
                />
              </TouchableOpacity>
            </View>
          ))}

        </ScrollView>
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
  reusltContainer:{
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
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
  }
});

export default SearchFood;
