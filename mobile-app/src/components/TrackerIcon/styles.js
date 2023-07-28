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
    },
    trackerIcon: {
      flex: 1,
      borderRadius: 100,
      borderWidth: 1,
      backgroundColor: colorSet.primaryBackground,
      width: 20,
      margin: 20,
      alignItems: 'center',
      alignSelf: 'center'
    },
    iconText: {
      fontSize: 10,
    },
    iconImage: {
      width:  50,
      resizeMode:'contain',
    }
});
}

export default dynamicStyles