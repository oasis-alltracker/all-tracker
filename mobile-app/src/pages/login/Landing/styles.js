import { StyleSheet, Dimensions } from 'react-native'
import { logoContainer, registration } from '../../../AppStyles'

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
      marginTop: 50,
      alignSelf: 'center',
      height: height*0.40,
      resizeMode:'contain',
    },
    mainImage: {
      width: '90%',
      height: height*0.37,
      alignSelf: 'center',
    },
    logContainer: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignSelf: 'center',
    },
    imageContainer: {
      backgroundColor: 'blue',
      flex: 1,
      justifyContent: 'center',
      width: viewportWidth,
      height: 280,
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
      marginTop: 30,
      borderRadius: 60,
      width: viewportWidth - 60,
      height: 50,
      borderWidth: 2,
      borderColor: colorSet.primaryBorder,
      alignItems: 'center',
      backgroundColor: colorSet.primaryForeground,
    },
    btnText: {
      color: colorSet.tertiaryText,
      fontSize: 30,
    },
    signText: {
      margin: 10,
      marginLeft: 0,
      color: colorSet.tertiaryText,
      fontWeight: 'bold',
      fontSize: 14,
    },
    text: {
      margin: 10,
      fontSize: 14,
      color: colorSet.secondaryText,
    },
    bottomRowContainer: {
      margin: 0,
      flexDirection: 'row',
      width: viewportWidth - 100,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    headerContainer: logoContainerStyles.landingHeaderContainer,
  })
}

export default dynamicStyles
