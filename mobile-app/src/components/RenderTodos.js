import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { ValueSheet } from "../ValueSheet";

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

  const { width, height } = useWindowDimensions();

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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View style={{ width: width * 0.63 }}>
          {isCheck ? (
            <Text style={styles.itemRenderTextMainStrikeThru}>{item.name}</Text>
          ) : (
            <Text style={styles.itemRenderTextMain}>{item.name}</Text>
          )}
        </View>
      </View>
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
  itemRenderMain: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: ValueSheet.colours.grey,
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
    borderColor: ValueSheet.colours.grey,
    alignItems: "center",
    justifyContent: "center",
  },
  checkImageRender: {
    width: 20,
    height: 20,
  },
  itemRenderTextMain: {
    color: ValueSheet.colours.black,
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginLeft: 20,
    paddingVertical: 5,
    paddingRight: 5,
    flex: 1,
  },
  itemRenderTextMainStrikeThru: {
    color: ValueSheet.colours.black,
    fontSize: 18,
    fontFamily: ValueSheet.fonts.primaryFont,
    marginLeft: 20,
    paddingVertical: 5,
    paddingRight: 5,
    flex: 1,
    textDecorationLine: "line-through",
  },
  itemRenderText2Main: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingRight: 6,
  },
  itemRenderText3Main: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingRight: 6,
  },
  dueTodayText: {
    color: ValueSheet.colours.primaryColour,
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    paddingRight: 3,
  },
});
