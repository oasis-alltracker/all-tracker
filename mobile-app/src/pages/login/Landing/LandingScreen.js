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

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

export default function LandingScreen(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

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
