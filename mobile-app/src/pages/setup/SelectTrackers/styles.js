import {StyleSheet} from 'react-native';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
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
      height: 130,
      marginHorizontal: 30,
      marginBottom: 20,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'
    },
    iconText: {
      fontSize: 25,
      alignSelf: 'center',
    },
    iconImage: {
      height:  60,
      resizeMode:'contain',
      alignSelf: 'center',
    },
    continueButton: {
      marginTop: 20,
    }
});
}

export default dynamicStyles