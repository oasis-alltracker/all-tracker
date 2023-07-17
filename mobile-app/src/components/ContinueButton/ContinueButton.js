import React from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../ScribbledText'

export default function ContinueButton({ onPress }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <View>
      <TouchableHighlight
        onPress={onPress}
        underlayColor="rgba(73,182,77,1,0.9)"
        style={styles.btnContainer}>
        <ScribbledText style={styles.btnText}>Continue</ScribbledText>
      </TouchableHighlight>
    </View>
  )
}
