import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      fontFamily: 'Rubik',
      padding: 20,
      paddingTop: 10,
    },
    title: {
      marginTop: 10,
      marginBottom: 20,
      fontSize: 30,
      color: colorSet.primaryText,
      fontWeight: 'bold',
    },
    settingContainer: {
      alignSelf: 'center',
      padding: 15,
      paddingLeft: 0,
      borderBottomWidth: 1,
      borderColor: 'silver',
      width: '100%',
    },
    settingText: {
      fontSize: 16,
      color: colorSet.primaryText,
    },
    rowContainer: {
      alignSelf: 'center',
      borderBottomWidth: 1,
      borderColor: 'silver',
      padding: 15,
      paddingLeft: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    backArrow: {
      width: 25,
      height: 25,
    },
  })
}

export default dynamicStyles
