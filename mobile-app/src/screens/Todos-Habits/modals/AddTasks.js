import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button, Calendar } from "../../../components";

export default function AddTasks({ getRef }) {
  const [visible, setVisible] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(false);

  const calendarRef = useRef(null);

  useEffect(() => {
    let ref = {
      open(isEdit = false, props) {
        setVisible(true);
        if (isEdit) {
          setTitle(props.title);
          setDesc(props.desc);
          setEdit(true);
        } else {
          setTitle("");
          setDesc("");
          setEdit(false);
        }
      },
      close() {
        setVisible(false);
      },
    };

    getRef(ref);
  }, []);
  return (
    <RNModal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      backdropColor="rgba(215, 246, 255, 0.27)"
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setIsCheck((pr) => !pr)}
            style={styles.check}
          >
            {isCheck ? (
              <Image
                style={styles.checkImage}
                source={require("../../../assets/images/check.png")}
              />
            ) : null}
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={"#25436B"}
            placeholder="Name"
            style={styles.inputTitle}
            onChange={setTitle}
            value={title}
          />
          <TouchableOpacity
            onPress={() => {
              calendarRef.current.open();
            }}
          >
            <Image
              style={styles.searchImage}
              source={require("../../../assets/images/date-picker.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <Image
            style={styles.editData}
            source={require("../../../assets/images/edit.png")}
          />
          <TextInput
            multiline
            placeholderTextColor="#25436B"
            placeholder="description"
            style={styles.input}
            onChangeText={setDesc}
            value={desc}
          />
        </View>
        <View style={styles.row}>
          <Button
            onPress={() => setVisible(false)}
            style={[styles.button, styles.back]}
          >
            {edit ? "Delete" : "Cancel"}
          </Button>
          <Button onPress={() => setVisible(false)} style={styles.button}>
            Ok
          </Button>
        </View>
      </View>
      <Calendar getRef={(ref) => (calendarRef.current = ref)} />
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderBlockColor: "rgba(0,0,0,0.5)",
  },
  searchImage: {
    width: 30,
    height: 30,
  },
  editData: {
    width: 40,
    height: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  inputTitle: {
    color: "#25436B",
    fontSize: 35,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 20,
    // backgroundColor: "green",
    lineHeight: 35,
    marginTop: 15,
    paddingVertical: 10,
  },
  title: {
    color: "#25436B",
    fontSize: 35,
    fontFamily: "Sego-Bold",
    flex: 1,
    marginLeft: 20,
    fontSize: 20,
  },
  key: {
    color: "#25436B",
    fontSize: 25,
    fontFamily: "Sego",
  },
  input: {
    width: 100,
    paddingHorizontal: 20,
    flex: 1,
    fontFamily: "Sego",
    fontSize: 18,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
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
});
