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

export default function SetupFitness(props) {
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
        <TrackerIcon title='fitness' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      <View style={styles.headerTextView}>
        <ScribbledText style={styles.headerText}>Start your fitness journey with</ScribbledText>
        <ScribbledText style={styles.headerText}>custom workout templates</ScribbledText>
      </View>
      <View style={styles.content}>
        <TouchableHighlight
          onPress={backButton}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.fitnessSelection}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>Create your own templates</ScribbledText>
            </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={backButton}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.fitnessSelection}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>Browse our list of templates</ScribbledText>
            </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={backButton}
          underlayColor="rgba(73,182,77,1,0.9)"
          style={styles.fitnessSelection}>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <ScribbledText style={styles.selectionText}>Skip for now</ScribbledText>
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
