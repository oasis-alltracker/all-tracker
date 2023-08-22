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
      headerTextSmall: {
        fontSize: 25,
        fontWeight: 'bold'
      },
      content: {
        flex: 6,
      },
      navigation: setupStyles.navigation,
      navigationNext: setupStyles.navigationNext,
      navigationBack: setupStyles.navigationBack,
      navigationText: setupStyles.navigationText,
      selectedButton: setupStyles.selectedButton,
      buttonSelection: {
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
      },
      pageView: {
        flex: 7,
      },
      input: {
        color: 'black',
        fontSize: 20,
        marginLeft: 10,
        height: 40,
        textAlign: 'center',
        fontFamily: 'Segoe',
      },
      inputContainer: {
        margin: 10,
        marginBottom: 20,
        padding: 5,
        width: '87%',
        borderRadius: 60,
        borderColor: colorSet.primaryBorder,
        borderWidth: 2,
        backgroundColor: 'white',
        alignSelf: 'center',
      },
      unitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
      },
      smallButtonSelection: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: colorSet.primaryBorder,
        borderRadius: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '20%',
        margin: 5,
      },
      buttonHeader: {
        flexDirection: 'row'
      },
      smallText: {
        fontSize: 10,
        width: '80%',
      },
      intensityButtonSelection: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: colorSet.primaryBorder,
        borderRadius: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '87%',
        margin: 5,
        paddingVertical: 15,
      }
    })
}

export default dynamicStyles
