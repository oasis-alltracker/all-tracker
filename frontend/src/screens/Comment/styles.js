import { StyleSheet } from 'react-native'
import { post } from '../../AppStyles'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  const postStyles = post(theme, appearance)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.secondaryBackground,
      fontFamily: 'Rubik',
    },
    postContainer: { ...postStyles.postContainer },
    rowContainer: postStyles.rowContainer,
    authorImg: postStyles.authorImg,
    authorName: postStyles.authorName,
    date: postStyles.date,
    postImg: postStyles.postImg,
    postTitle: postStyles.postTitle,
    icon: postStyles.icon,
    iconText: postStyles.iconText,
    likesContainer: {
      padding: 10,
      paddingLeft: 0,
      paddingBottom: 0,
      flexDirection: 'row',
      marginTop: 10,
    },
    commentsContainer: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    commentTitle: {
      fontSize: 20,
      color: colorSet.primaryText,
      fontWeight: 'bold',
      paddingTop: 40,
    },
    commentContainer: {
      paddingTop: 10,
      backgroundColor: colorSet.secondaryBackground,
      borderColor: 'silver',
      borderTopWidth: 0.5,
      width: '100%',
    },
    commentContainerBorderless: {
      marginHorizontal: 30,
      backgroundColor: colorSet.secondaryBackground,
      width: '100%',
    },
    commentText: {
      color: colorSet.primaryText,
      fontSize: 16,
      marginBottom: 10,
      marginLeft: 50,
    },
    writeCommentContainer: {
      borderTopWidth: 0.5,
      borderColor: colorSet.secondaryText,
      position: 'absolute',
      bottom: 10,
      width: '100%',
      padding: 15,
      justifyContent: 'center',
    },
    writeCommentText: {
      fontSize: 14,
      color: colorSet.secondaryText,
    },
    backArrow: {
      width: 25,
      height: 25,
      margin: 20,
      marginBottom: 0,
    },
  })
}

export default dynamicStyles
