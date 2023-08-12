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
      headerText: {
        fontSize: 30,
        fontWeight: 'bold'
      },
      content: setupStyles.content,
      navigation: setupStyles.navigation,
      navigationNext: setupStyles.navigationNext,
      navigationBack: setupStyles.navigationBack,
      navigationText: setupStyles.navigationText,
      selectedButton: setupStyles.selectedButton,
      fitnessSelection: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: colorSet.primaryBorder,
        borderRadius: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '87%',
        margin: 5,
        paddingVertical: 25,
      },
      selectionText: {
        color: colorSet.primaryText,
        fontSize: 21,
        justifyContent: 'center',
      }
    })
}

export default dynamicStyles
