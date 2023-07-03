import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList,
} from 'react-native'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import { interests } from '../../data/dataArrays'
import { useDispatch } from 'react-redux'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

function InterestsScreen({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [selected, setSelected] = useState([])
  const dispatch = useDispatch()

  const addUserInterests = interests =>
    dispatch({ type: 'ADD_USERINTERESTS', interests })

  const onPressCard = item => {
    var arr = [...selected]
    if (arr.includes(item)) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          arr.splice(i, 1)
          break
        }
      }
    } else {
      arr.push(item)
    }
    setSelected(arr)
  }

  const onPressButton = () => {
    navigation.navigate('Gender')
    addUserInterests(selected)
  }

  const renderCard = ({ item }) => (
    <View>
      <TouchableHighlight
        underlayColor="rgba(73,182,77,1,0.9)"
        style={
          selected.includes(item.id)
            ? styles.selectedCardContainer
            : styles.cardContainer
        }
        onPress={() => onPressCard(item.id)}>
        <Image style={styles.cardImg} source={{ uri: item.icon }} />
      </TouchableHighlight>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <LogoHeader
        onPress={() => {
          navigation.goBack()
        }}
      />
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={interests}
        renderItem={renderCard}
        keyExtractor={item => `${item.id}`}
        style={{ alignSelf: 'center' }}
        ListHeaderComponent={() => (
          <Text style={styles.mainText}>Time to customize your interests</Text>
        )}
        ListFooterComponent={() => (
          <ContinueButton
            onPress={() => {
              onPressButton()
            }}
          />
        )}
      />
    </View>
  )
}
export default InterestsScreen
