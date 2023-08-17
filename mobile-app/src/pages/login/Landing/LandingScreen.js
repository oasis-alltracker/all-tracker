import React, { useRef, useState, useEffect } from 'react'
import CircularProgress from 'react-native-circular-progress-indicator';
import {getAccessToken, isLoggedIn} from '../../../user/keychain'

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'
import UserAPI from '../../../api/user/userAPI';

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
        const accessToken = await getAccessToken()
        const {status: userStatus, data: userData} = await UserAPI.getUser(accessToken)
        const setupStatus = userData['isSetupComplete']
          
        if(setupStatus === 'true') {
            console.log("Go to navigation page")
        }
        else{
          await navigation.navigate('SelectTrackers')
        }
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
        source={require('../../../assets/icons/landing-logo.png')}
      />
      <Image
        style={styles.mainImage}
        source={require('../../../assets/icons/landing-image.png')}
      />
      <View style={styles.logContainer}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => onPressGetStarted()}>
          <ScribbledText style={styles.btnText}>Get Started</ScribbledText>
        </TouchableOpacity>
        <View style={styles.bottomRowContainer}>
          <ScribbledText style={styles.text}>Already have an account?</ScribbledText>
          <TouchableOpacity
            onPress={() => onPressLogin()}>
            <ScribbledText style={styles.signText}>Sign in</ScribbledText>
          </TouchableOpacity>
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
