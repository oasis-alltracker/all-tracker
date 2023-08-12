import { StyleSheet } from 'react-native'
import { setup } from '../styles'

const dynamicStyles = (theme, appearance) => {
  const setupStyles = setup(theme, appearance)
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: setupStyles.container,
    trackerIcon: setupStyles.trackerIcon,
      iconText: setupStyles.iconText,
      iconImage: setupStyles.iconImage,
      header: setupStyles.header,
      headerTextView: setupStyles.headerTextView,
      headerText: setupStyles.headerText,
      content: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: colorSet.primaryBorder,
        borderRadius: 60,
        width: '95%',
      },
      navigation: setupStyles.navigation,
      navigationNext: setupStyles.navigationNext,
      navigationBack: setupStyles.navigationBack,
      navigationText: setupStyles.navigationText,
      createButton: {
        flex: 1,
        borderTopWidth: 2,
        backgroundColor: colorSet.primaryForeground,
        borderColor: colorSet.primaryBorder,
        borderBottomRightRadius: 55,
        borderBottomLeftRadius: 55,
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        opacity: 0.5,
      },
      createText: {
        flex: 1,
        textAlign:'center',
        color: colorSet.primaryText,
        fontSize: 20,
        justifyContent: 'center',
        fontWeight: 'bold',
      },
      placeHolderView: {
        alignItems: 'center',
        flex: 10,
        justifyContent: 'center',
      },
      placeHolderText: {
        color: 'gray',
        fontSize: 15,
      }
  })
}

export default dynamicStyles
