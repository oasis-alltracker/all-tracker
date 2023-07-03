import { StyleSheet, Dimensions } from 'react-native';
import { homeStyle, performance } from '../../AppStyles'
// screen sizing
const { width, height } = Dimensions.get('window')

const SCREEN_WIDTH = width < height ? width : height

const glassNumColums = 4
// item size

const GLASS_ITEM_OFFSET = 25
const GLASS_ITEM_MARGIN = GLASS_ITEM_OFFSET * 2

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const homeStyles = homeStyle(theme, appearance)
  const performanceStyles = performance(theme, appearance)

  return StyleSheet.create({
    container: homeStyles.container,
    titleContainer: homeStyles.titleContainer,
    title: homeStyles.title,
    waterText: homeStyles.purpleText,
    mainText: homeStyles.mainText,
    secText: homeStyles.secText,
    waterContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: GLASS_ITEM_OFFSET,
      marginTop: 10,
      width:
        (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
      height:
        (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums -
        GLASS_ITEM_MARGIN +
        10,
    },
    glass: {
      width:
        (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
      height:
        (SCREEN_WIDTH - GLASS_ITEM_OFFSET) / glassNumColums - GLASS_ITEM_MARGIN,
    },
    photoContainer: {
      margin: 20,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 20,
      marginLeft: GLASS_ITEM_OFFSET,
      marginRight: GLASS_ITEM_OFFSET,
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
    plus: {
      alignSelf: 'center',
      position: 'absolute',
      top:
        ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums -
          GLASS_ITEM_OFFSET) /
          2 -
        20,
      width:
        ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums -
          GLASS_ITEM_OFFSET) /
        2,
      height:
        ((SCREEN_WIDTH - GLASS_ITEM_MARGIN) / glassNumColums -
          GLASS_ITEM_OFFSET) /
        2,
    },
    greenContainer: {
      width: '100%',
      alignSelf: 'center',
      padding: 20,
      backgroundColor: '#80dc92',
    },
    redContainer: {
      width: '100%',
      alignSelf: 'center',
      padding: 20,
      backgroundColor: '#f4dcdc',
    },
    redText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#f77777',
    },
    greenText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#29963e',
    },
    detailsContainer: performanceStyles.detailsContainer,
    performanceContainer: performanceStyles.performanceContainer,
    performanceContainerBorderless:
      performanceStyles.performanceContainerBorderless,
    performanceRowContainer: performanceStyles.performanceRowContainer,
    performanceIcon: performanceStyles.performanceIcon,
    performanceTextContainer: performanceStyles.performanceTextContainer,
  })
}

export default dynamicStyles
