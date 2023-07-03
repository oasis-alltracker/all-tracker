import { StyleSheet, Dimensions } from 'react-native'
import { registration } from '../../AppStyles'

// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    textContainer: {
      marginTop: 40,
      marginBottom: 20,
      width: SCREEN_WIDTH - 100,
      alignSelf: 'center',
    },
    mainText: {
      fontSize: 24,
      margin: 5,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colorSet.primaryText,
    },
    secText: {
      margin: 5,
      fontSize: 17,
      textAlign: 'center',
      color: colorSet.secondaryText,
    },
    helpContainer: {
      alignSelf: 'center',
      width: SCREEN_WIDTH - 50,
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      borderRadius: 10,
      backgroundColor: colorSet.secondaryBackground,
    },
    helpText: {
      fontSize: 16,
      color: colorSet.primaryText,
    },
    icon: {
      borderRadius: 25,
      width: 25,
      height: 25,
      marginRight: 10,
    },
    rowContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  })
}

export default dynamicStyles
