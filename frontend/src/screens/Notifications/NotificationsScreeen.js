import React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
} from 'react-native'
import dynamicStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'dopenative'

function NotificationsScreen() {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const dispatch = useDispatch()
  const notifications = useSelector(state => state.notification.notifications)
  const update = id => dispatch({ type: 'UPDATE_NOTIFICATIONS', id })
  const countUnreadNotifications = () => {
    var count = 0
    notifications.map(data => {
      if (!data.read) {
        count += 1
      }
    })
    return count
  }

  const renderUnreadMark = read => {
    if (!read) {
      return <View style={styles.unreadMark} />
    }
  }

  const renderNotification = ({ item }) => (
    <TouchableHighlight
      style={styles.notificationContainer}
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => update(item.id)}>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.authorImg} source={{ uri: item.authorImg }} />
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.authorName}>
              {item.authorName}
              <Text style={styles.notificationText}> {item.text}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.notificationTime}>{item.time}</Text>
        {renderUnreadMark(item.read)}
      </View>
    </TouchableHighlight>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.secText}>
          {countUnreadNotifications()} unread notifications
        </Text>
      </View>

      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => `${item.id}`}
        style={styles.notificationsContainer}
      />
    </View>
  )
}

export default NotificationsScreen
