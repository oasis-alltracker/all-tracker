import React from 'react'
import { TouchableHighlight, Image, View } from 'react-native'
import dynamicStyles from './styles'
import { useTheme } from 'dopenative'

export default function LogoHeader({ onPress }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <View style={styles.headerContainer}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor="rgba(73,182,77,1,0.9)"
        style={styles.iconContainer}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/icons/backIcon.png')}
        />
      </TouchableHighlight>

      <Image
        style={styles.logo}
        source={require('../../assets/icons/logo.png')}
      />
    </View>
  )
}
