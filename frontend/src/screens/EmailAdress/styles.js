import { StyleSheet, Dimensions, Platform } from 'react-native'
import { logoContainer, registration } from '../../AppStyles'
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
      marginBottom: 70,
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
  })
}

export default dynamicStyles
