import { CameraView, useCameraPermissions } from "expo-camera";
import {
  Camera,
  CodeScanner,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Alert } from "react-native";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import navigationService from "../../../navigators/navigationService";
import { useFocusEffect } from "@react-navigation/native";

const BarcodeScanner = ({ route }) => {
  //const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      Toast.show("Please place food barcode\nin view of the camera.", {
        ...styles.errorToast,
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }, [])
  );

  useEffect(() => {
    if (!hasPermission) {
      setIsLoading(true);
      requestPermission();
      setIsLoading(false);
    }
  }, [hasPermission]);

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

  const CameraComponent = () => {
    if (!hasPermission) {
      return (
        <Text>
          Denied permissions, go into settings to change camera permissions to
          allowed.
        </Text>
      );
    }
    if (device == null) {
      return <NoCameraErrorView />;
    }
    return <Camera style={styles.camera} device={device} isActive={false} />;
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <CameraComponent />
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

export default BarcodeScanner;
