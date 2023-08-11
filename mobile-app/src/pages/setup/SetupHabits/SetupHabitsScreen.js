import React, { useState } from 'react'

import {
  View,
  TouchableHighlight,
  ScrollView,
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
        <TouchableHighlight
          onPress={backButton}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.createButton}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <ScribbledText style={styles.createText}>Create</ScribbledText>
            </View> 
        </TouchableHighlight>
      </View>
      <View style={styles.navigation}>
        <TouchableHighlight
          onPress={backButton}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.navigationBack}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <ScribbledText style={styles.navigationText}>Back</ScribbledText>
            </View>
          
        </TouchableHighlight>
        <TouchableHighlight
          onPress={nextButton}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.navigationNext}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <ScribbledText style={styles.navigationText}>Next</ScribbledText>
            </View>
          
        </TouchableHighlight>
      </View>
      
  </ScrollView>
  )
  }
