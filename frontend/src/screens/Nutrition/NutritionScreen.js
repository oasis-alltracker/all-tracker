import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
  Alert,
} from 'react-native'
import dynamicStyles from './styles'
import ModalMealScreen from '../ModalMeal/ModalMealScreen'
import { ProgressChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-native-modal'
import { useTheme } from 'dopenative'

function NutritionScreen({ navigation, route }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [visibleModal, setVisibleModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteMealId, setDeleteMealId] = useState(-1)
  const dispatch = useDispatch()

  const removeMeal = mealId => dispatch({ type: 'REMOVE_MEAL', mealId })
  const nutrition = useSelector(state => state.nutrition.nutrition)

  useEffect(() => {
    navigation.setParams({ onPressModal })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (deleteMealId !== -1) {
      showDeleteScreen(deleteMealId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMealId])
  const toggleModal = () => {
    setVisibleModal(null)
  }

  const onPressModal = () => {
    setVisibleModal('swipeable')
  }

  const onPressDeleteIcon = mealId => {
    setDeleteModal(!deleteModal)
    setDeleteMealId(mealId)
  }

  const onPressDeleteMeal = () => {
    removeMeal(deleteMealId)
    setDeleteModal(-1)
  }

  const onPressCancel = () => {
    setDeleteMealId(-1)
  }

  const showDeleteScreen = id => {
    onPressDeleteIcon(id)
    Alert.alert(
      'Are you sure you want to delete this meal?',
      '',
      [
        { text: 'Yes', onPress: () => onPressDeleteMeal() },
        {
          text: 'Cancel',
          onPress: () => onPressCancel(),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    )
  }

  const renderFood = ({ item, index }) => (
    <View
      key={index}
      style={
        index === 0 ? styles.foodContainerBoarderless : styles.foodContainer
      }>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodQuantity}>{item.quantity}</Text>
        </View>
        <Text style={styles.foodCalories}>{item.calories}</Text>
      </View>
    </View>
  )

  const renderMeal = ({ item, index }) => (
    <View key={index} style={styles.mealContainer}>
      <Text style={styles.mealName}>{item.meal}</Text>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={item.foods}
        renderItem={renderFood}
        //keyExtractor={item => `${item.id}`}
        listKey={index => `${index}`}
      />
      <TouchableHighlight
        style={styles.deleteIconContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => onPressDeleteIcon(item.id)}>
        <Image
          style={styles.deleteIcon}
          source={require('../../assets/icons/deleteIcon.png')}
        />
      </TouchableHighlight>
    </View>
  )

  const getCaloriesDone = () => {
    var calories = 0
    nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories
      })
    })
    return calories
  }

  const macroNutrients = route.params.macroNutrients //navigation.getParam('macroNutrients');
  const caloriesDone = getCaloriesDone()
  const data = {
    labels: ['Protien', 'Carb', 'Fat'], // optional
    data: [
      macroNutrients.proteinDone / macroNutrients.proteinGoal,
      macroNutrients.carbDone / macroNutrients.carbGoal,
      macroNutrients.fatDone / macroNutrients.fatGoal,
    ],
    strokeWidth: 2,
  }

  const renderChart = () => {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You burned <Text style={styles.caloriesText}>{caloriesDone}</Text>{' '}
            calories today
          </Text>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <ProgressChart
            data={data}
            width={SCREEN_WIDTH}
            height={200}
            chartConfig={{
              backgroundGradientFrom:
                theme.colors[appearance].primaryBackground,
              backgroundGradientTo: theme.colors[appearance].primaryBackground,
              color: (opacity = 1) => `rgba(114, 101, 290, ${opacity})`,
            }}
          />
        </View>
        <View>
          <View style={styles.macroRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.orangeBox} />
              <Text style={styles.macroNutrientName}>Protein</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>
              {macroNutrients.proteinDone}g
            </Text>
            <Text style={styles.macroNutrientProcent}>
              {(
                (macroNutrients.proteinDone / macroNutrients.proteinGoal) *
                100
              ).toPrecision(2)}
              %
            </Text>
          </View>
          <View style={styles.macroRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.purpleBox} />
              <Text style={styles.macroNutrientName}>Carb</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>
              {macroNutrients.carbDone}g
            </Text>
            <Text style={styles.macroNutrientProcent}>
              {(
                (macroNutrients.carbDone / macroNutrients.carbGoal) *
                100
              ).toPrecision(2)}
              %
            </Text>
          </View>
          <View style={styles.macroRowContainerBorderless}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.greenBox} />
              <Text style={styles.macroNutrientName}>Fat</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>
              {macroNutrients.fatDone}g
            </Text>
            <Text style={styles.macroNutrientProcent}>
              {(
                (macroNutrients.fatDone / macroNutrients.fatGoal) *
                100
              ).toPrecision(2)}
              %
            </Text>
          </View>
        </View>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={nutrition}
        renderItem={renderMeal}
        ListHeaderComponent={renderChart}
        //keyExtractor={item => `${item.id}`}
        listKey={-1}
      />
      <Modal
        isVisible={visibleModal === 'swipeable'}
        onSwipeComplete={() => setVisibleModal(null)}
        swipeDirection={['down']}>
        <ModalMealScreen toggleModal={toggleModal} />
      </Modal>
    </View>
  )
}

export default NutritionScreen
