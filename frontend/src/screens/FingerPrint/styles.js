import { StyleSheet } from 'react-native'
import { registration } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    notNowText: {
      color: colorSet.primaryForeground,
      fontSize: 17,
      textAlign: 'center',
      marginBottom: 30,
      marginTop: 0,
      fontWeight: 'bold',
    },
    iconContainer: {
      marginTop: 60,
      margin: 20,
      padding: 10,
      alignItems: 'center',
    },
    icon: {
      height: 90,
      width: 90,
      margin: 20,
    },
    boldText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorSet.primaryText,
      textAlign: 'center',
      margin: 5,
    },
    normalText: {
      fontSize: 16,
      color: colorSet.secondaryText,
      textAlign: 'center',
      margin: 5,
    },
  })
}

export default dynamicStyles
