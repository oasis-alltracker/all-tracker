import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { Button } from "../../../components";
import navigationService from "../../../navigators/navigationService";
import { SafeAreaView } from "react-native-safe-area-context";
import Spinner from "react-native-loading-spinner-overlay";
import Purchases from "react-native-purchases";

const { width, height } = Dimensions.get("window");
const ExplainSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async () => {
    setIsLoading(true);
    try {
      if (Platform.OS === "android") {
        Purchases.configure({ apiKey: "goog_qebjpCbePNjgIZTDmsuXLciQyyt" });
      } else if (Platform.OS === "ios") {
        Purchases.configure({ apiKey: "appl_UOmgvrKMTaUIkAHVZouJukEKHLQ" });
      }
      const offerings = await Purchases.getOfferings();
      const { current } = offerings;
      console.log("current", current);

      if (current) {
        const { monthly } = current;

        if (monthly) {
          const purchaseMade = await Purchases.purchasePackage(monthly);
          // Handle purchaseMade if necessary
          console.log("Purchase made:", purchaseMade);
        } else {
          Alert.alert("Error", "Monthly subscription not available.");
        }
      } else {
        Alert.alert("Error", "No offerings available.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to acquire subscription.");
      console.error(error);
    }
    setIsLoading(false);
    await navigationService.reset("main", 0);
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Spinner visible={isLoading}></Spinner>
      <View
        style={{
          height: height * 0.9,
          justifyContent: "center",
        }}
      >
        <Text style={[styles.title, { marginTop: height * 0.09 }]}>
          1 month <Text style={styles.bold}>free</Text>
        </Text>
        <Text style={styles.title}>then $2.99/month</Text>
        <View style={styles.middleContainer}>
          <Image
            source={require("../../../assets/images/subscription-image.png")}
            style={styles.poster}
          />
          <Text style={styles.text}>
            Find <Text style={styles.bold}>equilibrium</Text>
          </Text>
          <Text style={styles.text}>
            Discover <Text style={styles.bold}>balance</Text>
          </Text>
          <Text style={styles.text}>
            Unleash your{" "}
            <Text style={[styles.bold, { color: "#B981E7" }]}>Oasis</Text>
          </Text>
          <View style={{ width: width * 0.8 }}>
            <Text style={[styles.bottomMessage, { marginTop: height * 0.04 }]}>
              To use this app you must subscribe to the Oasis:All-Access plan
            </Text>
          </View>
        </View>
      </View>

      <Button onPress={() => subscribe()} style={styles.nextButton}>
        Subscribe
      </Button>
    </SafeAreaView>
  );
};

export default ExplainSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subtitle: {
    color: "#25436B",
    fontSize: 24,
    fontFamily: "Sego-Bold",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 15,
  },
  nextButton: {
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#25436B",
    fontSize: 25,
  },
  middleContainer: {
    flex: 1,
    paddingVertical: 30,
    alignItems: "center",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    resizeMode: "contain",
    backgroundColor: "rgba(255, 232, 163, 0.4)",
    height: height * 0.3,
    marginBottom: 20,
  },
  text: {
    fontFamily: "Sego",
    fontSize: 24,
    color: "#25436B",
    marginTop: 2,
    textAlign: "center",
  },
  bottomMessage: {
    fontFamily: "Sego",
    fontSize: 14,
    color: "#25436B",
    marginTop: 2,
    textAlign: "center",
  },
  title: {
    color: "#25436B",
    fontFamily: "Sego",
    fontSize: 32,
    marginTop: 7,
    textAlign: "center",
  },
  bold: {
    fontFamily: "Sego-Bold",
  },
});
