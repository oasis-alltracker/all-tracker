import React, { useState } from 'react'

import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'
import TrackerIcon from '../../../components/TrackerIcon/TrackerIcon'

export default function SetupHabits(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const nextButton = () => {
    navigation.navigate('SetupToDos')
  }
  const backButton = () => {
    navigation.goBack()
  }

  const createHabit = () => {

  }
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TrackerIcon title='habits' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      <View style={styles.headerTextView}>
        <ScribbledText style={styles.headerText}>Get started by creating new</ScribbledText>
        <ScribbledText style={styles.headerText}>habits you'd like to adopt</ScribbledText>
      </View>
      <View style={styles.content}>
        <View style={styles.placeHolderView}>
          <ScribbledText style={styles.placeHolderText}>You can do this later if you'd like</ScribbledText>
        </View>
        <TouchableOpacity
        onPress={createHabit}
        style={styles.createButton}>
        <Image
          style={styles.addIcon}
          source={require('@assets/icons/addIcon.png')}
        />
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
