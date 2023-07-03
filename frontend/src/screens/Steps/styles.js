import { StyleSheet, Dimensions } from 'react-native'
import { homeStyle, performance } from '../../AppStyles'

// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const homeStyles = homeStyle(theme, appearance)
  const performanceStyles = performance(theme, appearance)

  return StyleSheet.create({
    container: homeStyles.container,
    titleContainer: homeStyles.titleContainer,
    title: homeStyles.title,
    stepsText: homeStyles.purpleText,
    mainText: homeStyles.mainText,
    secText: homeStyles.secText,
    detailsContainer: performanceStyles.detailsContainer,
    performanceContainer: performanceStyles.performanceContainer,
    performanceContainerBorderless:
      performanceStyles.performanceContainerBorderless,
    performanceRowContainer: performanceStyles.performanceRowContainer,
    performanceIcon: performanceStyles.performanceIcon,
    performanceTextContainer: performanceStyles.performanceTextContainer,
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 20,
      marginLeft: 40,
      marginRight: 40,
    },
    columnContainer: {
      flexDirection: 'column',
      alignSelf: 'center',
    },
    line: {
      width: 1,
      height: 40,
      backgroundColor: 'silver',
      marginLeft: 20,
      marginRight: 20,
    },
    circleContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
      marginBottom: 20,
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
    chartContainer: {
      height: 400,
      borderColor: colorSet.foregroundContrast,
      borderWidth: 1,
    },
    statisticContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '100%',
      padding: 20,
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: 20,
      marginTop: 20,
    },
    statisticTxt: { ...homeStyles.mainText, margin: 10, color: '#000' },
  })
}

export default dynamicStyles
