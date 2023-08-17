import {StyleSheet} from 'react-native';
import { setup } from '../styles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const setupStyles = setup(theme, appearance)

  return StyleSheet.create({
    container: setupStyles.container,
    setupHeader: {
      flex: 1,
    },
    setupContent: {
      flex: 3,
      width: '100%',
      alignSelf: 'center',
    },
    setupRow: {
      flex: 1,
      flexDirection: 'row',
    },
    contentHeader: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    trackerIcon: {
      flex: 1,
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: colorSet.primaryBackground,
      height: 120,
      marginHorizontal: 37,
      marginBottom: 20,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    iconText: {
      fontSize: 20,
      alignSelf: 'center',
    },
    iconImage: {
      height:  55,
      resizeMode:'contain',
      alignSelf: 'center',
    },
    continueButton: {
      marginTop: 20,
      marginBottom: 10, 
    }
});
}

export default dynamicStyles