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
      content: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
      },
      navigation: setupStyles.navigation,
      navigationNext: setupStyles.navigationNext,
      navigationBack: setupStyles.navigationBack,
      navigationText: setupStyles.navigationText,
      todoSelection: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: colorSet.primaryBorder,
        borderRadius: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '87%',
        margin: 10,
        padding: 5,
        paddingVertical: 20,
      },
      selectionText: {
        color: colorSet.primaryText,
        fontSize: 25,
        justifyContent: 'center',
      },
      reminderContainer: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: colorSet.primaryBorder,
        borderRadius: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '87%',
        margin: 10,
        padding: 5,
        paddingBottom: 30,
        paddingTop: 20,
      },
      reminderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      },
      reminderTitle: {
        fontSize: 20,
        fontWeight: 'bold'
      },
    })
}

export default dynamicStyles
