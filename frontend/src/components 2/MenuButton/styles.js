import { StyleSheet } from 'react-native';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    btnClickContain: {
      flexDirection: 'row',
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    btnIcon: {
      tintColor: colorSet.foregroundContrast,
      height: 25,
      width: 25,
    },
    btnText: {
      color: colorSet.primaryText,
      fontSize: 16,
      marginLeft: 10,
      marginTop: 2,
    },
  })
}

export default dynamicStyles
