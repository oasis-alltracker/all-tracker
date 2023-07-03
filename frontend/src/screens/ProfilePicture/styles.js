import { StyleSheet, Dimensions } from 'react-native'
import { registration } from '../../AppStyles'

// screen sizing
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    carouselContainer: {
      marginTop: 40,
      marginBottom: 20,
    },
    cardImg: {
      width: '100%',
      height: '100%',
      borderRadius: 60,
    },
    cardContainer: {
      width: 80,
      height: 80,
      borderRadius: 60,
      borderColor: '#ffff',
      backgroundColor: '#ffff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      marginLeft: 30,
      marginRight: 30,
      alignSelf: 'center',
    },
    selectedCardContainer: {
      width: 80,
      height: 80,
      borderRadius: 60,
      borderColor: colorSet.primaryForeground,
      backgroundColor: colorSet.primaryForeground,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      marginLeft: 30,
      marginRight: 30,
      alignSelf: 'center',
    },
    textContainer: {
      margin: 10,
      width: SCREEN_WIDTH - 100,
      alignSelf: 'center',
    },
    mainText: {
      fontSize: 24,
      margin: 5,
      textAlign: 'center',
      fontWeight: 'bold',
      color: colorSet.primaryText,
    },
    secText: {
      margin: 5,
      fontSize: 17,
      textAlign: 'center',
      color: colorSet.secondaryText,
    },
    customText: {
      margin: 10,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colorSet.primaryForeground,
    },
  })
}

export default dynamicStyles
