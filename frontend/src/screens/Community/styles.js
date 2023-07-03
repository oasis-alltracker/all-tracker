import { StyleSheet } from 'react-native'
import { post } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const postStyles = post(theme, appearance)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      fontFamily: 'Rubik',
    },
    title: {
      lineHeight: 30,
      fontSize: 30,
      color: colorSet.primaryText,
      fontWeight: 'bold',
    },
    titleContainer: {
      marginTop: 10,
      marginLeft: 15,
      marginRight: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    inscription: {
      height: 20,
      width: 20,
      marginRight: 10,
      tintColor: colorSet.foregroundContrast,
    },
    cardImg: {
      width: 60,
      height: 60,
      borderRadius: 60,
      margin: 10,
      marginLeft: 0,
      marginRight: 20,
    },
    carouselContainer: {
      margin: 20,
    },
    postContainer: postStyles.postContainer,
    rowContainer: postStyles.rowContainer,
    authorImg: postStyles.authorImg,
    authorName: postStyles.authorName,
    date: postStyles.date,
    postImg: postStyles.postImg,
    postTitle: postStyles.postTitle,
    icon: postStyles.icon,
    iconText: postStyles.iconText,
  })
}

export default dynamicStyles
