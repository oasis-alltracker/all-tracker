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
    carouselContainer: {
      // minHeight: 250, // comentat => containerul este centrat pe mijloc
      flex: 1,
    },
    carousel: {
      alignSelf: 'center',
    },

    image: {
      ...StyleSheet.absoluteFillObject,
      width: viewportWidth,
      height: 250,
    },
    imageContainer: {
      backgroundColor: 'blue',
      flex: 1,
      justifyContent: 'center',
      width: viewportWidth,
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
    },
    description: {
      fontSize: 16,
      color: colorSet.secondaryText,
      textAlign: 'center',
      height: 55,
    },
    infoContainer: {
      alignItems: 'center',
      margin: 20,
    },
    logContainer: {
      justifyContent: 'flex-end',
      marginBottom: 20,
      alignItems: 'center',
      alignSelf: 'center',
    },
    btnContainer: {
      marginTop: 30,
      borderRadius: 60,
      width: viewportWidth - 100,
      height: 50,
      borderWidth: 1,
      alignItems: 'center',
      padding: 12,
      backgroundColor: colorSet.primaryForeground,
      borderColor: colorSet.primaryForeground,
    },
    btnText: {
      color: 'white',
      fontSize: 17,
      fontWeight: 'bold',
    },
    signText: {
      margin: 10,
      marginLeft: 0,
      color: colorSet.primaryForeground,
      fontWeight: 'bold',
      fontSize: 17,
    },
    text: {
      margin: 10,
      fontSize: 17,
      color: colorSet.secondaryText,
    },
    bottomRowContainer: {
      margin: 5,
      flexDirection: 'row',
      width: viewportWidth - 100,
      justifyContent: 'center',
      alignItems: 'stretch',
    },
    headerContainer: logoContainerStyles.headerContainer,
    logo: logoContainerStyles.logo,
  })
}

export default dynamicStyles
