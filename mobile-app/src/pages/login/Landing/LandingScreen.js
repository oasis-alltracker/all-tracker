import React, { useRef, useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import {isLoggedIn} from '../../../user/keychain'

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

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

export default function LandingScreen(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      if(await isLoggedIn()){
        console.log("Logged in.")
        //go to dashboard
      }
      setLoading(false);
    }
    
    checkIsLoggedIn();
  }, [loading]);




  const onPressGetStarted = () => {
    navigation.navigate('SignIn')
  }

  const onPressLogin = () => {
    navigation.navigate('SignIn')
  }

  const Screen = () => {
    if (!loading) {
      return (
        <ScrollView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/icons-draft2/landing-logo.png')}
      />
      <Image
        style={styles.mainImage}
        source={require('../../../assets/icons-draft2/landing-image.png')}
      />
      <View style={styles.logContainer}>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.btnContainer}
          onPress={() => onPressGetStarted()}>
          <ScribbledText style={styles.btnText}>Get Started</ScribbledText>
        </TouchableHighlight>
        <View style={styles.bottomRowContainer}>
          <ScribbledText style={styles.text}>Already have an account?</ScribbledText>
          <TouchableHighlight
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressLogin()}>
            <ScribbledText style={styles.signText}>Sign in</ScribbledText>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
      )
    }
    else{
      return(
        <CircularProgress />
      )
    }
  }

  return (
      <Screen/>
  )
}
