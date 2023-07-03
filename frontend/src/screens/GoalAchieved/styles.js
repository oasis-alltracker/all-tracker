import { StyleSheet, Dimensions } from 'react-native'
import { homeStyle } from '../../AppStyles'
// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const homeStyles = homeStyle(theme, appearance)

  return StyleSheet.create({
    container: {
      marginTop: 40,
      borderRadius: 10,
      overflow: 'hidden',
      flex: 1,
      fontFamily: 'Rubik',
    },
    firstHalf: {
      flex: 1,
      backgroundColor: colorSet.primaryForeground,
    },
    secondHalf: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
    },
    headerContainer: {
      justifyContent: 'flex-start',
      marginTop: 40,
      height: 60,
    },
    headerText: {
      color: colorSet.primaryText,
      fontSize: 24,
      textAlign: 'center',
      width: '100%',
      fontWeight: 'bold',
    },
    footerContainer: {
      justifyContent: 'flex-end',
      height: 40,
      flex: 1,
    },
    btnContainer: {
      marginBottom: 10,
      marginTop: 10,
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
    notNowText: {
      color: colorSet.primaryForeground,
      fontSize: 17,
      textAlign: 'center',
      marginBottom: 30,
      marginTop: 0,
      fontWeight: 'bold',
    },
    shareContainer: {
      backgroundColor: colorSet.secondaryBackground,
      borderRadius: 10,
      borderColor: colorSet.secondaryBackground,
      padding: 10,
      position: 'absolute',
      top: 140,
      bottom: 140,
      left: 30,
      right: 30,
      zIndex: 1,
    },
    shareHeaderContainer: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: colorSet.primaryBackground,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    userImg: {
      width: 40,
      height: 40,
      borderRadius: 40,
      marginRight: 10,
    },
    userName: {
      color: colorSet.primaryText,
      fontSize: 16,
      lineHeight: 40,
    },
    logo: {
      width: 40,
      height: 40,
    },
    circleContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30,
      width: SCREEN_WIDTH - 100,
    },
    circleText: {
      fontSize: 18,
      textAlign: 'center',
      margin: 30,
      marginBottom: 5,
      fontWeight: 'bold',
      color: colorSet.primaryText,
    },
    circleGoalText: {
      fontWeight: '500',
      textAlign: 'center',
      color: colorSet.primaryText,
    },
    circleImg: {
      width: 30,
      height: 30,
      alignSelf: 'center',
      tintColor: colorSet.foregroundContrast,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      alignSelf: 'center',
      flex: 1,
      width: '100%',
    },
    line: {
      width: 1,
      height: 40,
      backgroundColor: 'silver',
      marginLeft: 20,
      marginRight: 20,
    },
    secText: {
      ...homeStyles.secText,
      width: width / 2 - 80,
      textAlign: 'center',
    },
    mainText: {
      ...homeStyles.mainText,
      width: width / 2 - 80,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    deleteIcon: { position: 'absolute', right: 10, top: -15, zIndex: 10 },
  })
}

export default dynamicStyles
