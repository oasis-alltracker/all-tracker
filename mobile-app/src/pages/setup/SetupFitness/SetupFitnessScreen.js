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

export default function SetupFitness(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [selectedButton, setSelectedButton] = useState()

  const nextButton = () => {
    navigation.navigate('SetupSleep')
  }
  const backButton = () => {
    navigation.goBack()
  }

  const selectButton = (selectedButton) => {
    setSelectedButton(selectedButton)
  }
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TrackerIcon title='fitness' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      <View style={styles.headerTextView}>
        <ScribbledText style={styles.headerText}>What is your goal?</ScribbledText>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {selectButton(0)}} 
          style={[styles.fitnessSelection, selectedButton==0 && styles.selectedButton]}>
            <ScribbledText style={styles.selectionText}>Improve explosivity</ScribbledText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {selectButton(1)}} 
          style={[styles.fitnessSelection, selectedButton==1 && styles.selectedButton]}>
            <ScribbledText style={styles.selectionText}>Increase strength</ScribbledText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {selectButton(2)}} 
          style={[styles.fitnessSelection, selectedButton==2 && styles.selectedButton]}>
            <ScribbledText style={styles.selectionText}>Build muscle</ScribbledText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {selectButton(3)}} 
          style={[styles.fitnessSelection, selectedButton==3 && styles.selectedButton]}>
            <ScribbledText style={styles.selectionText}>Improve cardio</ScribbledText>
        </TouchableOpacity>
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
