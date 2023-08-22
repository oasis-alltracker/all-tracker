import React, { useState, useEffect } from 'react'

import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'
import TrackerIcon from '../../../components/TrackerIcon/TrackerIcon'
import SegmentedPicker from 'react-native-segmented-picker';
import { imperialHeight, metricHeight } from '../../../data/dataArrays'

export default function SetupDiet(props) {
  const { navigation } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [selectedButton, setSelectedButton] = useState()
  const [selectedGoal, setSelectedGoal] = useState()
  const [selectedGender, setSelectedGender] = useState()
  const [currentPage, setCurrentPage] = useState()
  const [age, setAge] = useState()
  const [heightUnit, setHeightUnit] = useState('0')
  const [heightDisplay, setHeightDisplay] = useState()
  const [height, setHeight] = useState()
  const [weightDisplay, setWeightDisplay] = useState()
  const [weightUnit, setWeightUnit] = useState('0')
  const [weight, setWeight] = useState()
  const [isHeightPickerVisible, setHeightPickerVisible] = useState(false)
  const [activityLevel, setActivityLevel] = useState()
  const [intensityLevel, setIntensityLevel] = useState()

  const PAGES = {
    GOAL: 0,
    GENDER: 1,
    AGE: 2,
    HEIGHT: 3,
    WEIGHT: 4,
    ACTIVITY_LEVEL: 5,
    INTENSITY: 6,
    RESULTS: 7,
    NOTIFICATION: 8
  }

  const nextButton = () => {
    switch(currentPage) {
      case PAGES.GOAL: setCurrentPage(PAGES.GENDER); break;
      case PAGES.GENDER: setCurrentPage(PAGES.AGE); break;
      case PAGES.AGE: setCurrentPage(PAGES.HEIGHT); break;
      case PAGES.HEIGHT: setCurrentPage(PAGES.WEIGHT); break;
      case PAGES.WEIGHT: setCurrentPage(PAGES.ACTIVITY_LEVEL); break;
      case PAGES.ACTIVITY_LEVEL: setCurrentPage(PAGES.INTENSITY); break;
      case PAGES.INTENSITY: setCurrentPage(PAGES.RESULTS); break;
      case PAGES.RESULTS: setCurrentPage(PAGES.NOTIFICATION); break;
      case PAGES.NOTIFICATION: setCurrentPage(PAGES.NOTIFICATION); break;
      default: navigation.navigate('SetupFitness'); break;
    }
    
  }
  const backButton = () => {
    switch(currentPage) {
      case PAGES.GOAL: navigation.goBack(); break
      case PAGES.GENDER: setCurrentPage(PAGES.GOAL); break;
      case PAGES.AGE: setCurrentPage(PAGES.GENDER); break;
      case PAGES.HEIGHT: setCurrentPage(PAGES.AGE); break;
      case PAGES.WEIGHT: setCurrentPage(PAGES.HEIGHT); break;
      case PAGES.ACTIVITY_LEVEL: setCurrentPage(PAGES.WEIGHT); break;
      case PAGES.INTENSITY: setCurrentPage(PAGES.ACTIVITY_LEVEL); break;
      case PAGES.RESULTS: setCurrentPage(PAGES.INTENSITY); break;
      case PAGES.NOTIFICATION: setCurrentPage(PAGES.RESULTS); break;
      default: navigation.goBack(); break;
    }
  }

  useEffect(() => {
    setCurrentPage(PAGES.INTENSITY)
  }, [])

  const confirmHeight = (newHeight) => {
    setHeightPickerVisible(false)
    let metricValue = 0
    if (heightUnit == 0) {
      metricValue = newHeight["cm"]
      setHeightDisplay(metricValue + ' cm')
    }
    else {
      const feetValue = newHeight["feet"]
      const inchValue = newHeight["inches"]
      metricValue = Math.round((parseInt(feetValue) * 12 + parseInt(inchValue)) * 2.54)
      setHeightDisplay(feetValue + " ft " + inchValue + " in")
    }
    setHeight(metricValue)
  }

  const clearWeight = () => {
    setWeightDisplay('')
  }

  const changeHeight = (unit) => {
    if(unit == 0){
      setHeightDisplay(height + ' cm')
    }
    else{
      const convertedValue = Math.round(height / 2.54)
      const feetValue = Math.floor(convertedValue/12)
      setHeightDisplay(feetValue + ' ft ' + convertedValue % 12 + ' in')
    }
    setHeightUnit(unit)
  }

  const addWeightUnit = () => {
    let metricValue = 0
    if(weightUnit == 0){
      metricValue = weightDisplay
      setWeightDisplay(metricValue + ' kg')
    }
    else{
      metricValue = Math.round(weightDisplay * 0.4535 * 10)/10  // multiply and divide by 10 rounds to nearest 1 decimal
      setWeightDisplay(weightDisplay + ' lb')
    }
    setWeight(metricValue)
  }

  const changeWeightUnit = (unit) => {
    if(unit == 0){
      setWeightDisplay(weight + ' kg')
    }
    else{
      const convertedValue = Math.round((weight * 2.204)*10)/10 // multiply and divide by 10 rounds to nearest 1 decimal
      setWeightDisplay(convertedValue + ' lb')
    }
    setWeightUnit(unit)
  }

  const selectButton = (selectedButton, stateModifier) => {
    stateModifier(selectedButton)
  }

  const displayCurrentPage = () => {
    switch(currentPage) {
      case PAGES.GOAL: return renderGoalPage()
      case PAGES.GENDER: return renderGenderPage()
      case PAGES.AGE: return renderAgePage()
      case PAGES.HEIGHT: return renderHeightPage()
      case PAGES.WEIGHT: return renderWeightPage()
      case PAGES.ACTIVITY_LEVEL: return renderActiveLevelPage()
      case PAGES.INTENSITY: return renderIntensityPage()
      default: return renderGoalPage()
    }
  }

  const renderGoalPage = () => {
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerText}>What is your goal?</ScribbledText>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {selectButton(0, setSelectedGoal)}} 
            style={[styles.buttonSelection, selectedGoal==0 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Lose weight</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(1, setSelectedGoal)}} 
            style={[styles.buttonSelection, selectedGoal==1 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Maintain weight</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(2, setSelectedGoal)}} 
            style={[styles.buttonSelection, selectedGoal==2 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Gain weight</ScribbledText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderGenderPage = () => {
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerText}>What is your sex?</ScribbledText>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {selectButton(0, setSelectedGender)}} 
            style={[styles.buttonSelection, selectedGender==0 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Female</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(1, setSelectedGender)}} 
            style={[styles.buttonSelection, selectedGender==1 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Male</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(2, setSelectedGender)}} 
            style={[styles.buttonSelection, selectedGender==2 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Other</ScribbledText>
          </TouchableOpacity>
        </View>
      </View>
    )   
  }

  const renderAgePage = () => {
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerTextSmall}>What year were you born?</ScribbledText>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Age'
              onChangeText={setAge}
              keyboardType="number-pad"
              value={age}
            />
          </View>
        </View>
      </View>
    )
  }

  const renderHeightPage = () => {
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerTextSmall}>How tall are you?</ScribbledText>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              onPress={() => {setHeightPickerVisible(true)}}>
                <ScribbledText style={styles.input}>{heightDisplay}</ScribbledText>
            </TouchableOpacity>
          </View>

          <SegmentedPicker
            visible={isHeightPickerVisible}
            onConfirm={confirmHeight}
            options={heightUnit == 0 ? metricHeight : imperialHeight}
          />

          <View style={styles.unitContainer}>
            <TouchableOpacity
              onPress={() => {selectButton(0, changeHeight)}} 
              style={[styles.smallButtonSelection, heightUnit==0 && styles.selectedButton]}>
                <ScribbledText style={styles.selectionText}>cm</ScribbledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {selectButton(1, changeHeight)}} 
              style={[styles.smallButtonSelection, heightUnit==1 && styles.selectedButton]}>
                <ScribbledText style={styles.selectionText}>ft</ScribbledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const renderWeightPage = () => {
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerTextSmall}>What's your weight?</ScribbledText>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Weight'
              onChangeText={setWeightDisplay}
              onBlur={addWeightUnit}
              onFocus={clearWeight}
              keyboardType="number-pad"
              value={weightDisplay}
            />
          </View>
          <View style={styles.unitContainer}>
            <TouchableOpacity
              onPress={() => {selectButton(0, changeWeightUnit)}} 
              style={[styles.smallButtonSelection, weightUnit==0 && styles.selectedButton]}>
                <ScribbledText style={styles.selectionText}>kg</ScribbledText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {selectButton(1, changeWeightUnit)}} 
              style={[styles.smallButtonSelection, weightUnit==1 && styles.selectedButton]}>
                <ScribbledText style={styles.selectionText}>lb</ScribbledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const renderActiveLevelPage = () => {
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerTextSmall}>How active are you?</ScribbledText>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {selectButton(0, setActivityLevel)}} 
            style={[styles.buttonSelection, activityLevel==0 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Not very active</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(1, setActivityLevel)}} 
            style={[styles.buttonSelection, activityLevel==1 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Moderately active</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(2, setActivityLevel)}} 
            style={[styles.buttonSelection, activityLevel==2 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Active</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(3, setActivityLevel)}} 
            style={[styles.buttonSelection, activityLevel==3 && styles.selectedButton]}>
              <ScribbledText style={styles.selectionText}>Very Active</ScribbledText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderIntensityPage = () => {
    const ultimateIntensity = weightUnit == 0 ? '1kg' : '2.2lb'
    const steadyIntensity = weightUnit == 0 ? '0.75kg' : '1.65lb'
    const gradualIntensity = weightUnit == 0 ? '0.5kg' : '1.1lb'
    const relaxedIntensity = weightUnit == 0 ? '0.25kg' : '0.55lb'
    return (
      <View style={styles.pageView}>
        <View style={styles.headerTextView}>
          <ScribbledText style={styles.headerTextSmall}>Choose your intensity</ScribbledText>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {selectButton(0, setIntensityLevel)}} 
            style={[styles.intensityButtonSelection, intensityLevel==0 && styles.selectedButton]}>
              <View style={styles.buttonHeader}>
                <ScribbledText style={styles.selectionText}>Ultimate</ScribbledText>
                <ScribbledText style={styles.selectionText}>5 weeks</ScribbledText>
              </View>
              <ScribbledText style={styles.smallText}>{ultimateIntensity + '/week'}</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(1, setIntensityLevel)}} 
            style={[styles.intensityButtonSelection, intensityLevel==1 && styles.selectedButton]}>
              <View style={styles.buttonHeader}>
                <ScribbledText style={styles.selectionText}>Steady</ScribbledText>
                <ScribbledText style={styles.selectionText}>5 weeks</ScribbledText>
              </View>
              <ScribbledText style={styles.smallText}>{steadyIntensity + '/week'}</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(2, setIntensityLevel)}} 
            style={[styles.intensityButtonSelection, intensityLevel==2 && styles.selectedButton]}>
              <View style={styles.buttonHeader}>
                <ScribbledText style={styles.selectionText}>Gradual</ScribbledText>
                <ScribbledText style={styles.selectionText}>5 weeks</ScribbledText>
              </View>
              <ScribbledText style={styles.smallText}>{gradualIntensity + '/week'}</ScribbledText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {selectButton(3, setIntensityLevel)}} 
            style={[styles.intensityButtonSelection, intensityLevel==3 && styles.selectedButton]}>
              <View style={styles.buttonHeader}>
                <ScribbledText style={styles.selectionText}>Relaxed</ScribbledText>
                <ScribbledText style={styles.selectionText}>5 weeks</ScribbledText>
              </View>
              <ScribbledText style={styles.smallText}>{relaxedIntensity + '/week'}</ScribbledText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TrackerIcon title='diet' buttonStyle={styles.trackerIcon} imageStyle={styles.iconImage} textStyle={styles.iconText}/>
      </View>
      {displayCurrentPage()}
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
