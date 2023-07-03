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
import CreatePostScreen from '../CreatePost/CreatePostScreen'
import { profilePictures } from '../../data/dataArrays'
import dynamicStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'dopenative'

function CommunityScreen({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const dispatch = useDispatch()

  const posts = useSelector(state => state.community.posts)
  const userName = useSelector(state => state.registration.defaultUserName)
  const userPhoto = useSelector(state => state.registration.userPhoto)

  const [visibleModal, setvisibleModal] = useState(null)
  const [defaultUserName] = useState(userName || 'Ben Anderssen')
  const [defaultUserPhoto] = useState(
    userPhoto ||
      'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357',
  )

  const addPost = post => dispatch({ type: 'ADD_POST', post })
  const addLike = id => dispatch({ type: 'ADD_LIKE', id })
  const addComment = (postId, comment) =>
    dispatch({ type: 'ADD_COMMENT', postId, comment })

  const toggleModal = () => {
    setvisibleModal(null)
  }

  const renderCard = (item, index) => (
    <Image key={index} style={styles.cardImg} source={{ uri: item.photo }} />
  )

  const onPressPostComment = (commentText, postId) => {
    var comment = {}
    posts.map(post => {
      if (post.id == postId) {
        let id = 0
        if (post.comments.length != 0) {
          id = post.comments[post.comments.length - 1].id + 1
        }
        comment = {
          text: commentText,
          authorName: defaultUserName,
          authorPhoto: defaultUserPhoto,
          time: '15 seconds',
          id: id,
        }
      }
    })
    addComment(postId, comment)
  }

  const onPressPostPost = postText => {
    let post = {
      title: postText,
      photoUrl:
        'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357',
      author: defaultUserName,
      authorImg: defaultUserPhoto,
      time: '15 seconds',
      id: posts[posts.length - 1].id + 1,
      likes: 0,
      liked: false,
      comments: [],
    }
    addPost(post)
  }

  const onPressLike = postId => {
    addLike(postId)
  }

  const renderPost = ({ item }) => {
    return (
      <TouchableHighlight
        style={styles.postContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() =>
          navigation.navigate('Comment', {
            userPhoto: defaultUserPhoto,
            userName: defaultUserName,
            itemId: item.id,
            onPressPostComment: onPressPostComment,
            onPressLike: onPressLike,
          })
        }>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.authorImg} source={{ uri: item.authorImg }} />
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.authorName}>{item.author}</Text>
              <Text style={styles.date}>{item.time}</Text>
            </View>
          </View>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Image style={styles.postImg} source={{ uri: item.photoUrl }} />
          <View style={styles.rowContainer}>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => onPressLike(item.id)}>
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
      </TouchableHighlight>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Community</Text>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => setvisibleModal('swipeable')}>
          <Image
            style={styles.inscription}
            source={require('../../assets/icons/inscription.png')}
          />
        </TouchableHighlight>
      </View>
      <Modal
        isVisible={visibleModal === 'swipeable'}
        onSwipeComplete={() => setvisibleModal(null)}
        swipeDirection={['down']}>
        <CreatePostScreen
          userPhoto={defaultUserPhoto}
          onPressPostPost={onPressPostPost}
          toggleModal={toggleModal}
        />
      </Modal>

      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => `${item.id}`}
        ListHeaderComponent={() => (
          <ScrollView
            horizontal={true}
            style={styles.carouselContainer}
            showsHorizontalScrollIndicator={false}>
            {profilePictures.map((item, index) => renderCard(item, index))}
          </ScrollView>
        )}
      />
    </View>
  )
}

export default CommunityScreen
