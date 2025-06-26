import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from "react-native-vision-camera";
import { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";
import navigationService from "../../../navigators/navigationService";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const BarcodeScanner = ({ route }) => {
  const device = useCameraDevice("back");
  const format = useCameraFormat(device, [
    { videoResolution: "max" },
    { photoResolution: "max" },
  ]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const viewfinderWidth = 375;
  const viewfinderHeight = 300;

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
    codeTypes: ["ean-13", "ean-8", "upc-e", "upc-a"],
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
      <SafeAreaView style={styles.container}>
        <View style={styles.cameraElementsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => exitPage(null)}
          >
            <Image
              style={styles.backArrow}
              source={require("../../../assets/images/back-arrow.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.deniedPermissionsText}>
          <Text style={styles.textStyle}>
            Camera permissions are required to use this barcode scanner.
          </Text>
          <Text style={styles.textStyle}>
            Please close the app and allow camera permissions in your settings,
            then return to this page.
          </Text>
        </View>
      </SafeAreaView>
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
          format={format}
          fps={30}
          photoQualityBalance="speed"
          codeScanner={isScanning ? undefined : codeScanner}
        />
        <View style={styles.cameraElementsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => exitPage(null)}
          >
            <Image
              style={[styles.backArrow, styles.backArrowCameraActive]}
              source={require("../../../assets/images/back-arrow.png")}
            />
          </TouchableOpacity>
          <Image
            style={[
              styles.viewfinder,
              {
                top: windowHeight / 2 - viewfinderHeight / 2,
                left: windowWidth / 2 - viewfinderWidth / 2,
                height: viewfinderHeight,
                width: viewfinderWidth,
              },
            ]}
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
  },
  backArrowContainer: {
    position: "absolute",
    height: 75,
    width: 75,
    marginTop: 35,
    padding: 10,
    zIndex: 100,
  },
  backArrow: {
    position: "absolute",
    height: 35,
    width: 35,
    marginTop: 20,
    marginLeft: 10,
  },
  backArrowCameraActive: {
    tintColor: "white",
  },
  viewfinder: {
    flex: 1,
    position: "absolute",
    tintColor: "white",
  },
  camera: {
    flex: 1,
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
