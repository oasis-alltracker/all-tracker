import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import dynamicStyles from './styles'
import { useTheme } from 'dopenative'

export default function LogoHeader({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconContainer}>
        <Image
          style={styles.backIcon}
          source={require('../../assets/icons/back-arrow.png')}
        />
      </TouchableOpacity>

      <Image
        style={styles.logo}
        source={require('../../assets/icons/logo-pink.png')}
      />
    </View>
  )
}
