import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import dynamicStyles from './styles'
import { useTheme } from 'dopenative'

function PasswordScreen({ navigation }) {
  const [password, setPassword] = useState('')
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const dispatch = useDispatch()

  const addUserPassword = password =>
    dispatch({ type: 'ADD_USERPASSWORD', password })

  const checkCharacters = () => {
    if (password.length < 8) {
      return 1
    }
    return 0
  }

  const checkUpperCase = () => {
    if (password.toUpperCase() === password) {
      return 1
    }
    return 0
  }

  const checkNumber = () => {
    return !/\d/.test(password)
  }

  const onPressButton = () => {
    navigation.navigate('FingerPrint')
    addUserPassword(password)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            navigation.goBack()
          }}
        />
        <Text style={styles.title}>Now let's set up your password</Text>
        <View style={styles.conditionContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9c9eb9"
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <View style={styles.rowContainer}>
            <View
              style={checkCharacters() ? styles.emptyBox : styles.fullBox}
            />
            <Text style={styles.conditionText}>8+ characters</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={checkUpperCase() ? styles.emptyBox : styles.fullBox} />
            <Text style={styles.conditionText}>At least 1 uppercase</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={checkNumber() ? styles.emptyBox : styles.fullBox} />
            <Text style={styles.conditionText}>At least 1 number</Text>
          </View>
        </View>
        <ContinueButton
          onPress={() => {
            onPressButton()
          }}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}
export default PasswordScreen
