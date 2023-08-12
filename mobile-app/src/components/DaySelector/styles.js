import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
    },
    title: {
      fontSize: 30,
    },
    description: {
      fontSize: 10,
      width: '90%',
    },
    dayContainer: {
      marginHorizontal: 1,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    daySelected: {
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryBorder,
      borderRadius: 60,
      borderWidth: 2,
      paddingHorizontal: 6,
      paddingVertical: 0,
    },
    dayText: {
      fontSize: 10,
    }
  })
}

export default dynamicStyles
