import { StyleSheet } from "react-native";
export const sharedStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  headerImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 65,
    height: 65,
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
    paddingTop: 16,
  },

  trackerTitle: {
    fontSize: 28,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
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
