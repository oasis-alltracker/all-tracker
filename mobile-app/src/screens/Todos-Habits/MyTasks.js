import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import Modal from "./AddTasks";
import { RenderTodos } from "./Main";

const items = [
  {
    name: "Clean laundry",
    status: "today",
    date: "today",
    isCheck: true,
  },
  {
    name: "study bio",
    status: "today",
    date: "today",
    isCheck: false,
  },
  {
    name: "Clean laundry",
    status: "yesterday",
    date: "yesterday",
    isCheck: false,
  },
];

export default function MyTasks() {
  const modalRef = useRef(null);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/to-dos512.png")}
        />
      </View>
      <View style={[styles.line, { marginBottom: 15 }]}>
        <Text style={styles.title}>my tasks</Text>
        <TouchableOpacity
          onPress={() => {
            modalRef.current.open();
          }}
        >
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus-2.png")}
          />
        </TouchableOpacity>
      </View>
      {items.map((val, key) => {
        return (
          <RenderTodos
            onPress={() => {
              modalRef.current.open(true, {
                title: "Meditate",
                status: "Bad",
                count: "3",
              });
            }}
            key={key}
            item={val}
          />
        );
      })}
      <View style={[styles.line, { marginBottom: 15 }]}>
        <Text style={styles.title}>Completed</Text>
        <TouchableOpacity>
          <Image
            style={styles.nextButton}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      {items.map((val, key) => {
        return (
          <RenderTodos
            onPress={() => {
              modalRef.current.open(true, {
                title: "Meditate",
                status: "Bad",
                count: "3",
              });
            }}
            key={key}
            item={val}
          />
        );
      })}
      <Modal getRef={(ref) => (modalRef.current = ref)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    overflow: "visible",
    paddingTop: 30,
    paddingBottom: 80,
  },
  imageCon: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "rgba(255, 207, 245, 0.65)",
    borderColor: "rgba(255, 207, 245, 0.70)",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  plus: {
    width: 40,
    height: 40,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 33,
    color: "#25436B",
    fontFamily: "Sego-Bold",
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  check: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  checkImage: {
    width: 20,
    height: 20,
  },
  itemText: {
    color: "#1E1E1E",
    fontSize: 20,
    fontFamily: "Sego",
    marginLeft: 20,
    flex: 1,
  },
  itemText2: {
    color: "#FFBEF1",
    fontSize: 13,
    fontFamily: "Sego",
  },
  nextButton: {
    width: 30,
    height: 30,
  },
});
