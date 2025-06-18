import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import navigationService from "../../../navigators/navigationService";

const BarcodeCamera = ({ route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState("off");
  const [barcodeData, setBarcodeData] = useState(null);
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
    //version 1: update state var + console.log + set timeout
    if (barcodeData === null) {
      console.log("Result =\n" + JSON.stringify(barcodeScanningResult));
      setBarcodeData({
        type: barcodeScanningResult.type,
        data: barcodeScanningResult.data,
      });

      console.log("Barcode data =\n" + JSON.stringify(barcodeData));
      setTimeout(() => setBarcodeData(null), 3000);
      console.log("Ready to scan again");
    }

    //version 2: navigate using code in this function
    //version 3: navigate using exitPage
    //version 4: navigate without a state var, just passing in the result?
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
