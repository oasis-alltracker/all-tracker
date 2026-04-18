import { ValueSheet } from "../../../ValueSheet";
import {
  Camera,
  useCodeScanner,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from "react-native-vision-camera";
import { useState, useCallback, useEffect, useContext } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import Spinner from "react-native-loading-spinner-overlay";
import navigationService from "../../../navigators/navigationService";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

const BarcodeScanner = ({ route }) => {
  const device = useCameraDevice("back");
  const format = useCameraFormat(device, [
    { videoResolution: "max" },
    { photoResolution: "max" },
  ]);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStatus, setCameraStatus] = useState(false);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const viewfinderWidth = 375;
  const viewfinderHeight = 300;

  const theme = useContext(ThemeContext).value;

  useFocusEffect(
    useCallback(() => {
      setIsScanning(false);
      if (hasPermission) {
        setCameraStatus(true);
        Toast.show({
          type: "info",
          text1: "Food barcode scanning",
          text2: "Please place barcode in view of the camera.",
          topOffset: windowHeight / 2 - 30, //centering toast; default toast height is 60, 60/2 is 30
        });
      }
    }, [hasPermission])
  );

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ["ean-13", "ean-8", "upc-e", "upc-a"],
    onCodeScanned: (codes) => {
      if (!isScanning) {
        setCameraStatus(false);
        setIsScanning(true);
        setIsLoading(true);
        const type = codes[0].type;
        const data = codes[0].value;
        setTimeout(() => {
          setIsLoading(false);
          exitPage(type, data);
        }, 1000);
      }
    },
  });

  const exitPage = (barcodeType, barcodeData) => {
    var params = { ...route.params };

    if (barcodeType && barcodeData) {
      params["barcodeInfo"] = {
        type: barcodeType,
        data: barcodeData,
      };
    }

    navigationService.navigate("searchFood", params);
  };

  const PermissionNotice = () => {
    return (
      <SafeAreaView
        style={[styles.container, sharedStyles["pageBackground_" + theme]]}
      >
        <View style={styles.cameraElementsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => exitPage(null, null)}
          >
            <Image
              style={[styles.backArrow, sharedStyles["tint_" + theme]]}
              source={require("../../../assets/images/back-arrow.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.deniedPermissionsMessage}>
          <Text
            style={[
              styles.deniedPermissionsHeader,
              sharedStyles["textColour_" + theme],
            ]}
          >
            Camera Permissions Required
          </Text>
          <Text
            style={[
              styles.deniedPermissionsText,
              sharedStyles["textColour_" + theme],
            ]}
          >
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
          isActive={cameraStatus}
          format={format}
          codeScanner={codeScanner}
        />
        <View style={styles.cameraElementsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.backArrowContainer}
            onPress={() => exitPage(null, null)}
          >
            <Image
              style={[styles.backArrow, sharedStyles["tint_dark"]]}
              source={require("../../../assets/images/back-arrow.png")}
            />
          </TouchableOpacity>
          <Image
            style={[
              styles.viewfinder,
              sharedStyles["tint_dark"],
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
  viewfinder: {
    flex: 1,
    position: "absolute",
  },
  camera: {
    flex: 1,
  },
  deniedPermissionsMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  deniedPermissionsHeader: {
    fontSize: 32,
    fontFamily: ValueSheet.fonts.primaryBold,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 100,
  },
  deniedPermissionsText: {
    fontSize: 20,
    fontFamily: ValueSheet.fonts.primaryFont,
    alignSelf: "center",
    textAlign: "center",
  },
});

export default BarcodeScanner;
