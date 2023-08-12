import React, {useState} from 'react'
import { TouchableHighlight, View, Switch } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../ScribbledText'
import ToggleSwitch from 'toggle-switch-react-native'

export default function DaySelector({ onPress, title }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [selectedDays, setSelectedDays] = useState([])

  chooseDay = (day) => {
    if (day === DAYS.EVERYDAY) {
      setSelectedDays([day])
    }
    else {
      everydayRemoved = selectedDays.filter(currentDay => currentDay != DAYS.EVERYDAY )
      if (everydayRemoved.includes(day)) {
        newDays =  everydayRemoved.filter(currentDay => currentDay != day)
        setSelectedDays(newDays)
      }
      else {
        setSelectedDays([...everydayRemoved, day])
      }
    }
  }

  const DAYS = {
    EVERYDAY: 'Every Day',
    SUN: 'Sun',
    MON: 'Mon',
    TUE: 'Tue',
    WED: 'Wed',
    THU: 'Thu',
    FRI: 'Fri',
    SAT: 'Sat',
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.EVERYDAY)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.EVERYDAY) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.EVERYDAY}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.SUN)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.SUN) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.SUN}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.MON)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.MON) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.MON}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.TUE)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.TUE) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.TUE}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.WED)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.WED) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.WED}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.THU)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.THU) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.THU}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.FRI)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.FRI) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.FRI}</ScribbledText>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {chooseDay(DAYS.SAT)}} 
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.dayContainer, selectedDays.includes(DAYS.SAT) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.SAT}</ScribbledText>
      </TouchableHighlight>
    </View>
  )
}
