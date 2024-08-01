import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
const { width, height } = Dimensions.get("window");
const RenderTodos = ({
  onPress = () => {},
  currentDay,
  item,
  updateTaskStatus,
  updateToDoStatus,
  isMainPage,
}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [itemDate, setItemDate] = useState("noDueDate");

  useEffect(() => {
    if (item.isComplete || item.selected) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }

    var itemDateStamp = "noDueDate";
    if (!item.toDoID) {
      itemDateStamp = item.nextDueDate;
    } else if (item.dateStamp != "noDueDate") {
      itemDateStamp = item.dateStamp;
    }

    if (itemDateStamp != "noDueDate") {
      var year = itemDateStamp.substring(0, 4);
      var month = itemDateStamp.substring(4, 6);
      var day = itemDateStamp.substring(6, 8);

      var newItemDate = new Date(Number(year), Number(month) - 1, Number(day));
      setItemDate(newItemDate);
    } else {
      setItemDate("noDueDate");
    }
  }, [item]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.itemRenderMain}>
      <TouchableOpacity
        onPress={async () => {
          setIsCheck((pr) => !pr);
          if (item.PK.includes("task")) {
            await updateTaskStatus(item, isMainPage);
          } else {
            await updateToDoStatus(item);
          }
        }}
        style={styles.checkRender}
      >
        {isCheck && (
          <Image
            style={styles.checkImageRender}
            source={require("../assets/images/check.png")}
          />
        )}
      </TouchableOpacity>
      {isCheck ? (
        <Text style={styles.itemRenderTextMainStrikeThru}>{item.name}</Text>
      ) : (
        <Text style={styles.itemRenderTextMain}>{item.name}</Text>
      )}
      {itemDate != "noDueDate" && (
        <>
          {item.toDoID ? (
            <>
              {moment(itemDate).format("YYYYMMDD") ==
              moment(currentDay).format("YYYYMMDD") ? (
                <Text style={styles.dueTodayText}>Today</Text>
              ) : (
                <>
                  {moment(itemDate).format("YYYYMMDD") <
                  moment(currentDay).format("YYYYMMDD") ? (
                    <Text style={styles.itemRenderText2Main}>
                      {itemDate.toDateString().slice(4, -4)}
                    </Text>
                  ) : (
                    <Text style={styles.itemRenderText3Main}>
                      {itemDate.toDateString().slice(4, -4)}
                    </Text>
                  )}
                </>
              )}
            </>
          ) : (
            <View>
              {moment(itemDate).format("YYYYMMDD") ==
              moment(currentDay).format("YYYYMMDD") ? (
                <Text style={styles.dueTodayText}>Today</Text>
              ) : (
                <>
                  {moment(itemDate).format("YYYYMMDD") <
                  moment(currentDay).format("YYYYMMDD") ? (
                    <Text style={styles.itemRenderText2Main}>
                      {itemDate.toDateString().slice(4, -4)}
                    </Text>
                  ) : (
                    <Text style={styles.itemRenderText3Main}>
                      {itemDate.toDateString().slice(4, -4)}
                    </Text>
                  )}
                </>
              )}
              <Image
                style={styles.repeatImage}
                resizeMode="contain"
                source={require("../assets/images/repeat.png")}
              />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
export default RenderTodos;

const styles = StyleSheet.create({
  repeatImage: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  toDoScrollContainer: {
    alignItems: "center",
    overflow: "visible",
    paddingBottom: 20,
    width: width - 30,
  },
  itemRenderMain: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkRender: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkImageRender: {
    width: 20,
    height: 20,
  },
  itemRenderTextMain: {
    color: "#1E1E1E",
    fontSize: 18,
    paddingRight: 5,
    fontFamily: "Sego",
    marginLeft: 20,
    paddingVertical: 5,
    flex: 1,
  },
  itemRenderTextMainStrikeThru: {
    color: "#1E1E1E",
    fontSize: 18,
    paddingRight: 5,
    fontFamily: "Sego",
    marginLeft: 20,
    paddingVertical: 5,
    flex: 1,
    textDecorationLine: "line-through",
  },
  itemRenderText2Main: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  itemRenderText3Main: {
    color: "#25436B",
    fontSize: 13,
    fontFamily: "Sego",
  },
  dueTodayText: {
    color: "#25436B",
    fontSize: 13,
    fontFamily: "Sego",
    paddingRight: 16,
  },
});
