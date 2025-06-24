import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from "react-native";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import navigationService from "../../../navigators/navigationService";
import { useFocusEffect } from "@react-navigation/native";

const BarcodeCamera = ({ route }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      var scanningOptions = {
        barcodeTypes: ["ean13", "ean8", "upc_e", "upc_a"],
        isHighlightingEnabled: true,
      };
      Toast.show("Please place food barcode\nin view of the camera.", {
        ...styles.errorToast,
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      if (permission && permission.granted && Platform.OS === "ios") {
        CameraView.launchScanner(scanningOptions);
        CameraView.onModernBarcodeScanned((data) => {
          handleScannedResult(data);
        });
      }
    }, [permission])
  );

  useEffect(() => {
    handlePermissions();
  }, [permission]);

  const handlePermissions = () => {
    if (permission && !permission.granted) {
      requestPermission();
      if (permission.granted) {
        setPermissionGranted(true);
        console.log("permissions have been granted");
      }
    }
    if (!permissionGranted) {
      return <View />;
    } else {
      return <CameraView />;
    }
  };

  const handleScannedResult = (barcodeScanningResult) => {
    if (!scanned) {
      setScanned(true);
      setIsLoading(true);
      setTimeout(() => {
        setScanned(false);
        setIsLoading(false);
        CameraView.dismissScanner();
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
          barcodeTypes: ["ean13", "ean8", "upc_e", "upc_a"],
        }}
        onBarcodeScanned={handleScannedResult}
      >
        <TouchableOpacity onPress={() => exitPage(null)}>
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.viewfinderContainer}>
          <Image
            style={styles.viewfinder}
            source={require("../../../assets/images/barcode-viewfinder.png")}
          ></Image>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  backArrow: {
    height: 50,
    width: 50,
    marginTop: 60,
    marginLeft: 20,
    tintColor: "white",
  },
  viewfinderContainer: {
    flex: 1,
    alignItems: "center",
  },
  viewfinder: {
    height: "37.5%",
    width: "80%",
    marginTop: 190,
    tintColor: "white",
  },
  camera: {
    flex: 1,
  },
});

export default BarcodeCamera;
