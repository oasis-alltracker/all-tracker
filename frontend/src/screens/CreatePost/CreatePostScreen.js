import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  TextInput,
} from 'react-native'
import dynamicStyles from './styles'
import { useTheme } from 'dopenative'

export default function CreateCommentScreen({
  onPressPostPost,
  toggleModal,
  userPhoto,
}) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const colorSet = theme.colors[appearance]

  const [text, setText] = useState('')

  const onPressPhoto = () => {}
  const onPressPoll = () => {}
  const onPressPostComment = () => {
    onPressPostPost(text)
    toggleModal()
  }
  const onPressSmiley = () => {}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.middleContainer}>
        <View>
          <View style={styles.bar} />
          <Text style={styles.title}>Create Post</Text>
        </View>
        <View style={styles.rowContainer}>
          <Image style={styles.authorImg} source={{ uri: userPhoto }} />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Share your thoughts"
              placeholderTextColor={colorSet.secondaryText}
              onChangeText={setText}
              value={text}
              multiline={true}
            />
          </View>
        </View>
      </View>
      <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 20 }}>
        <View style={styles.confirmContainer}>
          <View style={styles.row}>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => onPressPhoto()}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/photo.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => onPressSmiley()}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/smiley.png')}
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={() => onPressPoll()}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/poll.png')}
              />
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={styles.btnContainer}
            underlayColor="rgba(73,182,77,1,0.9)"
            onPress={() => onPressPostComment()}>
            <Text style={styles.btnText}>Post</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  )
}
