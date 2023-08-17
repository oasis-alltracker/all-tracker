import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    reminderContainer: {
      alignItems: 'center',
      borderWidth: 2,
      backgroundColor: 'white',
      borderColor: colorSet.primaryBorder,
      borderRadius: 40,
      alignSelf: 'center',
      justifyContent: 'center',
      width: '87%',
      margin: 10,
      padding: 5,
      paddingBottom: 10,
      paddingTop: 20,
    },
    reminderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    reminderTitle: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    timeContainer: {
      marginTop: 10,
      justifyContent: 'space-between',
      width: '100%',
      flexDirection: 'row'
    },
    timeDescription: {
      flex: 2,
      paddingLeft: 8,
    },
    timeValueButton: {
      flex: 1,
      alignSelf: 'flex-end',
    },
    timeValue: {
      flex: 1,
      alignSelf: 'flex-end',
      borderWidth: 2,
      borderRadius: 40,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryBorder,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    addIcon: {
      width: 30,
      height: 30,
    },
  })
}

export default dynamicStyles
