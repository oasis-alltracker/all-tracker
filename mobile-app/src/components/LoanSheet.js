import { View, Text, StyleSheet, PanResponder, Animated } from "react-native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "./Button";

const LoanSheet = ({ getRef, onPress }) => {
  const { bottom } = useSafeAreaInsets();
  const animatedHeight = useRef(new Animated.Value(200 + bottom)).current;

  const [item, setItem] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ref = {
      open: (item) => {
        setVisible(true);
        animation(0);
        setItem(item);
      },

      close: () => {
        setVisible(false);
      },
    };
    getRef(ref);
  }, []);

  const animation = useCallback((height) => {
    Animated.spring(animatedHeight, {
      toValue: height,
      bounciness: true,
      useNativeDriver: true,
    }).start(() => {
      if (height > 200) {
        // setVisible(false);
      }
    });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy >= 0) {
          animatedHeight.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy <= 20) {
          animation(0);
        } else {
          animation(200 + bottom);
        }
      },
    }),
  ).current;

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: 200 + bottom,
          transform: [{ translateY: animatedHeight }],
        },
      ]}
    >
      <View {...panResponder.panHandlers} style={styles.dragCon}>
        <View style={styles.drag} />
      </View>
      <Text style={styles.text}>Per month:</Text>
      <View style={styles.row}>
        <Text style={[styles.text, { fontSize: 32 }]}>$1,280</Text>
        <Text style={[styles.text, { fontFamily: "Sego" }]}>
          You will pay:{" "}
          <Text style={[styles.text, { fontFamily: "Sego-Bold" }]}>
            $30,737
          </Text>
        </Text>
      </View>
      <Button onPress={onPress} style={styles.button}>
        Apply Now
      </Button>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1B20",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 1,
  },
  text: {
    color: "#fff",
    fontFamily: "Sego-Bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 24,
  },
  button: {
    marginBottom: 0,
  },
  dragCon: {
    paddingVertical: 10,
  },
  drag: {
    backgroundColor: "#34323D",
    height: 6,
    borderRadius: 5,
    width: 32,
    alignSelf: "center",
  },
});

export default memo(LoanSheet);
