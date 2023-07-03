import { StyleSheet } from 'react-native';

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
      justifyContent: 'center',
    },
    headerButtonImage: {
      tintColor: colorSet.foregroundContrast,
      justifyContent: 'center',
      width: 25,
      height: 25,
      margin: 6,
    },
  })
}

export default dynamicStyles
