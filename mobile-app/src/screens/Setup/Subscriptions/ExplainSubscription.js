import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  Alert,
  Platform,
} from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAccessToken } from "../../../user/keychain";
import Spinner from "react-native-loading-spinner-overlay";
import Purchases from "react-native-purchases";
import { ValueSheet } from "../../../ValueSheet";
import { Header } from "../../../components";
import { ThemeContext } from "../../../contexts/ThemeProvider";
import { sharedStyles } from "../../styles";

const ExplainSubscription = (props) => {
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useContext(ThemeContext).value;

  const subscribe = async () => {
    setIsLoading(true);
    try {
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_qebjpCbePNjgIZTDmsuXLciQyyt" });
      } else if (Platform.OS === "ios") {
        Purchases.configure({ apiKey: "appl_UmNtbYioXdkYnRLudqwACDfioTQ" });
      }
      const offerings = await Purchases.getOfferings();
      const { current } = offerings;

      if (current) {
        const { monthly } = current;

        if (monthly) {
          const purchaseMade = await Purchases.purchasePackage(monthly);
          const accessToken = await getAccessToken();
          navigationService.reset("main", 0);
        } else {
          Alert.alert("Error", "Monthly subscription not available.");
        }
      } else {
        Alert.alert("Error", "No offerings available.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to purchase subscription.");
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.container, sharedStyles["pageBackground_" + theme]]}
    >
      <Spinner visible={isLoading}></Spinner>
      <Header showCenter={false} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={sharedStyles["textColour_" + theme]}>
          <Text style={[styles.title, { marginTop: height * 0.05 }]}>
            1 month <Text style={styles.bold}>free{"\n"}</Text>then $2.99/month
          </Text>
        </Text>
        <View style={styles.middleContainer}>
          <Image
            source={require("../../../assets/images/subscription-image.png")}
            style={[
              styles.poster,
              { height: height * 0.26, marginBottom: height * 0.02 },
            ]}
          />
          <Text style={sharedStyles["textColour_" + theme]}>
            <Text style={styles.text}>
              Find <Text style={styles.bold}>equilibrium{"\n"}</Text>
            </Text>
            <Text style={styles.text}>
              Discover <Text style={styles.bold}>balance{"\n"}</Text>
            </Text>
            <Text style={styles.text}>
              Unleash your{" "}
              <Text
                style={[
                  styles.bold,
                  { color: ValueSheet.colours[theme].textPink },
                ]}
              >
                Oasis
              </Text>
            </Text>
          </Text>
          <View style={{ width: width * 0.8 }}>
            <Text
              style={[
                styles.bottomMessage,
                { marginTop: height * 0.01 },
                sharedStyles["textColour_" + theme],
              ]}
            >
              Payment is optional. If you cancel the subscription, you won't
              lose access
            </Text>
          </View>
        </View>
      </View>

      <Button
        onPress={() => subscribe()}
        style={[styles.nextButton, { height: height * 0.065 }]}
      >
        Subscribe
      </Button>
    </SafeAreaView>
  );
};

export default ExplainSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nextButton: {
    marginHorizontal: 20,
  },
  middleContainer: {
    flex: 1,
    paddingVertical: 20,
    alignItems: "center",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    resizeMode: "contain",
    backgroundColor: ValueSheet.colours.dark.imageBackgroundYellow,
  },
  text: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 24,
    textAlign: "center",
  },
  bottomMessage: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 12,
    textAlign: "center",
  },
  title: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 28,
    textAlign: "center",
  },
  bold: {
    fontFamily: ValueSheet.fonts.primaryBold,
  },
});
