import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;

const dynamicStyles = () => {
  return StyleSheet.create({
    btnContainer: {
      width: SCREEN_WIDTH - 35,
      height: 50,
      alignItems: "center",
      padding: 5,
      borderWidth: 2,
      backgroundColor: "#D7F6FF",
      borderColor: "lightgray",
      borderRadius: 60,
      alignSelf: "center",
      justifyContent: "center",
    },
    btnText: {
      textAlign: "center",
      color: "#25436B",
      fontSize: 25,
      justifyContent: "center",
      paddingLeft: 10,
      marginRight: 20,
    },
  });
};

export default dynamicStyles;
