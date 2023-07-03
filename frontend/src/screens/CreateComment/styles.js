import { StyleSheet, Dimensions } from 'react-native'

// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = width > height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      fontFamily: 'Rubik',
      padding: 20,
      paddingBottom: 0,
      marginTop: 50,
      borderRadius: 10,
    },
    middleContainer: {
      height: SCREEN_HEIGHT - 200,
    },
    title: {
      color: colorSet.primaryText,
      fontWeight: 'bold',
      fontSize: 24,
      margin: 5,
    },
    input: {
      color: colorSet.primaryText,
    },
    rowContainer: {
      flexDirection: 'row',
      marginTop: 20,
    },
    inputContainer: {
      alignSelf: 'center',
      flex: 1,
    },
    authorImg: {
      width: 50,
      height: 50,
      borderRadius: 50,
      margin: 10,
    },
    row: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    confirmContainer: {
      borderTopWidth: 0.8,
      borderColor: colorSet.secondaryText,
      alignSelf: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      padding: 10,
    },
    icon: {
      width: 25,
      height: 25,
      margin: 10,
    },
    btnContainer: {
      margin: 10,
      width: 90,
      height: 35,
      justifyContent: 'center',
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryForeground,
      borderRadius: 30,
    },
    btnText: {
      color: colorSet.secondaryBackground,
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    bar: {
      height: 4,
      width: 150,
      alignSelf: 'center',
      marginBottom: 30,
      marginTop: 10,
      backgroundColor: '#cbd7e1',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  })
}

export default dynamicStyles
