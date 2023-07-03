import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

export default function SignInScreen(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const onPressButton = () => {
    props.navigation.navigate('Main', { screen: 'Home' })
  }

  const onPressAccount = () => {}

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
        <LogoHeader
          onPress={() => {
            props.navigation.goBack()
          }}
        />
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/email.png')}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#9c9eb9"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              style={styles.icon}
              source={require('../../assets/icons/password.png')}
            />
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9c9eb9"
              onChangeText={setPassword}
              value={password}
            />
          </View>
        </View>

        <View style={styles.signContainer}>
          <Text style={styles.txt}>Sign in with</Text>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              style={styles.iconContainer}
              onPress={() => onPressAccount()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image
                style={styles.accountIcon}
                source={require('../../assets/icons/twitter.png')}
              />
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.iconContainer}
              onPress={() => onPressAccount()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image
                style={styles.accountIcon}
                source={require('../../assets/icons/facebook.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.iconContainer}
              onPress={() => onPressAccount()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image
                style={styles.accountIcon}
                source={require('../../assets/icons/google.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
        <ContinueButton onPress={() => onPressButton()} />
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}
