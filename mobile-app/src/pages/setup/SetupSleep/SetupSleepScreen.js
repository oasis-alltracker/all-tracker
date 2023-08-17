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
import ToggleSwitch from 'toggle-switch-react-native'
import DaySelector from '../../../components/DaySelector/DaySelector'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function SetupSleep(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [toggleState, setToggleState] = useState(false)
  const [time, setTime] = useState(new Date(1598051730000))

  const nextButton = () => {
    navigation.navigate('SetupFitness')
  }
  const backButton = () => {
    navigation.goBack()
  }

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    setTime(selectedDate);
  };

  const [showPicker, setShowPicker] = useState(false)
 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TrackerIcon title='sleep' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      <View style={styles.content}>
        <NotificationToggle/>
        <View style={styles.reminderContainer}>
          <View style={styles.reminderHeader}>
            <ScribbledText style={styles.reminderTitle}>Morning alarm</ScribbledText>
            <ToggleSwitch isOn={toggleState} onColor={'#25436B'} onToggle={(isOn) => {setToggleState(isOn)}}/>
          </View>
          <DaySelector/>
          <View style={{justifyContent: 'flex-start', width: '100%', flexDirection: 'row'}}>
            <ScribbledText style={{flex: 1,}}>At what time?</ScribbledText>
            <TouchableOpacity
              onPress={() => {setShowPicker(true)}}
              style={{flex: 1}}>
                <ScribbledText>{time.toLocaleTimeString()}</ScribbledText>   
            </TouchableOpacity>
            {showPicker && (<DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                onChange={onChange}
                />)}   
          </View>
        </View>
        <View style={styles.reminderContainer}>
          <View style={styles.reminderHeader}>
            <ScribbledText style={styles.reminderTitle}>Bedtime reminder</ScribbledText>
            <ToggleSwitch isOn={toggleState} onColor={'#25436B'} onToggle={(isOn) => {setToggleState(isOn)}}/>
          </View>
          <DaySelector/>
          <View style={{justifyContent: 'flex-start', width: '100%', flexDirection: 'row'}}>
            <ScribbledText style={{flex: 1,}}>At what time?</ScribbledText>
            <TouchableOpacity
              onPress={() => {setShowPicker(true)}}
              style={{flex: 1}}>
                <ScribbledText>{time.toLocaleTimeString()}</ScribbledText>   
            </TouchableOpacity>
            {showPicker && (<DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={'time'}
                is24Hour={true}
                onChange={onChange}
                />)}   
          </View>
        </View>
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
