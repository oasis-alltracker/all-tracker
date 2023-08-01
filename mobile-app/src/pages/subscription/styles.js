import { StyleSheet, Dimensions } from 'react-native'
import { logoContainer, registration } from '../../AppStyles'

const { width, height } = Dimensions.get('window')
const viewportWidth = width < height ? width : height

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)
  const logoContainerStyles = logoContainer(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,

    image: {
      ...StyleSheet.absoluteFillObject,
      width: viewportWidth,
      height: 250,
    },
    logo: {
      marginTop: 65,
      alignSelf: 'center',
      height: height*0.35,
      resizeMode:'contain',
    },
    mainImage: {
      width: '100%',
      height: height*0.45,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
    },
    logContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignSelf: 'center',
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
    btnContainer: {
      marginTop: 20,
      borderRadius: 60,
      width: viewportWidth - 60,
      height: 50,
      borderWidth: 2,
      borderColor: colorSet.primaryBorder,
      alignItems: 'center',
      backgroundColor: colorSet.primaryForeground,
    },
    btnText: {
      color: colorSet.primaryText,
      fontSize: 30,
    },
    regularTextContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    topRowContainer: {
      marginTop: 10,
      marginLeft: 50,
      flexDirection: 'row',
      width: viewportWidth - 100,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    salesText: {
      fontSize: 30,
      color: colorSet.primaryText,
    },
    purpleTextSales: {
      marginLeft: 10,
      color: colorSet.tertiaryText,
      fontWeight: 'bold',
      fontSize: 30,
    },
    bottomRowContainer: {
      marginLeft: 50,
      flexDirection: 'row',
      width: viewportWidth - 100,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    quoteText: {
      fontSize: 25,
      color: colorSet.primaryText,
    },
    purpleTextQuote: {
      marginLeft: 10,
      color: colorSet.tertiaryText,
      fontWeight: 'bold',
      fontSize: 25,
    },
    backHeader: {
      flex: 1,
    },
    backIcon: {
      height: 40,
      width: 40,
      opacity: 0.5,
    },
    iconContainer: {
      marginTop: 60,
      marginLeft: 20,
    },
    headerContainer: logoContainerStyles.landingHeaderContainer,
  })
}

export default dynamicStyles
