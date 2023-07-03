import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
} from 'react-native'
import dynamicStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'dopenative'

function ModalMealScreen({ toggleModal }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const dispatch = useDispatch()
  const nutrition = useSelector(state => state.nutrition.nutrition)

  const addMeal = meal => dispatch({ type: 'ADD_MEAL', meal })

  const [meal, setMeal] = useState([
    { id: 0, name: 'Snack', check: false },
    { id: 1, name: 'Lunch', check: false },
    { id: 2, name: 'Dinner', check: false },
    { id: 3, name: 'Breakfast', check: false },
  ])

  const [foods, setFoods] = useState([
    {
      id: 0,
      name: 'Chicken',
      calories: 150,
      quantity: '200 grams',
      check: false,
    },
    {
      id: 1,
      name: 'Pasta',
      calories: 150,
      quantity: '200 grams',
      check: false,
    },
    {
      id: 2,
      name: 'Cereal',
      calories: 300,
      quantity: '100 grams',
      check: false,
    },
    {
      id: 3,
      name: 'Milk',
      calories: 100,
      quantity: '200 grams',
      check: false,
    },
    {
      id: 4,
      name: 'Eggs',
      calories: 300,
      quantity: '200 grams',
      check: false,
    },
    {
      id: 5,
      name: 'Bannana',
      calories: 150,
      quantity: '200 grams',
      check: false,
    },
    {
      id: 6,
      name: 'Apple',
      calories: 100,
      quantity: '100 grams',
      check: false,
    },
  ])

  const checkValidation = () => {
    let mealArr = meal
    let foodArr = foods
    var mealValid,
      foodValid = 0
    mealArr.map(data => {
      if (data.check) {
        mealValid = 1
      }
    })
    foodArr.map(data => {
      if (data.check) {
        foodValid = 1
      }
    })
    if (mealValid && foodValid) {
      return 1
    } else {
      return 0
    }
  }

  const onPressAdd = () => {
    let mealType = ''
    console.log(meal)
    meal.map(data => {
      if (data.check) {
        mealType = data.name
      }
    })
    let foodsArr = []
    foods.map(data => {
      if (data.check) {
        foodsArr.push(data)
      }
    })
    var id = 0
    if (nutrition.length > 0) {
      id = nutrition[nutrition.length - 1].id + 1
    }
    let newMeal = {
      id: id,
      meal: mealType,
      foods: foodsArr,
    }

    toggleModal()
    addMeal(newMeal)
  }

  const onPressMeal = id => {
    let arr = [...meal]
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true
      } else {
        data.check = false
      }
    })
    setMeal(arr)
  }

  const onPressFood = id => {
    let arr = [...foods]
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true
      } else if (data.check && data.id == id) {
        data.check = false
      }
    })
    setFoods(arr)
  }

  const renderMeal = ({ item, index }) => (
    <TouchableHighlight
      key={index}
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => onPressMeal(item.id)}>
      <View style={styles.mealContainer}>
        <Image
          style={styles.circle}
          source={
            item.check
              ? require('../../assets/icons/fullCircle.png')
              : require('../../assets/icons/emptyCircle.png')
          }
        />
        <Text style={styles.mealTitle}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  )

  const renderFood = ({ item, index }) => (
    <TouchableHighlight
      key={index}
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => onPressFood(item.id)}>
      <View style={styles.foodRowContainer}>
        <Text style={styles.foodTitle}>{item.name}</Text>
        <Image
          style={styles.circle}
          source={
            item.check
              ? require('../../assets/icons/fullCircle.png')
              : require('../../assets/icons/emptyCircle.png')
          }
        />
      </View>
    </TouchableHighlight>
  )

  const renderMealHeader = () => {
    return (
      <>
        <View style={styles.bar} />
        <View style={styles.titleContainer}>
          <Image
            style={styles.mealIcon}
            source={require('../../assets/icons/mealIcon.png')}
          />
          <Text style={styles.mainTxt}>Choose food</Text>
          <Text style={styles.secTxt}>
            Select your meal and your foods that you consume today
          </Text>
        </View>
      </>
    )
  }

  const renderFoodList = () => {
    return (
      <>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          data={foods}
          renderItem={renderFood}
          keyExtractor={item => `${item.id}`}
        />

        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          style={
            checkValidation()
              ? styles.btnContainer
              : styles.btnContainerDisabled
          }
          onPress={() =>
            checkValidation() ? onPressAdd() : console.log('button not working')
          }>
          <Text style={styles.btnTxt}>Add</Text>
        </TouchableHighlight>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={4}
        data={meal}
        renderItem={renderMeal}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={renderMealHeader}
        ListFooterComponent={renderFoodList}
      />
    </View>
  )
}

export default ModalMealScreen
