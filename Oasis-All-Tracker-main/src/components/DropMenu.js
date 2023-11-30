import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DropMenu = ({ getRef, items }) => {
  const [visible, setVisible] = useState(false);
  const { top } = useSafeAreaInsets();

  useEffect(() => {
    let ref = {
      open: () => setVisible(true),
      close: () => setVisible(false),
    };
    getRef(ref);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => setVisible(false)}
      style={styles.container}
      activeOpacity={1}
    >
      <View style={styles.menu(top)}>
        {items.map((item, index) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={styles.item}
            key={index}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "flex-end",
  },
  menu: (top) => ({
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    marginTop: top + 10,
    marginRight: 16,
    borderRadius: 12,
    paddingVertical: 3,
    minWidth: 120,
  }),
  item: {
    paddingVertical: 10,
  },
  text: {
    fontFamily: "Sego",
    color: "#1C1B20",
    fontSize: 15,
  },
});

export default DropMenu;
