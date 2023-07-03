import { StyleSheet } from 'react-native'
import { registration } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const registrationStyles = registration(theme, appearance)

  return StyleSheet.create({
    container: registrationStyles.container,
    headerContainer: {
      width: '100%',
      // marginTop: 10,
      backgroundColor: colorSet.primaryBackground,
      textAlign: 'left',
      padding: 20,
    },
    photoContainer: {
      width: 60,
      height: 60,
      borderRadius: 50,
      margin: 20,
      marginTop: 40,
      alignSelf: 'center',
    },
    greenDot: {
      height: 12,
      width: 12,
      borderRadius: 10,
      position: 'absolute',
      left: 4,
      bottom: 4,
      borderStyle: 'solid',
      borderColor: '#f4f6fa',
      backgroundColor: '#3fc7bc',
      zIndex: 1,
    },
    userPhoto: {
      width: 60,
      height: 60,
      borderRadius: 50,
    },
    boldText: {
      margin: 10,
      fontSize: 30,
      color: colorSet.primaryText,
      fontWeight: 'bold',
      lineHeight: 30,
    },
    normalText: {
      margin: 10,
      color: colorSet.primaryText,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    detailText: {
      margin: 10,
      color: colorSet.primaryForeground,
      fontSize: 16,
      fontWeight: '800',
      lineHeight: 18,
      letterSpacing: 0.2,
    },
    infoContainer: {
      backgroundColor: colorSet.secondaryBackground,
      padding: 20,
      borderBottomWidth: 0.5,
      borderColor: 'silver',
    },
    rowContainer: {
      flexDirection: 'row',
    },
    rowContainer2: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    btnContainer: {
      backgroundColor: '#e1ddf5',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      padding: 5,
      width: 80,
      height: 30,
    },
    btnText: {
      color: colorSet.primaryForeground,
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize: 12,
      fontWeight: 'bold',
    },
    warningBtnContainer: {
      backgroundColor: '#ffefe5',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      padding: 5,
      width: 80,
      height: 30,
    },
    warningBtnText: {
      color: '#fe9c5e',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontWeight: 'bold',
      fontSize: 12,
    },
    questionIcon: {
      alignSelf: 'center',
      width: 30,
      height: 30,
    },
    textContainer: {
      width: '50%',
      marginTop: 0,
      margin: 20,
    },
    mainText: {
      fontSize: 19,
      fontWeight: '800',
      color: colorSet.primaryText,
    },
    secText: {
      fontSize: 14,
      color: colorSet.secondaryText,
    },
    bar: {
      marginLeft: 20,
      height: 4,
      width: '92%',
      borderRadius: 40,
      alignContent: 'stretch',
      flexDirection: 'row',
    },
    columnContainer: {
      marginTop: 0,
      margin: 10,
      flex: 1,
      alignContent: 'stretch',
    },
    bar1: {
      width: '33.33%',
      backgroundColor: '#fe9c5e',
      height: '100%',
      zIndex: 1,
    },
    bar2: {
      width: '33.33%',
      backgroundColor: '#f77777',
      height: '100%',
      zIndex: 1,
    },
    bar3: {
      width: '33.33%',
      backgroundColor: '#7265e3',
      height: '100%',
      zIndex: 1,
    },
    headerMenu: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  })
}

export default dynamicStyles
