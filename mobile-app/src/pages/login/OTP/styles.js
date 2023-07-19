import { StyleSheet } from 'react-native'
import { registration } from '../../../AppStyles'

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
    inputContainer: {
        marginBottom: 40,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    title:{
        alignSelf: 'center',
        fontSize: 20,
        color: colorSet.primaryText,
        fontWeight: 'bold',
        marginBottom: 20,
      },
  })
}

export default dynamicStyles
