import { StyleSheet } from "react-native";
import { ValueSheet } from "../ValueSheet";

export const sharedStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  headerImageContainer: {
    width: 135,
    height: 135,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 72,
    height: 72,
  },
  datePickerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: ValueSheet.colours.borderGrey,
    borderRadius: 2,
  },
  changeDateButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  changeDateButton_dark: {
    borderRightColor: ValueSheet.colours.dark.grey,
    borderLeftColor: ValueSheet.colours.dark.grey,
    backgroundColor: ValueSheet.colours.dark.secondaryColour,
  },
  changeDateButton_light: {
    borderRightColor: ValueSheet.colours.light.grey,
    borderLeftColor: ValueSheet.colours.light.grey,
    backgroundColor: ValueSheet.colours.light.secondaryColour,
  },
  changeDateButton_dark: {
    borderRightColor: ValueSheet.colours.dark.grey,
    borderLeftColor: ValueSheet.colours.dark.grey,
    backgroundColor: ValueSheet.colours.dark.secondaryColour,
  },
  changeDateButton_light: {
    borderRightColor: ValueSheet.colours.light.grey,
    borderLeftColor: ValueSheet.colours.light.grey,
    backgroundColor: ValueSheet.colours.light.secondaryColour,
  },
  imageTextMain: {
    fontSize: 22,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginTop: 10,
  },
  increaseDateImage: {
    width: 27,
    height: 27,
  },
  decreaseDateImage: {
    width: 27,
    height: 27,
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateTextContainer: {
    justifyContent: "center",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 33,
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
  },
  trackerDashView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  trackerTitle: {
    fontSize: 28,
    fontFamily: ValueSheet.fonts.primaryBold,
  },
  trackerTitleColour_dark: {
    color: ValueSheet.colours.dark.primaryColour,
  },
  trackerTitleColour_light: {
    color: ValueSheet.colours.light.primaryColour,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: ValueSheet.colours.black25,
  },
  pagination: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    bottom: 8,
    alignItems: "center",
    left: 0,
    justifyContent: "center",
  },
  textColour_dark: {
    color: ValueSheet.colours.dark.primaryColour,
  },
  textColour_light: {
    color: ValueSheet.colours.light.primaryColour,
  },
  tint_dark: {
    tintColor: ValueSheet.colours.dark.primaryColour,
  },
  tint_light: {
    tintColor: ValueSheet.colours.light.primaryColour,
  },
  borderedContainer_dark: {
    borderColor: ValueSheet.colours.dark.borderGrey,
    backgroundColor: ValueSheet.colours.dark.backgroundVariation,
  },
  borderedContainer_light: {
    borderColor: ValueSheet.colours.light.borderGrey,
    backgroundColor: ValueSheet.colours.light.backgroundVariation,
  },
  border_light: {
    borderColor: ValueSheet.colours.light.borderGrey,
  },
  border_dark: {
    borderColor: ValueSheet.colours.dark.borderGrey,
  },
  modalBackground_dark: {
    backgroundColor: ValueSheet.colours.dark.background,
    borderColor: ValueSheet.colours.dark.borderGrey,
  },
  modalBackground_light: {
    backgroundColor: ValueSheet.colours.light.background,
    borderColor: ValueSheet.colours.light.borderGrey,
  },
  pageBackground_dark: {
    backgroundColor: ValueSheet.colours.dark.background,
  },
  pageBackground_light: {
    backgroundColor: ValueSheet.colours.light.background,
  },
  button_dark: {
    backgroundColor: ValueSheet.colours.dark.secondaryColour,
    borderColor: ValueSheet.colours.dark.borderGrey75,
  },
  button_light: {
    backgroundColor: ValueSheet.colours.light.secondaryColour,
    borderColor: ValueSheet.colours.light.borderGrey75,
  },
});
