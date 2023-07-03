import React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'
import dynamicStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'dopenative'

function WaterScreen() {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const dispatch = useDispatch()
  const waterDone = useSelector(state => state.water.waterDone)
  const waterGoal = useSelector(state => state.water.waterGoal)

  const incrementWater = () => dispatch({ type: 'INCREMENT_WATER' })
  const decrementWater = () => dispatch({ type: 'DECREMENT_WATER' })

  const renderGlass = ({ item }) => {
    return (
      <View style={styles.waterContainer}>
        {item < waterDone ? (
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => decrementWater()}>
            <Image
              style={styles.glass}
              source={require('../../assets/icons/fullGlass.png')}
            />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => incrementWater()}>
            <View>
              <Image
                style={styles.glass}
                source={require('../../assets/icons/emptyGlass.png')}
              />
              <Image
                style={styles.plus}
                source={require('../../assets/icons/plus.png')}
              />
            </View>
          </TouchableHighlight>
        )}
      </View>
    )
  }

  const waterArray = new Array(waterGoal).fill(null).map((u, i) => i)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          You drank <Text style={styles.waterText}>{waterDone} glasses</Text>{' '}
          today
        </Text>
      </View>
      <View style={styles.photoContainer}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={4}
          data={waterArray}
          renderItem={renderGlass}
          keyExtractor={item => `${item}`}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.mainText}>250 ml</Text>
          <Text style={styles.secText}>Water Drank</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.columnContainer}>
          <Text style={styles.mainText}>{waterGoal} glasses</Text>
          <Text style={styles.secText}>Daily goal</Text>
        </View>
      </View>
      <View
        style={
          waterDone <= waterGoal / 2
            ? styles.redContainer
            : styles.greenContainer
        }>
        <Text
          style={
            waterDone <= waterGoal / 2 ? styles.redText : styles.greenText
          }>
          {waterDone <= waterGoal / 2
            ? "You didn't drink enough water for today."
            : 'You drank enough water for now.'}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.performanceContainer}>
          <View style={styles.performanceRowContainer}>
            <Image
              style={styles.performanceIcon}
              source={require('../../assets/icons/goodFace.png')}
            />
            <View style={styles.perfromanceText}>
              <Text style={styles.mainText}>Best Performance</Text>
              <Text style={styles.secText}>Monday</Text>
            </View>
          </View>
          <Text style={styles.mainText}>10</Text>
        </View>
        <View style={styles.performanceContainerBorderless}>
          <View style={styles.performanceRowContainer}>
            <Image
              style={styles.performanceIcon}
              source={require('../../assets/icons/badFace.png')}
            />
            <View style={styles.perfromanceTextContainer}>
              <Text style={styles.mainText}>Worst Performance</Text>
              <Text style={styles.secText}>Sunday</Text>
            </View>
          </View>
          <Text style={styles.mainText}>6</Text>
        </View>
      </View>
    </View>
  )
}

export default WaterScreen
