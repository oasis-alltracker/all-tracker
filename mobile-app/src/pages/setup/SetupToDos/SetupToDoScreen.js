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

export default function SetupToDos(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [selectedButton, setSelectedButton] = useState()

  const nextButton = () => {
    navigation.navigate('SetupDiet')
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
        <TrackerIcon title='to-dos' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      <View style={styles.headerTextView}>
        <ScribbledText style={styles.headerText}>Would you like to receive</ScribbledText>
        <ScribbledText style={styles.headerText}>reminders for upcoming tasks?</ScribbledText>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {selectButton(0)}} 
          style={[styles.todoSelection, selectedButton==0 && styles.selectedButton]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>1 hour before</ScribbledText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {selectButton(1)}} 
          style={[styles.todoSelection, selectedButton==1 && styles.selectedButton]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>1 day before</ScribbledText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {selectButton(2)}} 
          style={[styles.todoSelection, selectedButton==2 && styles.selectedButton]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>Custom</ScribbledText>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {selectButton(3)}} 
          style={[styles.todoSelection, selectedButton==3 && styles.selectedButton]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>No, thanks</ScribbledText>
            </View>
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
