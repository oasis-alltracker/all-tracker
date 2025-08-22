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
    borderRadius: 2,
  },
  datePickerView_dark: {
    borderColor: ValueSheet.colours.dark.borderGrey,
  },
  datePickerView_light: {
    borderColor: ValueSheet.colours.light.borderGrey,
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
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    borderWidth: 2,
  },
  dot_dark: {
    borderColor: ValueSheet.colours.dark.borderNavy,
  },
  dot_light: {
    borderColor: ValueSheet.colours.light.borderNavy,
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
    //maybe rename to blueContainer
    backgroundColor: ValueSheet.colours.light.secondaryColour,
    borderColor: ValueSheet.colours.light.borderGrey75,
  },
  secondaryBackground_dark: {
    backgroundColor: ValueSheet.colours.dark.secondaryColour27,
  },
  secondaryBackground_light: {
    backgroundColor: ValueSheet.colours.light.secondaryColour27,
  },
  timePicker_dark: {
    backgroundColor: ValueSheet.colours.dark.secondaryColour,
  },
  timePicker_light: {
    backgroundColor: ValueSheet.colours.light.secondaryColour,
  },
  purpleContainer_dark: {
    backgroundColor: ValueSheet.colours.dark.purple65,
    borderColor: ValueSheet.colours.dark.purple,
  },
  purpleContainer_light: {
    backgroundColor: ValueSheet.colours.light.purple65,
    borderColor: ValueSheet.colours.light.purple,
  },
  pinkContainer_dark: {
    backgroundColor: ValueSheet.colours.dark.pink65,
    borderColor: ValueSheet.colours.dark.borderPink,
  },
  pinkContainer_light: {
    backgroundColor: ValueSheet.colours.light.pink65,
    borderColor: ValueSheet.colours.light.borderPink,
  },
  yellowContainer_dark: {
    backgroundColor: ValueSheet.colours.dark.yellow75,
    borderColor: ValueSheet.colours.dark.borderYellow,
  },
  yellowContainer_light: {
    backgroundColor: ValueSheet.colours.light.yellow75,
    borderColor: ValueSheet.colours.light.borderYellow,
  },
});
