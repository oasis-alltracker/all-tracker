import { StyleSheet } from 'react-native'

const dynamicStyles = () => {

  return StyleSheet.create({
    resendOTPText: {
        color: "#25436B",
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        fontSize: 14,
      },
      errorContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'
      },
      errorText: {
        fontSize: 14,
        color: "#25436B",
      },
      waitingText: {
        fontSize: 12,
        color: "#25436B",
      },
      errorToast: {
        backgroundColor: "#FFD7D7",
        textColor: "#25436B",
      }
    
  })
}

export default dynamicStyles