import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

const BarcodeCamera = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <View style={[styles.banner, styles.topArea]}>
        <TouchableOpacity>
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.flashIcon}
            source={require("../../../assets/images/flash.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <View style={styles.banner}>
        <TouchableOpacity>
          <Image
            style={styles.scanIcon}
            source={require("../../../assets/images/barcode.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  banner: {
    backgroundColor: "#D7F6FF",
    alignItems: "center",
  },
  topArea: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backArrow: {
    height: 50,
    width: 50,
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
  },
  flashIcon: {
    height: 50,
    width: 50,
    marginTop: 60,
    marginBottom: 20,
    marginRight: 20,
  },
  scanIcon: {
    height: 80,
    width: 80,
    marginBottom: 50,
    marginTop: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default BarcodeCamera;
