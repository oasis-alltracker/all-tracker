import { StyleSheet } from "react-native";
export const sharedStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  headerImageContainer: {
    width: 180,
    height: 180,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 100,
    height: 100,
    tintColor: "#25436B",
  },
  datePickerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  changeDateButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "#ccc",
    borderLeftColor: "#ccc",
  },
  imageTextMain: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  increaseDateImage: {
    width: 30,
    height: 30,
  },
  decreaseDateImage: {
    width: 30,
    height: 30,
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateText: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego",
  },
  trackerDashView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  trackerTitle: {
    fontSize: 26,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
});
