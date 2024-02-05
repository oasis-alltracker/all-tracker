import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

const IsPositiveSelector = ({onGoodOrBad, isPositiveIndex}) => {
  const [active, setActive] = useState(isPositiveIndex);
  const [isLoaded, setIsLoaded] = useState(false)
  const items = [ "Good", "Bad"];
  const updateActive = (index) =>{
    setActive(index);
    onGoodOrBad(index)
  }
  useEffect(() => {
    if(!isLoaded){
      if(active != isPositiveIndex){
        setActive(isPositiveIndex)
      }
    }
    setIsLoaded(true);
  }, []);
  return (
    <View style={[styles.itemContainer, styles.itemContainer2]}>
      <View style={styles.bottomItems}>
        {items.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                updateActive(index);
              }}
              key={index.toString()}
              style={[
                styles.itemContainer,
                styles.itemContainer3,
                index === active && { backgroundColor: "#D7F6FF" },
              ]}
            >
              <Text style={styles.smallText}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,
    marginBottom: 10,
  },
  itemContainer2: {
    flexDirection: "column",
    width:150
  },
  itemContainer3: {
    borderRadius: 15,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 0,
    borderWidth: 2,
    borderColor: "rgba(172, 197, 204, 0.75)",
    width:58,
    alignItems: "center",
    
  },

  line: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 22,
    color: "#25436B",
    fontFamily: "Sego",
    marginLeft: 15,
    flex: 1,
  },
  bottomItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },
  smallText: {
    color: "#25436B",
    fontSize: 12,
    fontFamily: "Sego",
    paddingHorizontal:5
  },
});

export default IsPositiveSelector;
