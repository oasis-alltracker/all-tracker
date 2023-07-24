import { StyleSheet } from 'react-native'
import { registration } from '../../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    errorToast: registrationStyles.errorToast,
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
      errorContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'
      },
      resendOTPText: {
        color: colorSet.primaryText,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 14,
      },
      errorText: {
        fontSize: 14,
        color: colorSet.primaryText,
      },
      waitingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: colorSet.primaryText,
      }
      
  })
}

export default dynamicStyles
