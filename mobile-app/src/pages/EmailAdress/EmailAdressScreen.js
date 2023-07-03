import React, { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import dynamicStyles from './styles'
import { useTheme } from 'dopenative'
import { TouchableHighlight } from 'react-native-gesture-handler'


function EmailAdressScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const onPressButton = () => {
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
        <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#9c9eb9"
            onChangeText={setEmail}
            value={email}
          />
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
                source={require('../../assets/icons/apple-32.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.iconContainer}
              onPress={async () => googleSignin()}
              underlayColor="rgba(73,182,77,1,0.9)">
              <Image
                style={styles.accountIcon}
                source={require('../../assets/icons/google.png')}
              />
            </TouchableHighlight>
          </View>
          </View>
        </View>

        <ContinueButton onPress={() => onPressButton()} />
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default EmailAdressScreen
