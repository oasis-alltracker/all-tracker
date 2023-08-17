import React, { useRef, useState, useEffect } from 'react'

import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'

export default function SubscriptionScreen(props) {
  const { navigation } = props
  

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [loading, setLoading] = useState(false);

  const onPressContinue = () => {
    navigation.navigate('SetupHabits')
  }
  const onPressGoBack = () => {
    navigation.goBack()
  }

  const Screen = () => {
    if (!loading) {
      return (
        <ScrollView style={styles.container}>
        <View style={styles.backHeader}>
          <TouchableOpacity
            onPress={() => onPressGoBack()}
            style={styles.iconContainer}>
            <Image
              style={styles.backIcon}
              source={require('../../../assets/icons/back-arrow.png')}
            />
          </TouchableOpacity>
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
          source={require('../../../assets/icons/subscription-image.png')}
        />


        <View style={styles.regularTextContainer}>
            <ScribbledText style={styles.quoteText}>Find equilibrium</ScribbledText>
        </View>

        <View style={styles.bottomRowContainer}>
          <ScribbledText style={styles.quoteText}>Discover</ScribbledText>
          <TouchableOpacity
            onPress={() => onPressLogin()}>
            <ScribbledText style={styles.purpleTextQuote}>balance</ScribbledText>
          </TouchableOpacity>
        </View>

        <View style={styles.regularTextContainer}>
          <ScribbledText style={styles.quoteText}>Unleash potential</ScribbledText>
        </View>


        <View style={styles.logContainer}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onPressContinue()}>
            <ScribbledText style={styles.btnText}>Continue</ScribbledText>
          </TouchableOpacity>
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
