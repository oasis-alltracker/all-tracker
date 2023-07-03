import React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Switch,
} from 'react-native'
import dynamicStyles from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'dopenative'

function SettingsScreen() {
  const dispatch = useDispatch()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const update = id => dispatch({ type: 'UPDATE_SETTINGS', id })
  const settings = useSelector(state => state.setting.settings)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>Edit Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>Invite Friends</Text>
      </TouchableHighlight>
      <View style={styles.rowContainer}>
        <Text style={styles.settingText}>{settings[0].title}</Text>
        <Switch onValueChange={() => update(0)} value={settings[0].switch} />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.settingText}>{settings[1].title}</Text>
        <Switch onValueChange={() => update(1)} value={settings[1].switch} />
      </View>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>Give Feedback</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>Help and Support</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>Connect Device</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>About Us</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.settingContainer}
        underlayColor="rgba(73,182,77,1,0.9)">
        <Text style={styles.settingText}>Log Out</Text>
      </TouchableHighlight>
    </ScrollView>
  )
}

export default SettingsScreen
