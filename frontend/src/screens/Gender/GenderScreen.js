import React, { useState } from 'react'
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

function GenderScreen({ navigation }) {
  const [gender, setGender] = useState('')
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const dispatch = useDispatch()

  const addUserGender = gender => dispatch({ type: 'ADD_USERGENDER', gender })

  const onPressButton = () => {
    navigation.navigate('Main', { screen: 'Success' })
    addUserGender(gender)
  }

  return (
    <ScrollView style={styles.container}>
      <LogoHeader
        onPress={() => {
          navigation.goBack()
        }}
      />
      <View style={styles.middleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Which one are you?</Text>
        </View>
        <View style={styles.rowContainer}>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            style={styles.iconContainer}
            onPress={() => setGender('male')}>
            <View>
              <Image
                style={styles.circle}
                source={
                  gender == 'male'
                    ? require('../../assets/icons/fullCircle.png')
                    : require('../../assets/icons/emptyCircle.png')
                }
              />
              <Image
                style={styles.icon}
                source={require('../../assets/images/male.png')}
              />
              <Text style={styles.genderText}>Male</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            style={styles.iconContainer}
            onPress={() => setGender('female')}>
            <View>
              <Image
                style={styles.circle}
                source={
                  gender == 'female'
                    ? require('../../assets/icons/fullCircle.png')
                    : require('../../assets/icons/emptyCircle.png')
                }
              />
              <Image
                style={styles.icon}
                source={require('../../assets/images/female.png')}
              />
              <Text style={styles.genderText}>Female</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.secText}>
            To give you a better experience we need to know your gender
          </Text>
        </View>
      </View>
      <ContinueButton
        onPress={() => {
          onPressButton()
        }}
      />
    </ScrollView>
  )
}
export default GenderScreen
