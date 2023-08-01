import React, { useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../../../components/ScribbledText'
import LogoHeader from '../../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../../components/ContinueButton/ContinueButton'
import OTPInput from '../../../components/OTPInput/OTPInput'
import {saveToken, getAccessToken} from '../../../user/keychain'
import LoginAPI from '../../../api/auth/loginAPI'
import UserAPI from '../../../api/user/userAPI'
import Toast from 'react-native-root-toast'

export default function OTPScreen(props) {
  const {route, navigation} = props
  const {email} = route.params

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [otpValue, setOTPValue] = useState('')
  const [showError, setShowError] = useState(false)
  const [showBottomText, setShowBottomText] = useState(false)

  const onPressLogin = async () => {
    const {status, data} = await LoginAPI.loginOTP(email, otpValue)
    if(otpValue.length>=4){
      if(status == 200){
          await saveToken("accessToken", data.accessToken);
          await saveToken("refreshToken", data.refreshToken);
          const accessToken = await getAccessToken()
          const {status: userStatus, data: userData} = await UserAPI.getUser(accessToken)
          console.log("Status: ", userStatus, " data:", userData)
          
          const setupStatus = userData['isSetupComplete']
          
          if(setupStatus) {
              console.log("Go to navigation page")
          }
          else{
            await navigation.navigate('SelectTrackers')
          }

        }
        else {
            setShowBottomText(true)
            // Add a Toast on screen.
            Toast.show('Invalid OTP', {...styles.errorToast, duration: Toast.durations.LONG}
            );
            console.log("Something failed! Request data is", data)
            //please wait 30 seconds before clicking resend email
        }
    }
    else{
      Toast.show('Invalid OTP', {...styles.errorToast, duration: Toast.durations.LONG});
    }

  }

  const resendOTP = async () => {
    setShowError(false)
    await LoginAPI.requestOTP(email)
  }

  const ErrorMessage = () => {
    return(
      <View style={styles.errorContainer}>
          <ScribbledText style={styles.errorText}>Didn't get an email? </ScribbledText>
          <TouchableHighlight
              underlayColor="rgba(73,182,77,1,0.9)"
              onPress={resendOTP}>
              <ScribbledText style={styles.resendOTPText}>Resend OTP</ScribbledText>
          </TouchableHighlight>
      </View>
    )}

  const LoadingMessage = () => {
    setTimeout(() =>{
      setShowError(true)
    },5000);  
    return(
      <View style={styles.errorContainer}>
          <ScribbledText style={styles.waitingText}>OTP sent! Please wait 30 seconds to send a new code. </ScribbledText>
      </View>
    )
  }

  return (

    <ScrollView contentContainerStyle ={styles.container}>
      <View style={styles.signupHeader}>
        <LogoHeader
            onPress={() => {
                props.navigation.goBack()
            }}
        />
      </View>
      <View style={styles.signupContent}> 
        <ScribbledText style={styles.title}>Check your inbox for OTP Code</ScribbledText>
        <View style={styles.inputContainer}>
            <OTPInput setValue={setOTPValue}/>
        </View>
        <ContinueButton onPress={onPressLogin} />
        {showBottomText && (showError ? <ErrorMessage/> : <LoadingMessage/>)}
      </View>
      
    </ScrollView>
  )
}
