import { StyleSheet } from 'react-native'
import { homeStyle } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const homeStyles = homeStyle(theme, appearance)

  return StyleSheet.create({
    container: homeStyles.container,
    titleContainer: homeStyles.titleContainer,
    title: homeStyles.title,
    caloriesText: homeStyles.purpleText,
    foodName: { ...homeStyles.mainText, marginBottom: 5 },
    foodQuantity: homeStyles.secText,
    foodCalories: homeStyles.mainText,
    mealContainer: {
      backgroundColor: colorSet.secondaryBackground,
      width: '100%',
      alignSelf: 'center',
      padding: 20,
      marginTop: 20,
      borderRadius: 10,
    },
    mealName: {
      fontSize: 25,
      color: colorSet.primaryText,
      fontWeight: 'bold',
    },
    foodContainer: {
      width: '100%',
      borderTopWidth: 0.5,
      borderColor: 'silver',
    },
    foodContainerBoarderless: {
      width: '100%',
    },
    rowContainer: {
      width: '95%',
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    orangeBox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      backgroundColor: '#ffa56c',
    },
    purpleBox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      backgroundColor: '#7265e3',
    },
    greenBox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      backgroundColor: '#3fc7bc',
    },
    macroNutrientName: {
      fontSize: 16,
      lineHeight: 18,
      color: colorSet.primaryText,
      marginLeft: 10,
      width: 60,
    },
    macroNutrientGrams: {
      textAlign: 'right',
      fontSize: 16,
      lineHeight: 18,
      color: colorSet.primaryText,
    },
    macroNutrientProcent: {
      fontSize: 16,
      lineHeight: 18,
      color: colorSet.primaryText,
      fontWeight: 'bold',
    },
    macroRowContainer: {
      alignSelf: 'center',
      width: '95%',
      padding: 20,
      borderBottomWidth: 0.5,
      borderColor: 'silver',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    macroRowContainerBorderless: {
      alignSelf: 'center',
      width: '95%',
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    deleteIcon: {
      width: 25,
      height: 25,
    },
    deleteIconContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    deleteContainer: {
      backgroundColor: 'white',
      alignSelf: 'center',
      padding: 30,
      borderRadius: 10,
    },
    deleteTxt: {
      textAlign: 'center',
      fontFamily: 'Rubik',
      color: colorSet.primaryText,
      fontSize: 18,
      margin: 10,
    },
    deleteSecTxt: {
      fontFamily: 'Rubik',
      color: colorSet.primaryText,
      fontSize: 16,
      marginLeft: 5,
      marginRight: 5,
    },
  })
}

export default dynamicStyles
