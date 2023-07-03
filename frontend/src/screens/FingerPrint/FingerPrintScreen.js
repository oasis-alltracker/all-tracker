import React from 'react'
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import LogoHeader from '../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../components/ContinueButton/ContinueButton'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

export default function FingerPrintScreen({ navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <ScrollView style={styles.container}>
      <LogoHeader
        onPress={() => {
          navigation.goBack()
        }}
      />
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/icons/fingerprint.png')}
        />
        <Text style={styles.boldText}>Enable Fingerpint</Text>
        <Text style={styles.normalText}>
          If you enable touch ID, you don't need to enter your password when you
          login.
        </Text>
      </View>
      <ContinueButton
        onPress={() => {
          navigation.navigate('ProfilePicture')
        }}
      />
      <TouchableHighlight
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => navigation.navigate('ProfilePicture')}>
        <Text style={styles.notNowText}>Not Now</Text>
      </TouchableHighlight>
    </ScrollView>
  )
}
