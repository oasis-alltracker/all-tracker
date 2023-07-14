import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    btnContainer: {
      width: SCREEN_WIDTH - 100,
      height: 50,
      alignItems: 'center',
      width: '87%',
      padding: 5,
      borderWidth: 2,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryBorder,
      borderRadius: 60,
      alignSelf: 'center',
      justifyContent: 'center',
    },
    btnText: {
      color: colorSet.primaryText,
      fontSize: 25,
      justifyContent: 'center',
    },
  })
}

export default dynamicStyles
