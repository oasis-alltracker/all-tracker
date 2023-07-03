import { StyleSheet, Dimensions, Platform } from 'react-native'
import { registration } from '../../AppStyles'
// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    title: {
      marginTop: 70,
      marginBottom: 20,
      margin: 30,
      fontSize: 24,
      color: colorSet.primaryText,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    inputContainer: {
      margin: 20,
      padding: 5,
      width: SCREEN_WIDTH - 100,
      borderRadius: 10,
      backgroundColor: 'white',
      alignSelf: 'center',
    },
    input: {
      color: 'black',
      fontSize: 17,
      marginLeft: 10,
      height: Platform.OS === 'ios' ? 30 : 'auto',
    },
    conditionContainer: {
      margin: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      margin: 10,
      marginLeft: 20,
    },
    emptyBox: {
      margin: 5,
      marginTop: 3,
      backgroundColor: colorSet.grey6,
      width: 16,
      height: 16,
      borderRadius: 4,
    },
    fullBox: {
      margin: 5,
      marginTop: 3,
      backgroundColor: colorSet.primaryForeground,
      width: 16,
      height: 16,
      borderRadius: 4,
    },
    conditionText: {
      color: colorSet.secondaryText,
      fontSize: 14,
      margin: 5,
      marginTop: 2,
    },
  })
}

export default dynamicStyles
