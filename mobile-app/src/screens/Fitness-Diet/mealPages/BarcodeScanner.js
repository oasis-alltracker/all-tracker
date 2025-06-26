import { CameraView, useCameraPermissions } from "expo-camera";
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import navigationService from "../../../navigators/navigationService";
import { useFocusEffect } from "@react-navigation/native";

const BarcodeScanner = ({ route }) => {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsScanning(false);
      if (hasPermission) {
        Toast.show("Please place food barcode\nin view of the camera.", {
          ...styles.errorToast,
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    }, [hasPermission])
  );

  useEffect(() => {
    if (!hasPermission) {
      setIsLoading(true);
      requestPermission();
      setIsLoading(false);
    }
  }, [hasPermission]);

  const exitPage = (barcode) => {
    var params = {
      prevPage: route.params.prevPage,
      meal: route.params.meal,
      mealName: route.params.mealName,
      dayString: route.params.dayString,
    };
    if (barcode != null) {
      params["barcodeData"] = {
        type: barcode.type,
        data: barcode.data,
      };
    }
    navigationService.navigate("searchFood", params);
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "ean-8", "upc-e", "upc-a"],
    onCodeScanned: (codes) => {
      setIsScanning(true);
      setIsLoading(true);
      const result = [{ type: codes[0].type, data: codes[0].value }];
      setTimeout(() => {
        setIsScanning(false);
        setIsLoading(false);
        exitPage(result);
      }, 1000);
    },
  });

  const PermissionNotice = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => exitPage(null)}>
          <Image
            style={styles.backArrow}
            source={require("../../../assets/images/back-arrow.png")}
          ></Image>
        </TouchableOpacity>
        <View style={styles.deniedPermissionsText}>
          <Text style={styles.textStyle}>
            Camera permissions are required to use this barcode scanner.
          </Text>
          <Text style={styles.textStyle}>
            Please close the app and allow camera permissions in your settings,
            then return to this page.
          </Text>
        </View>
      </View>
    );
  };

  if (!hasPermission) {
    return <PermissionNotice />;
  }
  if (device == null) {
    return <NoCameraErrorView />;
  }
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          codeScanner={isScanning ? undefined : codeScanner}
        />
        <View style={styles.cameraElementsContainer}>
          <TouchableOpacity onPress={() => exitPage(null)}>
            <Image
              style={[styles.backArrow, styles.backArrowCameraActive]}
              source={require("../../../assets/images/back-arrow.png")}
            />
          </TouchableOpacity>
          <Image
            style={styles.viewfinder}
            source={require("../../../assets/images/barcode-viewfinder.png")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cameraElementsContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  backArrow: {
    position: "absolute",
    height: 50,
    width: 50,
    marginTop: 60,
    marginLeft: 20,
  },
  backArrowCameraActive: {
    tintColor: "white",
  },
  viewfinderContainer: {
    alignItems: "center",
  },
  viewfinder: {
    flex: 1,
    position: "relative",
    height: 300,
    width: 375,
    top: 300,
    left: 20,
    tintColor: "white",
  },
  camera: {
    flex: 1,
    zIndex: 1,
  },
  deniedPermissionsText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Sego",
    color: "#25436B",
  },
});

export default BarcodeScanner;
