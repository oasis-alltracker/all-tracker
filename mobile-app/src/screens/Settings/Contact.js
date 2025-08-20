import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components";
import { ValueSheet } from "../../ValueSheet";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { sharedStyles } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Contact = () => {
  const theme = useContext(ThemeContext).value;
  return (
    <SafeAreaView
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <View style={styles.container}>
        <Header showCenter={false} />
        <Text style={[styles.title, sharedStyles["textColour_" + theme]]}>
          Contact
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          If you would like to contact us,
        </Text>
        <Text style={[styles.text, sharedStyles["textColour_" + theme]]}>
          please DM on instagram
        </Text>
        <Text style={[styles.textBold, sharedStyles["textColour_" + theme]]}>
          @oasis.journal.app
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
    marginTop: 50,
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  textBold: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
  },
});

export default Contact;
