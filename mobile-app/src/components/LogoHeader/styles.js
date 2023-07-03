import { StyleSheet } from 'react-native'
import { logoContainer } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const logoContainerStyles = logoContainer(theme, appearance)
  return StyleSheet.create({
    headerContainer: logoContainerStyles.headerContainer,
    logo: logoContainerStyles.logo,
    backIcon: logoContainerStyles.backIcon,
    iconContainer: logoContainerStyles.iconContainer,
  })
}

export default dynamicStyles
