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
    tintColor: ValueSheet.colours.primaryColour,
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
    backgroundColor: ValueSheet.colours.secondaryColour,
    borderWidth: 1,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: ValueSheet.colours.grey,
    borderLeftColor: ValueSheet.colours.grey,
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
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryBold,
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
});
