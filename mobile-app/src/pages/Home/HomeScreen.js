import React, { useState, useEffect } from 'react'
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

function HomeScreen({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [stepsDone, setStepsDone] = useState(7000)
  const [stepsGoal, setStepsGoal] = useState(10000)
  const [macroNutrients, setmacroNutrients] = useState({
    proteinDone: 100,
    proteinGoal: 160,
    carbDone: 60,
    carbGoal: 200,
    fatDone: 20,
    fatGoal: 75,
  })

  const waterDone = useSelector(state => state.water.waterDone)
  const waterGoal = useSelector(state => state.water.waterGoal)
  const nutritionGoal = useSelector(state => state.nutrition.nutritionGoal)
  const nutrition = useSelector(state => state.nutrition.nutrition)
  const userName = useSelector(state => state.registration.userName)
  const userPhoto = useSelector(state => state.registration.userPhoto)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.photoContainer}>
          <View style={styles.greenDot} />
          <Image style={styles.userPhoto} source={{ uri: userPhoto }} />
        </View>
      ),
    })
  }, [])

  const onPressNutrition = () => {
    navigation.navigate('Nutrition', {
      macroNutrients,
    })
  }

  const onPressSteps = () => {
    navigation.navigate('Steps', { stepsDone, stepsGoal })
  }

  const onPressDetailsText = () => {}

  const getCaloriesDone = () => {
    var calories = 0
    nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories
      })
    })
    return calories
  }

  const caloriesDone = getCaloriesDone()
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.boldText}>Good morning, {userName}</Text>
        <Text style={styles.normalText}>
          Eat the right amount of food and stay hydrated through the day
        </Text>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => onPressDetailsText()}>
          <Text style={styles.detailText}>More details</Text>
        </TouchableHighlight>
      </View>

      <TouchableHighlight
        style={styles.infoContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => onPressNutrition()}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.questionIcon}
            source={require('../../assets/icons/colorFood.png')}
          />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Nutrition</Text>
                <Text style={styles.secText}>
                  {caloriesDone} cal / {nutritionGoal} cal
                </Text>
              </View>
              <View
                style={
                  caloriesDone > nutritionGoal
                    ? styles.warningBtnContainer
                    : styles.btnContainer
                }>
                <Text
                  style={
                    caloriesDone > nutritionGoal
                      ? styles.warningBtnText
                      : styles.btnText
                  }>
                  {caloriesDone > nutritionGoal ? 'Warning' : 'On'}
                </Text>
              </View>
            </View>
            <View style={styles.bar}>
              <View
                style={
                  caloriesDone <= nutritionGoal
                    ? {
                        height: 12,
                        width: 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: (caloriesDone / nutritionGoal) * 100 + '%',
                        top: -4,
                        zIndex: 5,
                      }
                    : {
                        height: 12,
                        width: 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: '100%',
                        top: -4,
                        zIndex: 5,
                      }
                }
              />
              <View style={styles.bar1} />
              <View style={styles.bar2} />
              <View style={styles.bar3} />
            </View>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.infoContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => navigation.navigate('Water')}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.questionIcon}
            source={require('../../assets/icons/colorWater.png')}
          />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Water</Text>
                <Text style={styles.secText}>
                  {' '}
                  {waterDone} / {waterGoal} glasses
                </Text>
              </View>
              <View
                style={
                  waterDone <= waterGoal / 2
                    ? styles.warningBtnContainer
                    : styles.btnContainer
                }>
                <Text
                  style={
                    waterDone <= waterGoal / 2
                      ? styles.warningBtnText
                      : styles.btnText
                  }>
                  {waterDone <= waterGoal / 2 ? 'Warning' : 'On'}
                </Text>
              </View>
            </View>
            <View style={styles.bar}>
              <View
                style={
                  waterDone <= waterGoal
                    ? {
                        height: 12,
                        width: 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: (waterDone / waterGoal) * 100 + '%',
                        top: -4,
                        zIndex: 5,
                      }
                    : {
                        height: 12,
                        width: 2,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: '100%',
                        top: -4,
                        zIndex: 5,
                      }
                }
              />
              <View style={styles.bar3} />
              <View style={styles.bar2} />
              <View style={styles.bar1} />
            </View>
          </View>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.infoContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => onPressSteps()}>
        <View style={styles.rowContainer}>
          <Image
            style={styles.questionIcon}
            source={require('../../assets/icons/colorWalk.png')}
          />
          <View style={styles.columnContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.textContainer}>
                <Text style={styles.mainText}>Daily Steps</Text>
                <Text style={styles.secText}>
                  {stepsDone} steps / {stepsGoal} steps
                </Text>
              </View>
              <View
                style={
                  stepsDone <= stepsGoal / 2
                    ? styles.warningBtnContainer
                    : styles.btnContainer
                }>
                <Text
                  style={
                    stepsDone <= stepsGoal / 2
                      ? styles.warningBtnText
                      : styles.btnText
                  }>
                  {' '}
                  {stepsDone <= stepsGoal / 2 ? 'Warning' : 'On'}
                </Text>
              </View>
            </View>
            <View style={styles.bar}>
              <View
                style={
                  stepsDone <= stepsGoal
                    ? {
                        height: 12,
                        width: 2,
                        borderRadius: 8,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: (stepsDone / stepsGoal) * 100 + '%',
                        top: -4,
                        zIndex: 5,
                      }
                    : {
                        height: 12,
                        width: 2,
                        borderRadius: 8,
                        backgroundColor: 'black',
                        position: 'absolute',
                        left: '100%',
                        top: -4,
                        zIndex: 5,
                      }
                }
              />
              <View style={styles.bar3} />
              <View style={styles.bar2} />
              <View style={styles.bar1} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </ScrollView>
  )
}

export default HomeScreen
