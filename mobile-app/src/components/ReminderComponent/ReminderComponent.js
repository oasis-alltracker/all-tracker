import React, { useState } from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../ScribbledText'
import ToggleSwitch from 'toggle-switch-react-native'
import DaySelector from '../DaySelector/DaySelector'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function ReminderComponent({ onPress, title }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [toggleState, setToggleState] = useState(false)
  const [time, setTime] = useState(new Date())
  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    setTime(selectedDate);
  };

  const [showPicker, setShowPicker] = useState(false)

  const [additionalTime, setAdditionalTime] = useState([])

  const formatDateObject = (dateObject) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    return dateObject.toLocaleString('en-US', options)
  }

  const addTime = () => {
     
  }

  const TimeComponent = () => {
    return( 
      <View>
        <DaySelector/>
        <View style={styles.timeContainer}>
          <ScribbledText style={styles.timeDescription}>At what time?</ScribbledText>
          <TouchableOpacity
            onPress={() => {setShowPicker(true)}}
            style={styles.timeValueButton}>
              <ScribbledText style={styles.timeValue}>{formatDateObject(time)}</ScribbledText>   
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
    )
  }

  return (
    <View style={styles.reminderContainer}>
      <View style={styles.reminderHeader}>
        <ScribbledText style={styles.reminderTitle}>{title}</ScribbledText>
        <ToggleSwitch isOn={toggleState} onColor={'#25436B'} onToggle={(isOn) => {setToggleState(isOn)}}/>
      </View>
      <TimeComponent/>
      <TouchableOpacity
          onPress={addTime}>
          <Image
            style={styles.addIcon}
            source={require('@assets/icons/addIcon.png')}
          />
      </TouchableOpacity>
    </View>
  )
}
