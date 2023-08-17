import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

export default function MenuButton({ source, title, onPress }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnClickContain}
      >
      <View style={styles.btnContainer}>
        <Image source={source} style={styles.btnIcon} />
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

MenuButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
}
