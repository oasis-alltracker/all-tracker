import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

export default function MenuImage({ onPress }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
      <Image
        style={styles.headerButtonImage}
        source={require('../../assets/icons/menu.png')}
      />
    </TouchableOpacity>
  )
}

MenuImage.propTypes = {
  onPress: PropTypes.func,
}
