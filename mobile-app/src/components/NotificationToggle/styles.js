import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
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
      paddingBottom: 30,
      paddingTop: 20,
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
  })
}

export default dynamicStyles
