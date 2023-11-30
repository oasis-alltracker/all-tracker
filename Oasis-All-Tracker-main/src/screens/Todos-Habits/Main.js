import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AddTasks from "./AddTasks";
import AddHabits from "./AddHabits";

export default function Main() {
  const modalRef = useRef(null);
  const modalRef1 = useRef(null);
  const todos = [
    {
      name: "Clean laundry",
      status: "Overdue",
    },
    {
      name: "study bio",
      status: "",
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../../assets/images/creative-mind.png")}
        />
      </View>
      <View style={styles.dateLine}>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.preButton}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
        <Text style={styles.dateName}>Today</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            style={[styles.preButton, styles.nextButton]}
            source={require("../../assets/images/left.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.line}>
        <Text style={styles.title}>Habits</Text>
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
      <View style={[styles.line, { marginTop: 10 }]}>
        <TouchableOpacity style={styles.habitButton}>
          <Image
            style={styles.habitImage}
            source={require("../../assets/images/habit1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.habitButton}>
          <Image
            style={styles.habitImage}
            source={require("../../assets/images/habit2.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.habitButton}>
          <Image
            style={styles.habitImage}
            source={require("../../assets/images/habit3.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.line, { marginBottom: 15 }]}>
        <Text style={styles.title}>To-dos</Text>
        <TouchableOpacity
          onPress={() => {
            modalRef1.current.open();
          }}
        >
          <Image
            style={styles.plus}
            source={require("../../assets/images/plus-2.png")}
          />
        </TouchableOpacity>
      </View>
      {todos.map((item, index) => (
        <RenderTodos
          onPress={() => {
            modalRef.current.open(true, {
              title: "Meditate",
              status: "Bad",
              count: "3",
            });
          }}
          key={index}
          item={item}
        />
      ))}
      <AddTasks getRef={(ref) => (modalRef.current = ref)} />
      <AddHabits getRef={(ref) => (modalRef1.current = ref)} />
    </ScrollView>
  );
}

export const RenderTodos = ({ onPress = () => {} }) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <TouchableOpacity
        onPress={() => setIsCheck((pr) => !pr)}
        style={styles.check}
      >
        {isCheck && (
          <Image
            style={styles.checkImage}
            source={require("../../assets/images/check.png")}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.itemText}>Clean laundry</Text>
      <Text style={styles.itemText2}>Overdue</Text>
    </TouchableOpacity>
  );
};

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
    tintColor: "#25436B",
  },
  imageText: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginTop: 10,
  },
  preButton: {
    width: 30,
    height: 30,
  },
  nextButton: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  dateLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ACC5CC",
    borderRadius: 2,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#D7F6FF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 2,
  },
  dateName: {
    fontSize: 30,
    color: "#25436B",
    fontFamily: "Sego",
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
  habitImage: {
    width: 100,
    height: 100,
  },
  habitButton: {
    marginRight: 30,
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
    paddingVertical: 10,
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
});
