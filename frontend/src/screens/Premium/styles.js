import { StyleSheet, Dimensions } from 'react-native'
// screen sizing
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.secondaryBackground,
      fontFamily: 'Rubik',
    },
    carouselContainer: {
      // minHeight: 250, // comentat => containerul este centrat pe mijloc
      flex: 1,
    },
    carousel: {
      alignSelf: 'center',
    },

    image: {
      ...StyleSheet.absoluteFillObject,
      width: SCREEN_WIDTH,
      height: 350,
    },
    imageContainer: {
      backgroundColor: 'blue',
      flex: 1,
      justifyContent: 'center',
      width: SCREEN_WIDTH,
      height: 250,
    },
    paginationContainer: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      paddingVertical: 8,
      marginTop: 200,
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 0,
    },
    title: {
      margin: 10,
      fontSize: 24,
      color: colorSet.primaryText,
      fontWeight: 'bold',
      textAlign: 'center',
      height: 60,
    },
    description: {
      fontSize: 16,
      color: colorSet.secondaryText,
      textAlign: 'center',
      height: 60,
    },
    titleContainer: {
      alignSelf: 'center',
      marginTop: 20,
      width: SCREEN_WIDTH - 100,
    },
    circle: {
      width: 22,
      height: 22,
      borderRadius: 24,
      marginRight: 10,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    btnContainer: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center',
      alignItems: 'center',
      padding: 10,
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colorSet.primaryBackground,
      borderColor: colorSet.primaryBackground,
      borderRadius: 10,
      width: SCREEN_WIDTH - 40,
    },
    price: {
      lineHeight: 24,
      color: colorSet.primaryText,
      fontSize: 20,
      fontWeight: 'bold',
    },
    month: {
      fontSize: 14,
      fontWeight: '500',
    },
    buttonsContainer: {
      marginBottom: 10,
    },
    secBtnContainer: {
      justifyContent: 'center',
      backgroundColor: '#e1ddf5',
      borderRadius: 15,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    secBtnTxt: {
      textAlign: 'center',
      color: colorSet.primaryForeground,
      fontSize: 15,
      fontWeight: 'bold',
    },
    purchaseBtnContainer: {
      width: SCREEN_WIDTH - 100,
      height: 50,
      borderWidth: 1,
      alignItems: 'center',
      padding: 12,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryForeground,
      borderRadius: 60,
      alignSelf: 'center',
      marginBottom: 20,
      marginTop: 0,
    },
    purchaseBtnTxt: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
    infoContainer: {
      marginTop: 20,
      marginBottom: 20,
      width: SCREEN_WIDTH - 100,
      alignSelf: 'center',
    },
    mainInfoTxt: {
      fontSize: 12,
      color: colorSet.primaryText,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    secInfoTxt: {
      fontSize: 11,
      color: colorSet.primaryText,
      textAlign: 'center',
    },
  })
}

export default dynamicStyles
