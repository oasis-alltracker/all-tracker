import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import RNModal from "react-native-modal";
import { Image } from "react-native";
import { Button } from "../../components";

export default function Modal({ getRef }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    let ref = {
      open(isEdit = false, props) {
        setVisible(true);
        if (isEdit) {
          setTitle(props.title);
          setStatus(props.status);
          setCount(props.count);
          setEdit(true);
        } else {
          setTitle("");
          setStatus("");
          setCount("");
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
          <Image
            style={styles.searchImage}
            source={require("../../assets/images/search2.png")}
          />
          <TextInput
            placeholderTextColor={"#25436B"}
            placeholder="Name"
            style={styles.inputTitle}
            onChangeText={setTitle}
            value={title}
          />
          <Image
            style={styles.searchImage}
            source={require("../../assets/images/reminder.png")}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Good or bad:</Text>
          <TextInput
            onChangeText={setStatus}
            value={status}
            style={styles.input}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.key}>Times a day:</Text>
          <TextInput
            onChangeText={setCount}
            value={count}
            style={styles.input}
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
  key: {
    color: "#25436B",
    fontSize: 25,
    fontFamily: "Sego",
  },
  input: {
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.8)",
    borderRadius: 20,
    width: 100,
    height: 40,
    paddingHorizontal: 20,
    fontFamily: "Sego-Bold",
    fontSize: 20,
  },
  button: {
    width: "47%",
  },
  back: {
    backgroundColor: "transparent",
    borderColor: "#CCCCCC",
  },
});
