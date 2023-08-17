import React, { useState } from 'react'

import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'
import TrackerIcon from '../../../components/TrackerIcon/TrackerIcon'
import NotificationToggle from '../../../components/NotificationToggle/NotificationToggle'
import ReminderComponent from '../../../components/ReminderComponent/ReminderComponent'

export default function SetupSleep(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const nextButton = () => {
    navigation.navigate('SetupFitness')
  }
  const backButton = () => {
    navigation.goBack()
  }
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TrackerIcon title='sleep' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      <View style={styles.content}>
        <NotificationToggle/>
        <ReminderComponent title='Morning alarm'/>
        <ReminderComponent title='Bedtime reminder'/>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={backButton}
          style={styles.navigationBack}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <ScribbledText style={styles.navigationText}>Back</ScribbledText>
            </View>
          
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextButton}
          style={styles.navigationNext}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <ScribbledText style={styles.navigationText}>Next</ScribbledText>
            </View>
          
        </TouchableOpacity>
      </View>
  </ScrollView>
  )
  }
