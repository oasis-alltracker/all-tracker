import React, { useState } from 'react'
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import { profileIcons } from '../../data/dataArrays'
import dynamicStyles from './styles'
import { useDispatch } from 'react-redux'
import { useTheme } from 'dopenative'

function ProfilePictureScreen(props) {
  const [iconId, setIconId] = useState(1)
  const [customPhoto, setCustomPhoto] = useState(-1)

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const dispatch = useDispatch()

  const addUserPhoto = photo => dispatch({ type: 'ADD_USERPHOTO', photo })

  const onPressCard = item => {
    setIconId(item.id)
  }

  const onPressText = () => {}

  const renderCard = item => (
    <TouchableHighlight
      key={item.id}
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => onPressCard(item)}
      style={
        iconId === item.id ? styles.selectedCardContainer : styles.cardContainer
      }>
      <Image style={styles.cardImg} source={{ uri: item.url }} />
    </TouchableHighlight>
  )

  const onPressButton = () => {
    props.navigation.navigate('Help')
    addUserPhoto(profileIcons[iconId - 1].url)
  }

  return (
    <ScrollView style={styles.container}>
      <LogoHeader
        onPress={() => {
          props.navigation.goBack()
        }}
      />
      <ScrollView
        horizontal={true}
        style={styles.carouselContainer}
        showsHorizontalScrollIndicator={false}>
        {profileIcons.map(item => renderCard(item))}
      </ScrollView>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>Profile Picture</Text>
        <Text style={styles.secText}>
          You can select photo from one of this emoji or add your own photo as
          profile picture
        </Text>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => onPressText()}>
          <Text style={styles.customText}>Add Custom Photo</Text>
        </TouchableHighlight>
      </View>
      <ContinueButton onPress={() => onPressButton()} />
    </ScrollView>
  )
}

export default ProfilePictureScreen
