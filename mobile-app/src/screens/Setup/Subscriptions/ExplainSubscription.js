import React, { useEffect, useState } from "react";
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

const ExplainSubscription = (props) => {
  const { width, height } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(false);
  const headerHeight = 119;

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
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <Header showCenter={false} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Text style={[styles.title, { marginTop: height * 0.05 }]}>
          1 month <Text style={styles.bold}>free</Text>
        </Text>
        <Text style={styles.title}>then $2.99/month</Text>
        <View style={styles.middleContainer}>
          <Image
            source={require("../../../assets/images/subscription-image.png")}
            style={[
              styles.poster,
              { height: height * 0.26, marginBottom: height * 0.02 },
            ]}
          />
          <Text style={styles.text}>
            Find <Text style={styles.bold}>equilibrium</Text>
          </Text>
          <Text style={styles.text}>
            Discover <Text style={styles.bold}>balance</Text>
          </Text>
          <Text style={styles.text}>
            Unleash your{" "}
            <Text style={[styles.bold, { color: ValueSheet.colours.textPink }]}>
              Oasis
            </Text>
          </Text>
          <View style={{ width: width * 0.8 }}>
            <Text style={[styles.bottomMessage, { marginTop: height * 0.01 }]}>
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
    backgroundColor: ValueSheet.colours.background,
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
    backgroundColor: ValueSheet.colours.imageBackgroundYellow,
  },
  text: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 24,
    color: ValueSheet.colours.primaryColour,
    textAlign: "center",
  },
  bottomMessage: {
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 12,
    color: ValueSheet.colours.primaryColour,
    textAlign: "center",
  },
  title: {
    color: ValueSheet.colours.primaryColour,
    fontFamily: ValueSheet.fonts.primaryFont,
    fontSize: 28,
    textAlign: "center",
  },
  bold: {
    fontFamily: ValueSheet.fonts.primaryBold,
  },
});
