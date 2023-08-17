import React from 'react'

import {
  View,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import TrackerIcon from '../../../components/TrackerIcon/TrackerIcon'
import LogoHeader from '../../../components/LogoHeader/LogoHeader'
import ScribbledText from '../../../components/ScribbledText'
import ContinueButton from '../../../components/ContinueButton/ContinueButton'
import UserAPI from '../../../api/user/userAPI'
import { getAccessToken } from '../../../user/keychain'

export default function LandingScreen(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  let selectedTrackers = []

  const onTrackerSelect = (title) => {
    if(selectedTrackers.includes(title)){
        selectedTrackers = selectedTrackers.filter(selectedTitles => selectedTitles !== title)
    }
    else{
        selectedTrackers.push(title)
    }
  }

  const setSelectedTrackers = async () => {
    const accessToken = await getAccessToken()
    const {status, data} = await UserAPI.updateUser(true, selectedTrackers, accessToken)
    if (status == 200) {
      //check subscription status
      await navigation.navigate("Subscription")
    }
    else {
        console.log("Something went wrong! status:", status, " data: ", data)
    }
    
    
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.setupHeader}>
          <LogoHeader
            navigation={navigation}
          />
        </View>
        <View style={styles.setupContent}>
            <ScribbledText style={styles.contentHeader}>What would you like to track?</ScribbledText>
            <View style={styles.setupRow}>
                <TrackerIcon title='habits' onPress={() => {onTrackerSelect('habits')}} buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
                <TrackerIcon title='to-dos' onPress={() => {onTrackerSelect('to-dos')}} buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
            </View>
            <View style={styles.setupRow}>
                <TrackerIcon title='diet' onPress={() => {onTrackerSelect('diet')}} buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
                <TrackerIcon title='fitness' onPress={() => {onTrackerSelect('fitness')}} buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
            </View>
            <View style={styles.setupRow}>
                <TrackerIcon title='sleep' onPress={() => {onTrackerSelect('sleep')}} buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
                <TrackerIcon title='mood' onPress={() => {onTrackerSelect('mood')}} buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
            </View>
            <View style={styles.continueButton}>
                <ContinueButton onPress={setSelectedTrackers}/>
            </View>
        </View>
  </ScrollView>
  )
}
