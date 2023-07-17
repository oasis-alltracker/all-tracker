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
    mainContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 60,
      marginBottom: 20,
    },
    signContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 70,
      marginBottom: 20,
    },
    signupHeader: {
      flex: 1,
    },
    signupContent: {
      flex: 3,
      width: '100%',
      alignSelf: 'center',
    },
    inputContainer: {
      margin: 10,
      marginBottom: 40,
      padding: 5,
      width: SCREEN_WIDTH - 50,
      borderRadius: 10,
      borderColor: colorSet.primaryBorder,
      borderWidth: 2,
      backgroundColor: 'white',
      alignSelf: 'center',
    },
    title:{
      alignSelf: 'center',
      fontSize: 23,
      color: '#25436B',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    icon: {
      marginLeft: 10,
      marginRight: 10,
      alignSelf: 'center',
      width: 20,
      height: 20,
    },
    input: {
      color: 'black',
      fontSize: 20,
      marginLeft: 10,
      height: 40,
      textAlign: 'center',
      fontFamily: 'Segoe',
    },
    rowContainer: {
      alignItems: 'center',
    },
    iconContainer: {
      backgroundColor: 'white',
      borderRadius: 100,
      borderColor: colorSet.primaryBorder,
      borderWidth: 2,
      padding: 20
    },
    accountIcon: {
      alignSelf: 'center',
      height: 50,
      width: 50
    },
    txt: {
      marginTop: 20,
      marginBottom: 20,
      fontSize: 30,
      color: colorSet.primaryText,
      textAlign: 'center',
    },
  })
}

export default dynamicStyles
