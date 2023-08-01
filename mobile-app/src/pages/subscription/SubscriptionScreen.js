import React, { useRef, useState, useEffect } from 'react'

import {
  View,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../components/ScribbledText'

export default function SubscriptionScreen(props) {
  var navigation = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const onPressContinue = () => {
    console.log("do subscriptions...")
  }
  const onPressGoBack = () => {
    navigation.navigate('ChooseTrack')
  }

  return (
    <ScrollView style={styles.container}>
    <View style={styles.backHeader}>
      <TouchableHighlight
        onPress={() => onPressGoBack()}
        style={styles.iconContainer}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/icons-draft2/back-arrow.png')}
        />
      </TouchableHighlight>
    </View>

    <View style={styles.topRowContainer}>
      <ScribbledText style={styles.salesText}>1 month</ScribbledText>
      <ScribbledText style={styles.purpleTextSales}>free</ScribbledText>
    </View>
    <View style={styles.regularTextContainer}>
      <ScribbledText style={styles.salesText}>then $2.99/month</ScribbledText>
    </View>


    <Image
      style={styles.mainImage}
      source={require('../../assets/icons-draft2/subscription-image.png')}
    />


    <View style={styles.regularTextContainer}>
        <ScribbledText style={styles.quoteText}>Find equilibrium</ScribbledText>
    </View>

    <View style={styles.bottomRowContainer}>
      <ScribbledText style={styles.quoteText}>Discover</ScribbledText>
      <TouchableHighlight
        onPress={() => onPressLogin()}>
        <ScribbledText style={styles.purpleTextQuote}>balance</ScribbledText>
      </TouchableHighlight>
    </View>

    <View style={styles.regularTextContainer}>
      <ScribbledText style={styles.quoteText}>Unleash potential</ScribbledText>
    </View>


    <View style={styles.logContainer}>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,1,0.9)"
        style={styles.btnContainer}
        onPress={() => onPressContinue()}>
        <ScribbledText style={styles.btnText}>Continue</ScribbledText>
      </TouchableHighlight>
    </View>
  </ScrollView>
  )
}