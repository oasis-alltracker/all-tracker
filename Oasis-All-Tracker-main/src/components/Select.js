import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { memo, useEffect, useState } from "react";

const Select = ({ getRef, items, onPress, active }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ref = {
      open: () => setVisible(true),
      close: () => setVisible(false),
    };
    getRef(ref);
  }, []);

  return (
    <Modal
      statusBarTranslucent
      transparent
      onRequestClose={() => setVisible(false)}
      visible={visible}
      animationType="fade"
    >
      <TouchableOpacity
        onPress={() => setVisible(false)}
        activeOpacity={1}
        style={styles.modal}
      >
        <View style={styles.container}>
          <FlatList
            data={items}
            ListHeaderComponent={
              <Text
                style={[styles.itemText, { alignSelf: "center", fontSize: 20 }]}
              >
                Select Option
              </Text>
            }
            keyExtractor={(e, i) => i}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  onPress(item);
                }}
                style={[styles.item, active === item.name && styles.active]}
              >
                <Text style={styles.itemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingVertical: 16 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 400,
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  item: {
    paddingVertical: 15,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  itemText: {
    color: "#1C1B20",
    fontFamily: "Sego-Bold",
    fontSize: 16,
  },
  active: {
    backgroundColor: "#ECFAF4",
  },
});

export default memo(Select);
