import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useRef, useState } from "react";
import { Button, Header } from "../../components";
import navigationService from "../../navigators/navigationService";

const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const EnterCode = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  let codeRef = useRef([]);

  const confirmHandler = (code) => {};

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <View style={styles.center}>
          <Text style={styles.title}>
            Check your inbox for verification code
          </Text>
          <View style={styles.codeFields}>
            {[1, 2, 3, 4].map((item) => (
              <TextInput
                ref={(ref) => (codeRef.current[item - 1] = ref)}
                maxLength={1}
                keyboardType="number-pad"
                textContentType={"oneTimeCode"}
                style={styles.input}
                key={item}
                onKeyPress={({ nativeEvent }) => {
                  let Code = [...code];

                  if (Code[item - 1] && keys.includes(nativeEvent.key)) {
                    if (codeRef.current[item - 1]) {
                      Code[item - 1] = nativeEvent.key;
                      setCode(Code);
                      codeRef.current[item].focus();
                    }
                  }
                  if (nativeEvent.key === "Backspace" && item - 1 !== 0) {
                    if (!Code[item - 1]) {
                      codeRef.current[item - 2].focus();
                    }
                  }
                }}
                onChangeText={(text) => {
                  let Code = [...code];
                  if (text.length <= 1) {
                    Code[item - 1] = text;
                  }
                  if (text) {
                    if (codeRef.current[item]) {
                      codeRef.current[item].focus();
                    }
                  }
                  if (text && item - 1 === 3) {
                    codeRef.current[3].blur();
                    if (Code.join("").length === 4) {
                      confirmHandler(Code);
                    }
                  }
                  setCode(Code);
                }}
              />
            ))}
          </View>
          <Button
            onPress={() => navigationService.navigate("agreement")}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#25436B",
    fontSize: 18,
    fontFamily: "Sego-Bold",
    marginVertical: 30,
    textAlign: "center",
  },
  codeFields: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  input: {
    color: "#25436B",
    width: "22%",
    aspectRatio: 1 / 1.1,
    fontFamily: "Sego",
    backgroundColor: "#FFD8FF",
    borderRadius: 25,
    textAlign: "center",
    fontSize: 40,
  },
  button: {
    width: "100%",
    marginVertical: 20,
  },
  center: {
    alignItems: "center",
  },
  view: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingBottom: 50,
  },
  seperator: {
    fontSize: 20,
    color: "#1E1E1E",
    fontFamily: "Sego",
    marginBottom: 30,
  },
  social: {
    flexDirection: "row",
  },
  iconView: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});

export default EnterCode;
