import { StyleSheet, Dimensions } from 'react-native'
import { registration } from '../../../AppStyles'
// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    signupHeader: {
        flex: 1,
      },
    signupContent: {
    flex: 3,
    width: '100%',
    alignSelf: 'center',
    },
    input: {

    },
    title:{
        alignSelf: 'center',
        fontSize: 20,
        color: '#25436B',
        fontWeight: 'bold',
        marginBottom: 20,
      },
  })
}

export default dynamicStyles
