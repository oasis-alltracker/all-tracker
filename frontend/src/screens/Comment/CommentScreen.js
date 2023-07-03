import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import dynamicStyles from './styles'
import CreateCommentScreen from '../CreateComment/CreateCommentScreen'
import { useTheme } from 'dopenative'

function CommentScreen(props) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const posts = useSelector(state => state.community.posts)

  const userPhoto = useSelector(state => state.registration.userPhoto)
  const { route } = props
  const { itemId } = route.params
  const item = posts[itemId]

  const [visibleModal, setVisibleModal] = useState(null)

  const toggleModal = () => {
    setVisibleModal(null)
  }

  const renderComment = ({ item, index }) => (
    <View
      style={
        index == 0 ? styles.commentContainerBorderless : styles.commentContainer
      }>
      <View style={[styles.rowContainer, { marginBottom: 5 }]}>
        <Image style={styles.authorImg} source={{ uri: item.authorPhoto }} />
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.authorName}>{item.authorName}</Text>
          <Text style={styles.date}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.commentsContainer}>
        <View style={{ marginBottom: 30 }}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={item.comments}
            renderItem={renderComment}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => (
              <View style={styles.postContainer}>
                <View>
                  <View style={styles.rowContainer}>
                    <Image
                      style={styles.authorImg}
                      source={{ uri: item.authorImg }}
                    />
                    <View style={{ alignSelf: 'center' }}>
                      <Text style={styles.authorName}>{item.author}</Text>
                      <Text style={styles.date}>{item.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.postTitle}>{item.title}</Text>
                  <Image
                    style={styles.postImg}
                    source={{ uri: item.photoUrl }}
                  />
                  <View style={styles.likesContainer}>
                    <TouchableHighlight
                      underlayColor="rgba(73,182,77,1,0.9)"
                      onPress={() => route.params.onPressLike(item.id)}>
                      <Image
                        style={styles.icon}
                        source={
                          item.liked
                            ? require('../../assets/icons/fillLike.png')
                            : require('../../assets/icons/like.png')
                        }
                      />
                    </TouchableHighlight>
                    <Text style={styles.iconText}>{item.likes}</Text>
                    <Image
                      style={styles.icon}
                      source={require('../../assets/icons/comments.png')}
                    />
                    <Text style={styles.iconText}>{item.comments.length}</Text>
                  </View>
                </View>
                <Text style={styles.commentTitle}>Comments</Text>
              </View>
            )}
          />
        </View>
      </View>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,1,0.9)"
        style={styles.writeCommentContainer}
        onPress={() => setVisibleModal('swipeable')}>
        <Text style={styles.writeCommentText}>Write comment...</Text>
      </TouchableHighlight>
      <Modal
        isVisible={visibleModal === 'swipeable'}
        onSwipeComplete={() => setVisibleModal(null)}
        swipeDirection={['down']}>
        <CreateCommentScreen
          userPhoto={userPhoto}
          onPressPostComment={route.params.onPressPostComment}
          postId={item.id}
          toggleModal={toggleModal}
        />
      </Modal>
    </View>
  )
}

export default CommentScreen
