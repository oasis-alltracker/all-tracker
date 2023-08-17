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
  const dispatch = useDispatch()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [loading, setLoading] = useState(false);

  const update = id => dispatch({ type: 'UPDATE_SETTINGS', id })
  const settings = useSelector(state => state.setting.settings)
  
  const Screen = () => {
    if (!loading) {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Temp</Text>
          <TouchableOpacity
            style={styles.settingContainer}>
            <Text style={styles.settingText}>N/A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingContainer}>
            <Text style={styles.settingText}>N/A</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <Text style={styles.settingText}>N/a</Text>
            <Switch onValueChange={() => update(0)} value={settings[0].switch} />
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.settingText}>N/a</Text>
            <Switch onValueChange={() => update(1)} value={settings[1].switch} />
          </View>
          <TouchableOpacity
            style={styles.settingContainer}>
            <Text style={styles.settingText}>N/A</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingContainer}>
            <Text style={styles.settingText}>N/A</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => logout(navigation)}>
            <Text style={styles.settingText}>Log Out</Text>
            
          </TouchableOpacity>
        </ScrollView>
       )
      }
      else{
        return(
          <CircularProgress />
        )
      }
    }
  
    return (
        <Screen/>
    )
  }

export default TempScreen