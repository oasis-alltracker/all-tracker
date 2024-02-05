import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import HeaderIcon from "../assets/icons/arrowLeft";
import NavigationService from "../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";

const MainHeader = (props) => {
    return (
    <SafeAreaView edges={["top"]} style={[styles.container, props.style]}>
      <View style={styles.leftCon}>
        {props.showLeft ? (
          props.leftComponent ? (
            props.leftComponent
          ) : (
            <TouchableOpacity
              style={[styles.iconWrapper, props.leftStyle]}
              onPress={props.onLeftPressed}
            >
              <Image
                style={styles.leftImage}
                resizeMode="cover"
                source={require("../assets/images/back-arrow.png")}
              />
            </TouchableOpacity>
          )
        ) : null}
        {props.showCenter ? (
          props.centerComponent ? (
            props.centerComponent
          ) : (
            <View style={styles.logoCon}>
              <Image
                style={styles.logo}
                resizeMode="contain"
                source={require("../assets/images/logo.png")}
              />
            </View>
          )
        ) : null}
      </View>
      {props.rightComponent ? props.rightComponent : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "transparent",
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftImage: {
    width: "100%",
    height: "100%",
  },
  leftCon: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoCon: {
    flex: 1,
    alignItems: "center",
    paddingRight: 40,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    color: "#151518",
    fontFamily: "Sego-Bold",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  rightComponent: {
    flexDirection: "row",
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  icon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

MainHeader.defaultProps = {
  containerStyle: {},
  style: {},
  titleStyle: {},
  leftStyle: {},
  rightStyle: {},
  title: "",
  onLeftPressed: () => {
    NavigationService.goBack();
  },
  rightComponent: null,
  showLeft: true,
  showRight: true,
  showCenter: true,
  leftComponent: null,
  centerComponent: null,
  numberOfLines: 1,
};
export default memo(MainHeader);
