import { Text, Modal, StyleSheet, Platform, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Header from "./Header";
import Button from "./Button";
import { useSelector } from "react-redux";
import DownloadIcon from "../assets/icons/download";
import ImageViewer from "react-native-image-zoom-viewer";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const ImageView = ({ getRef, isAvatar }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ index: 1, images: [] });

  const { isLight } = useSelector((state) => state.main);
  const { top } = useSafeAreaInsets();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ref = {
      open: (data) => {
        setVisible(true);
        setData(data);
      },
      close: () => setVisible(false),
    };
    getRef(ref);
  }, []);

  const downloadFile = async () => {
    const parts = data.images[data.index].url?.split("/");
    const fileName = parts[parts.length - 1];

    const result = await FileSystem.downloadAsync(
      data.images[data.index].url,
      FileSystem.documentDirectory + fileName
    );

    requestPermission().then(async (res) => {
      if (res.granted) {
        await MediaLibrary.createAssetAsync(result.uri);
        setMessage("Saved to gallery");
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 1500);
      } else {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 1500);
        setMessage("You need to give the app permission to save the image!");
      }
    });
  };

  const renderImages = useMemo(
    () => (
      <ImageViewer
        saveToLocalByLongPress={false}
        onChange={(index) => {
          setData((pr) => ({ images: pr.images, index }));
        }}
        backgroundColor="transparent"
        renderIndicator={() => null}
        index={data.index}
        imageUrls={data.images.map((val) => {
          return {
            url: val.uri,
          };
        })}
      />
    ),
    [data.images]
  );

  return (
    <Modal
      statusBarTranslucent
      transparent={true}
      animationType="fade"
      onRequestClose={() => setVisible(false)}
      visible={visible}
    >
      <SafeAreaView style={styles.modal(isLight)}>
        <Header
          style={{ marginTop: Platform.OS === "ios" ? top : 0 }}
          onLeftPressed={() => setVisible(false)}
          rightComponent={
            !isAvatar ? (
              <Button onPress={downloadFile} style={styles.button}>
                <DownloadIcon color={"#fff"} />
                <Text style={styles.buttonText}>Download</Text>
              </Button>
            ) : null
          }
        />
        {renderImages}
        {showMessage && (
          <View style={styles.message}>
            <Text style={styles.messageTxt}>{message}</Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: (isLight) => ({
    flex: 1,
    backgroundColor: isLight ? "#fff" : "#16171B",
  }),
  downloadText: (isLight) => ({
    color: isLight ? "#151518" : "#fff",
    fontFamily: "Sego",
    marginRight: 8,
    marginTop: 3,
    opacity: isLight ? 0.5 : 1,
  }),
  message: {
    position: "absolute",
    zIndex: 2,
    alignSelf: "center",
    bottom: 100,
    backgroundColor: "rgba(255,255,255,0.5)",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
  },
  messageTxt: {
    fontFamily: "Sego",
    color: "#151518",
  },
  button: {
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 30,
    marginBottom: 0,
  },
  buttonText: {
    fontFamily: "Sego-Bold",
    color: "#fff",
    marginLeft: 8,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    top: 0,
  },
});

export default ImageView;
