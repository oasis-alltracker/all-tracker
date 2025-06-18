import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Alert } from "react-native";
import Toast from "react-native-root-toast";
import navigationService from "../../../navigators/navigationService";

const BarcodeCamera = ({ route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    //Camera permissions are not granted yet.
    Alert.alert(
      "Camera Permission Needed",
      "Barcode scanning requires camera access.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Grant Permission",
          isPreferred: true,
          onPress: () => {
            requestPermission();
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  const toggleFlash = () => {
    if (flash === "off") {
      setFlash("on");
    } else {
      setFlash("off");
    }
    Toast.show("Flash is " + flash, {
      ...styles.errorToast,
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
    });
  };

  const handleScannedResult = (barcodeScanningResult) => {
    if (!scanned) {
      setScanned(true);
      navigationService.navigate("searchFood", {
        prevPage: route.params.prevPage,
        meal: route.params.meal,
        mealName: route.params.mealName,
        dayString: route.params.dayString,
        barcodeData: {
          type: barcodeScanningResult.type,
          data: barcodeScanningResult.data,
        },
      });
      setTimeout(() => setScanned(false), 3000);
    }
  };

  const exitPage = () => {
    navigationService.navigate("searchFood", {
      prevPage: route.params.prevPage,
      meal: route.params.meal,
      mealName: route.params.mealName,
      dayString: route.params.dayString,
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.banner, styles.topArea]}>
        <TouchableOpacity onPress={() => exitPage()}>
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFlash()}>
          <Image
            style={styles.flashIcon}
            source={require("../../../assets/images/flash.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <CameraView
        style={styles.camera}
        flash={flash}
        barcodeScannerSettings={{
          barcodetypes: ["ean13", "ean8", "upc_e", "upc_a"],
        }}
        onBarcodeScanned={handleScannedResult}
      ></CameraView>
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
});

export default BarcodeCamera;
