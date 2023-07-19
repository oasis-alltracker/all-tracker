import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'
import LogoHeader from '../../../components/LogoHeader/LogoHeader'
import { TextInput } from 'react-native-gesture-handler'
import ContinueButton from '../../../components/ContinueButton/ContinueButton'
import OTPInput from '../../../components/OTPInput/OTPInput'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

export default function OTPScreen(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [otpValue, setOTPValue] = useState('')

  const renderImage = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.photoUrl }} />
      </View>
    </TouchableHighlight>
  )

  const onPressGetStarted = () => {
    navigation.navigate('SignIn')
  }

  const onPressLogin = () => {
    navigation.navigate('SignIn')
  }

  return (

    <ScrollView contentContainerStyle ={styles.container}>
      <View style={styles.signupHeader}>
        <LogoHeader
            onPress={() => {
                props.navigation.goBack()
            }}
        />
      </View>
      <View style={styles.signupContent}> 
        <ScribbledText style={styles.title}>Check your inbox for OTP Code</ScribbledText>
        <View style={styles.inputContainer}>
            <OTPInput setValue={setOTPValue}/>
        </View>
        <ContinueButton onPress={() => {console.log(otpValue)}} />
      </View>
    </ScrollView>
  )
}
