import React, { useState } from 'react'
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

function HelpScreen({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const dispatch = useDispatch()

  const addUserHelp = help => dispatch({ type: 'ADD_USERHELP', help })

  const [nutrition, setNutrition] = useState(false)
  const [weight, setWeight] = useState(false)
  const [sleep, setSleep] = useState(false)
  const [fitness, setFitness] = useState(false)

  const onPressButton = () => {
    navigation.navigate('Interests')
    var arr = []
    if (nutrition) {
      arr.push('nutrition')
    }
    if (weight) {
      arr.push('weight')
    }
    if (sleep) {
      arr.push('sleep')
    }
    if (fitness) {
      arr.push('fitness')
    }
    addUserHelp(arr)
  }

  return (
    <ScrollView style={styles.container}>
      <LogoHeader
        onPress={() => {
          navigation.goBack()
        }}
      />

      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Let us know how we can help you</Text>
        <Text style={styles.secText}>You always can change this later</Text>
      </View>
      <TouchableHighlight
        style={styles.helpContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => setWeight(!weight)}>
        <View style={styles.rowContainer}>
          <Text style={styles.helpText}>Weight Loss</Text>
          <Image
            style={styles.icon}
            source={
              weight
                ? require('../../assets/icons/fullCircle.png')
                : require('../../assets/icons/emptyCircle.png')
            }
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.helpContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => setSleep(!sleep)}>
        <View style={styles.rowContainer}>
          <Text style={styles.helpText}>Better sleeping habbit</Text>
          <Image
            style={styles.icon}
            source={
              sleep
                ? require('../../assets/icons/fullCircle.png')
                : require('../../assets/icons/emptyCircle.png')
            }
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.helpContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => setNutrition(!nutrition)}>
        <View style={styles.rowContainer}>
          <Text style={styles.helpText}>Track my nutrition</Text>
          <Image
            style={styles.icon}
            source={
              nutrition
                ? require('../../assets/icons/fullCircle.png')
                : require('../../assets/icons/emptyCircle.png')
            }
          />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.helpContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => setFitness(!fitness)}>
        <View style={styles.rowContainer}>
          <Text style={styles.helpText}>Improve overall fitness</Text>
          <Image
            style={styles.icon}
            source={
              fitness
                ? require('../../assets/icons/fullCircle.png')
                : require('../../assets/icons/emptyCircle.png')
            }
          />
        </View>
      </TouchableHighlight>

      <ContinueButton onPress={() => onPressButton()} />
    </ScrollView>
  )
}

export default HelpScreen
