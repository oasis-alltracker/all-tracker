import React from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

export default function ContinueButton({ onPress }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <View
      style={{
        justifyContent: 'flex-end',
        marginBottom: 30,
        marginTop: 50,
        flex: 1,
      }}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor="rgba(73,182,77,1,0.9)"
        style={styles.btnContainer}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableHighlight>
    </View>
  )
}
