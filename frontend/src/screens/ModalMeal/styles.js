import { StyleSheet, Dimensions } from 'react-native'

// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height
// orientation must fixed

const ICONNumColums = 4
// item size
const ICON_ITEM_OFFSET = 5
const ICON_ITEM_MARGIN = ICON_ITEM_OFFSET * 2

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      marginTop: 40,
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      fontFamily: 'Rubik',
      borderRadius: 10,
    },
    bar: {
      height: 4,
      width: 150,
      alignSelf: 'center',
      marginBottom: 20,
      marginTop: 20,
      backgroundColor: '#cbd7e1',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    mealIcon: {
      width: 60,
      height: 60,
      alignSelf: 'center',
      marginBottom: 20,
    },
    titleContainer: {
      padding: 20,
      marginTop: 20,
      marginBottom: 20,
      alignSelf: 'center',
      width: SCREEN_WIDTH - 100,
    },
    mainTxt: {
      textAlign: 'center',
      fontSize: 25,
      color: colorSet.primaryText,
      marginBottom: 5,
    },
    mealContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: ICON_ITEM_OFFSET,
      marginTop: 10,
      width:
        (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums -
        2 * ICON_ITEM_MARGIN,
      height:
        (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
    },
    mealTitle: {
      textAlign: 'center',
      marginTop: 5,
      width:
        (SCREEN_WIDTH - ICON_ITEM_OFFSET) / ICONNumColums - ICON_ITEM_MARGIN,
      fontSize: 16,
      color: colorSet.primaryText,
    },
    secTxt: {
      color: colorSet.secondaryText,
      fontSize: 16,
      textAlign: 'center',
    },
    foodRowContainer: {
      alignSelf: 'center',
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      borderBottomWidth: 0.5,
      borderColor: 'silver',
      marginTop: 10,
      width: '90%',
    },
    foodTitle: {
      fontSize: 16,
      color: colorSet.primaryText,
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: 30,
    },
    btnContainer: {
      width: SCREEN_WIDTH - 100,
      height: 50,
      marginTop: 40,
      marginBottom: 40,
      borderWidth: 1,
      alignItems: 'center',
      padding: 12,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryForeground,
      borderRadius: 60,
      alignSelf: 'center',
    },
    btnContainerDisabled: {
      width: SCREEN_WIDTH - 100,
      height: 50,
      marginTop: 40,
      marginBottom: 40,
      borderWidth: 1,
      alignItems: 'center',
      padding: 12,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryForeground,
      borderRadius: 60,
      alignSelf: 'center',
      opacity: 0.5,
    },
    btnTxt: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
  })
}

export default dynamicStyles
