import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    btnContainer: {
      width: SCREEN_WIDTH - 100,
      height: 50,
      borderWidth: 1,
      alignItems: 'center',
      padding: 12,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryForeground,
      borderRadius: 60,
      alignSelf: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  })
}

export default dynamicStyles
