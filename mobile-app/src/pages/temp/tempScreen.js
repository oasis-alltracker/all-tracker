import React, { useRef, useState, useEffect } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native'
import dynamicStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'dopenative'
import {logout} from '../../user/keychain'


function TempScreen(props) {
  const { navigation } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const Screen = () => {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Temp</Text>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => logout(navigation)}>
            <Text style={styles.settingText}>Wellness</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => logout(navigation)}>
            <Text style={styles.settingText}>Productivity</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => logout(navigation)}>
            <Text style={styles.settingText}>Health</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => logout(navigation)}>
            <Text style={styles.settingText}>Log Out</Text>
            
          </TouchableOpacity>
        </ScrollView>
       )
    }
  
    return (
        <Screen/>
    )
  }

export default TempScreen