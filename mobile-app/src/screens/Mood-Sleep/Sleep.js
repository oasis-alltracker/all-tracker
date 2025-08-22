import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import navigationService from "../../navigators/navigationService";
import moment from "moment";
import { sharedStyles } from "../styles";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { ValueSheet } from "../../ValueSheet";

const today = new Date();

const data = [
  {
    light: require("../../assets/images/sleepRating/1_light.png"),
    dark: require("../../assets/images/sleepRating/1_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/2_light.png"),
    dark: require("../../assets/images/sleepRating/2_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/3_light.png"),
    dark: require("../../assets/images/sleepRating/3_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/4_light.png"),
    dark: require("../../assets/images/sleepRating/4_dark.png"),
  },
  {
    light: require("../../assets/images/sleepRating/5_light.png"),
    dark: require("../../assets/images/sleepRating/5_dark.png"),
  },
];

export default function Sleep({ sleepRef, allSleepReports }) {
  const { width, height } = useWindowDimensions();
  const theme = useContext(ThemeContext).value;
  const Journals = () => (
    <View style={{ height: 365 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, { width: width - 30 }]}
      >
        {allSleepReports.map((val, key) => {
          return (
            <TouchableOpacity
              key={key.toString()}
              onPress={() => {
                sleepRef.current.open(val);
              }}
              style={[
                styles.item,
                sharedStyles["border_" + theme],
                key === allSleepReports.length - 1 && {
                  borderBottomWidth: 2,
                },
              ]}
            >
              <Text
                style={[styles.itemText, sharedStyles["textColour_" + theme]]}
              >
                {val.title}
              </Text>
              <Text>
                <View
                  style={[
                    styles.sleepImageContainer,
                    sharedStyles["borderedContainer_" + theme],
                  ]}
                  onPress={() => searchImage()}
                >
                  <Image
                    style={styles.sleepImage}
                    source={data[Number(val.rating) - 1][theme]}
                  />
                </View>
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
  const CreateJournal = () => (
    <TouchableOpacity
      onPress={() => {
        navigationService.navigate("sleepTest", {
          screen: "sleepStep1",
          params: {
            dateString: today.toDateString(),
            dateStamp: moment(today).format("YYYYMMDD"),
          },
        });
      }}
      style={[
        styles.addButton,
        sharedStyles["borderedContainer_" + theme],
        { width: width - 30, height: height * 0.43 },
      ]}
    >
      <Text style={[styles.buttonText, sharedStyles["textColour_" + theme]]}>
        Click here to review your sleep.
      </Text>
      <View
        style={[styles.plusCon, sharedStyles["secondaryBackground_" + theme]]}
      >
        <Image
          style={styles.plusImage}
          source={require("../../assets/images/plus.png")}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View
        style={[
          sharedStyles.headerImageContainer,
          {
            backgroundColor: ValueSheet.colours[theme].yellow75,
            borderColor: ValueSheet.colours[theme].borderYellow,
          },
        ]}
      >
        <Image
          style={sharedStyles.headerImage}
          source={require("../../assets/images/sleep.png")}
        />
      </View>
      <View style={[styles.line, { paddingTop: 15, marginBottom: 15 }]}>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Sleep Journal
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigationService.navigate("sleepTest", {
              screen: "sleepStep1",
              params: {
                dateString: today.toDateString(),
                dateStamp: moment(today).format("YYYYMMDD"),
              },
            })
          }
        >
          <Image
            style={[styles.plus, sharedStyles["tint_" + theme]]}
            source={require("../../assets/images/plus512.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        {allSleepReports.length > 0 ? <Journals /> : <CreateJournal />}
      </View>
    </ScrollView>
  );
}

export const RenderItems = ({ item, sleepRef }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => sleepRef.current.open(item)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
    alignItems: "center",
  },
  center: {
    alignItems: "center",
  },
  plus: {
    width: 40,
    height: 40,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 31,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  itemText: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  plusImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  sleepImage: {
    width: 30,
    height: 30,
  },
  sleepImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  plusCon: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    alignItems: "center",
    paddingVertical: 15,
  },
  addButton: {
    borderWidth: 1.5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  scrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 80,
  },
});
