import { StyleSheet } from 'react-native'
import { registration } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    header: {
      marginTop: 20,
      marginLeft: 20,
    },
    title: {
      fontSize: 30,
      marginBottom: 5,
      color: colorSet.primaryText,
      fontWeight: 'bold',
    },
    secText: {
      fontSize: 16,
      color: colorSet.secondaryText,
    },
    notificationsContainer: {
      alignSelf: 'center',
      width: '100%',
      padding: 20,
      marginTop: 30,
      backgroundColor: colorSet.secondaryBackground,
    },
    notificationContainer: {
      alignSelf: 'center',
      borderBottomWidth: 1,
      borderColor: '#e1ddf5',
      width: '94%',
      marginTop: 10,
      marginBottom: 10,
    },
    rowContainer: {
      width: '80%',
      flexDirection: 'row',
      marginBottom: 10,
      marginTop: 10,
    },
    authorImg: {
      alignSelf: 'center',
      width: 40,
      height: 40,
      borderRadius: 40,
      marginRight: 15,
    },
    authorName: {
      color: colorSet.primaryText,
      fontWeight: 'bold',
      fontSize: 16,
    },
    notificationText: {
      fontWeight: '500',
    },
    notificationTime: {
      fontSize: 13,
      color: colorSet.secondaryText,
      marginBottom: 30,
      marginLeft: 55, // 40 from img width and 15 from margin
    },
    unreadMark: {
      backgroundColor: '#e1ddf5',
      width: 10,
      height: 10,
      borderRadius: 10,
      position: 'absolute',
      top: '50%',
      right: -10,
    },
    backArrow: {
      width: 25,
      height: 25,
      marginBottom: 30,
    },
  })
}

export default dynamicStyles
