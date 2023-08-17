import React, {useState} from 'react'
import { TouchableOpacity, View, Switch } from 'react-native'
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
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.EVERYDAY)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.EVERYDAY) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.EVERYDAY}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.SUN)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.SUN) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.SUN}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.MON)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.MON) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.MON}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.TUE)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.TUE) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.TUE}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.WED)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.WED) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.WED}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.THU)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.THU) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.THU}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.FRI)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.FRI) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.FRI}</ScribbledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {chooseDay(DAYS.SAT)}} 
        style={[styles.dayContainer, selectedDays.includes(DAYS.SAT) && styles.daySelected]}>
        <ScribbledText style={styles.dayText}>{DAYS.SAT}</ScribbledText>
      </TouchableOpacity>
    </View>
  )
}
