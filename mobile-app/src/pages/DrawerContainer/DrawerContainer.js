import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import dynamicStyles from './styles'
import MenuButton from '../../components/MenuButton/MenuButton'
import { useTheme } from 'dopenative'

export default function DrawerContainer({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Home"
          source={require('../../assets/icons/home.png')}
          onPress={() => {
            navigation.navigate('Home')
            navigation.closeDrawer()
          }}
        />
        <MenuButton
          title="Settings"
          source={require('../../assets/icons/settings.png')}
          onPress={() => {
            navigation.navigate('Settings')
            navigation.closeDrawer()
          }}
        />
      </View>
    </View>
  )
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}
