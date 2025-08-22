import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { ValueSheet } from "../../../ValueSheet";
import { sharedStyles } from "../../styles";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeProvider";

const FitnessStep1 = (props) => {
  const theme = useContext(ThemeContext).value;
  const { selectedTrackers } = props.route.params;
  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.center}
      >
        <View
          style={[styles.imageCon, sharedStyles["purpleContainer_" + theme]]}
        >
          <Image
            style={styles.image}
            source={require("../../../assets/images/fitness.png")}
          />
          <Text style={[styles.imageText, sharedStyles["textColour_light"]]}>
            fitness
          </Text>
        </View>
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          What is your goal?
        </Text>
        <Button style={styles.bigButtons}> Improve explosivity</Button>
        <Button style={styles.bigButtons}>Increase strength</Button>
        <Button style={styles.bigButtons}>Build muscle</Button>
        <Button style={styles.bigButtons}>Improve cardio</Button>
      </ScrollView>
      <View style={styles.buttons}>
        <Button
          onPress={() => navigationService.goBack()}
          style={styles.button}
        >
          Back
        </Button>
        <Button
          onPress={() =>
            navigationService.navigate("fitnessStep2", { selectedTrackers })
          }
          style={styles.button}
          positiveSelect={true}
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
    padding: 15,
    justifyContent: "space-between",
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 70,
  },
  imageText: {
    fontSize: 22,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: ValueSheet.fonts.primaryBold,
    marginTop: 15,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
  },
  bigButtons: {
    width: "100%",
    height: 90,
    borderRadius: 40,
    marginTop: 10,
  },
  center: {
    alignItems: "center",
  },
});

export default FitnessStep1;
