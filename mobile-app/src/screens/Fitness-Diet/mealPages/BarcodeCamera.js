import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Alert } from "react-native";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import navigationService from "../../../navigators/navigationService";

const BarcodeCamera = ({ route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleScannedResult = (barcodeScanningResult) => {
    if (!scanned) {
      setScanned(true);
      setIsLoading(true);
      setTimeout(() => {
        setScanned(false);
        setIsLoading(false);
        exitPage(barcodeScanningResult);
      }, 1500);
    }
  };

  const exitPage = (barcodeScanningResult) => {
    var params = {
      prevPage: route.params.prevPage,
      meal: route.params.meal,
      mealName: route.params.mealName,
      dayString: route.params.dayString,
    };
    if (barcodeScanningResult != null) {
      params["barcodeData"] = {
        type: barcodeScanningResult.type,
        data: barcodeScanningResult.data,
      };
    }
    navigationService.navigate("searchFood", params);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodetypes: ["ean13", "ean8", "upc_e", "upc_a"],
        }}
        onBarcodeScanned={handleScannedResult}
      >
        <TouchableOpacity onPress={() => exitPage(null)}>
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/white-back-arrow.png")}
          ></Image>
        </TouchableOpacity>
      </CameraView>
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
  camera: {
    flex: 1,
  },
});

export default BarcodeCamera;
