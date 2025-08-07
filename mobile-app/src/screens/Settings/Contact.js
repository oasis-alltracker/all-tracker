import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components";
import { ValueSheet } from "../../ValueSheet";

const Contact = () => {
  return (
    <>
      <View style={styles.container}>
        <Header showCenter={false} />
        <Text style={styles.title}>Contact</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>If you would like to contact us,</Text>
        <Text style={styles.text}>please DM on instagram</Text>
        <Text style={styles.textBold}>@oasis.journal.app</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ValueSheet.colours.background,
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
