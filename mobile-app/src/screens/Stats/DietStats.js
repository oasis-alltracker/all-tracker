import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { ValueSheet } from "../../ValueSheet";
import { getAccessToken } from "../../user/keychain";
import StatsAPI from "../../api/stats/statsAPI";

const macroTitles = [
  {
    title: "Calories",
    macro: "calorieCount",
    goal: "calorieGoal",
  },
  {
    title: "Carbs",
    macro: "carbCount",
    goal: "carbGoal",
  },
  {
    title: "Protein",
    macro: "proteinCount",
    goal: "proteinGoal",
  },
  {
    title: "Fat",
    macro: "fatCount",
    goal: "fatGoal",
  },
];

const DietStats = ({ sunday, updateStats, dietGoals }) => {
  const defaultWeek = [
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ];
  const defaultArrays = {
    calorieCount: defaultWeek,
    carbCount: defaultWeek,
    proteinCount: defaultWeek,
    fatCount: defaultWeek,
  };

  const [macroIndex, setIndex] = useState(0);
  const [dataArrays, setDataArrays] = useState(defaultArrays);
  const [goalLines, setGoalLines] = useState(defaultArrays);
  const [graphMax, setMax] = useState(2000);

  useEffect(() => {
    getStats();
  }, [sunday, updateStats]);

  useEffect(() => {
    var lineArrays = [];

    macroTitles.forEach((item) => {
      var array;
      if (item.title == "Calories") {
        array = defaultWeek.map(() => {
          return { value: dietGoals[item.goal].value, hideDataPoint: true };
        });
      } else {
        array = defaultWeek.map(() => {
          return { value: dietGoals[item.goal], hideDataPoint: true };
        });
      }
      lineArrays.push(array);
    });

    setGoalLines(lineArrays);
  }, [dietGoals]);

  const getStats = async () => {
    try {
      var token = await getAccessToken();
      var statsData = await StatsAPI.getDietStats(token, sunday);

      //calculating the max value for each macro - needed for graph display
      var maxArray = [];

      macroTitles.forEach((item) => {
        var dietVal = dietGoals[item.goal];
        if (item.macro == "calorieCount") dietVal = dietVal.value;

        var max = Math.max(
          ...statsData[item.macro].map((item2) => item2.value)
        );
        if (dietVal > max) max = dietVal;
        maxArray.push(max);
      });

      setMax(maxArray);
      setDataArrays(statsData);
    } catch (e) {
      console.log(e);
    }
  };

  const updateIndex = (num) => {
    if (macroIndex + num >= 0 && macroIndex + num < 4)
      setIndex(macroIndex + num);
  };

  return (
    <View style={styles.chartBox}>
      <View style={styles.chartCircle}>
        <Image
          style={styles.imageCircle}
          source={require("../../assets/images/diet.png")}
        />
        <Text style={styles.text}>diet</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={dataArrays[macroTitles[macroIndex].macro]}
          data2={goalLines[macroIndex]}
          height={160}
          width={220}
          spacing={220 / 7}
          thickness={2}
          color1={ValueSheet.colours.purple}
          showYAxisIndices
          dataPointsColor1={ValueSheet.colours.borderPurple}
          color2={ValueSheet.colours.pink}
          dataPointsColor2={ValueSheet.colours.pink}
          maxValue={graphMax[macroIndex] * 1.1}
          noOfSections={6}
          hideRules
          textFontSize={13}
          textShiftY={-8}
          textShiftX={3}
          textColor={ValueSheet.colours.primaryColour}
          yAxisTextStyle={{ color: ValueSheet.colours.primaryColour }}
          areaChart
          startFillColor1={ValueSheet.colours.purple}
          endFillColor1={ValueSheet.colours.purple}
          startOpacity2={0.0}
          endOpacity2={0.0}
          startOpacity1={0.8}
          endOpacity1={0.1}
          xAxisLength={220}
          yAxisColor={ValueSheet.colours.black25}
          xAxisColor={ValueSheet.colours.black25}
        />
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              updateIndex(-1);
            }}
          >
            <Image
              style={[styles.icon, styles.leftIcon]}
              source={require("../../assets/images/left.png")}
            />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 20 }]}>
            {macroTitles[macroIndex].title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              updateIndex(+1);
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/images/left.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.legendEntry}>
            <View
              style={[
                styles.icon,
                { backgroundColor: ValueSheet.colours.pink },
              ]}
            ></View>
            <Text style={styles.text}> = goal </Text>
          </View>
          <View style={styles.legendEntry}>
            <View
              style={[
                styles.icon,
                { backgroundColor: ValueSheet.colours.purple },
              ]}
            ></View>
            <Text style={styles.text}> = consumed </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    paddingRight: 35,
  },
  chartCircle: {
    width: 75,
    height: 75,
    borderRadius: 45,
    backgroundColor: ValueSheet.colours.purple65,
    borderColor: ValueSheet.colours.purple,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    marginRight: 40,
  },
  imageCircle: {
    width: 28,
    height: 28,
  },
  text: {
    fontSize: 13,
    fontFamily: ValueSheet.fonts.primaryFont,
    color: ValueSheet.colours.primaryColour,
  },
  xLabel: {
    fontSize: 14,
    fontFamily: ValueSheet.fonts.primaryBold,
    color: ValueSheet.colours.primaryColour,
  },
  chartContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    width: 250,
    //alignSelf: "center",
    //justifySelf: "center",
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  leftIcon: {
    transform: [
      {
        rotate: "180deg",
      },
    ],
  },
  legendEntry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    width: "50%",
  },
});

export default DietStats;
