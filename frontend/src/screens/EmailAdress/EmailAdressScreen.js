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

function EmailAdressScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const addUserEmail = email => dispatch({ type: 'ADD_USEREMAIL', email })

  const onPressButton = () => {
    addUserEmail(email)
    navigation.navigate('Password')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            navigation.goBack()
          }}
        />

        <Text style={styles.title}>What is your email address?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#9c9eb9"
            onChangeText={setEmail}
            value={email}
          />
        </View>

        <ContinueButton onPress={() => onPressButton()} />
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default EmailAdressScreen
