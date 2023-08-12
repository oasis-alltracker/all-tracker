import React, {useState} from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../ScribbledText'
import ToggleSwitch from 'toggle-switch-react-native'

export default function NotificationToggle({ onPress, title }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [isLoading, setIsLoading] = useState(false)
  const [toggleState, setToggleState] = useState(false)

  const setLoading = async () => {
    setIsLoading(true)
    await triggerProp();
  }

  triggerProp = async () => {
    await timeout(0) // Having a timeout of 0 forces the component to rerender
    await onPress()
    setIsLoading(false)
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ScribbledText style={styles.title}>Notifications: </ScribbledText>
        <ToggleSwitch isOn={toggleState} onColor={'#25436B'} onToggle={(isOn) => {setToggleState(isOn)}}/>
      </View>
      <ScribbledText style={styles.description}>Review your sleep and write in your dream journal</ScribbledText>
    </View>
  )
}
