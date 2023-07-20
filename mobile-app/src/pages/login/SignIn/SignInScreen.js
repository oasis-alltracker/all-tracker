import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native'
import LogoHeader from '../../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../../components/ContinueButton/ContinueButton'
import ScribbledText from '../../../components/ScribbledText'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

import * as Google from 'expo-auth-session/providers/google';
import {useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';

import LoginAPI from '../../../api/auth/loginAPI';
import {saveToken, getAccessToken} from '../../../user/keychain'


export default function SignInScreen(props) {
  const [email, setEmail] = useState('')
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)


//--------------------- APPLE LOGIN
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);

    }
    checkAvailable();
  }, []);

  const appleSignin = async () => {
    try {
      console.log("attempting apple sign in")
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });
      const tokens = await LoginAPI.loginApple(credential.identityToken);
      await saveToken("accessToken", tokens.accessToken);
      await saveToken("refreshToken", tokens.refreshToken);
      accessToken = await getAccessToken();
      //get user
        //if setup complete
            //go to dashboard
        //else go to setup
    } catch (e) {
      console.log(e);
    }
  }

//--------------------- GOOGLE LOGIN
  const [googleToken, setGoogleToken] = useState('')
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:"315014991553-b534c0cndl001dm0b9kr9m0876rv20df.apps.googleusercontent.com",
    iosClientId:"315014991553-rs5sa19o9599kk3mnv3p9is0m5d13kgj.apps.googleusercontent.com",
    expoClientId: "315014991553-n73e15nhisbkdecaetgbqo017pm9dqel.apps.googleusercontent.com"
  })

  useEffect(() => {


    if (response?.type === "success") {

      const saveTokens = async (tokens) => {
        await saveToken("accessToken", tokens.accessToken);
        await saveToken("refreshToken", tokens.refreshToken);
        //get user
        //if setup complete
            //go to dashboard
        //else go to setup
      }
      
      const tokens = LoginAPI.loginGoogle(response.authentication);
      saveTokens(tokens);
    }
  }, [response]);

  const googleSignin = () => {
    promptAsync({ useProxy: false, shownInRecents: true});
    //setLoading to true
  }

//--------------------- OTP LOGIN
  const onPressContinue = () => {
    props.navigation.navigate('OTP', { screen: 'OTP' })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle ={styles.container}>
        <View style={styles.signupHeader}>
          <LogoHeader
            onPress={() => {
              props.navigation.goBack()
            }}
          />
        </View>
        <View style={styles.signupContent}>
          <ScribbledText style={styles.title}>What is your email address?</ScribbledText>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#9c9eb9"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          <ContinueButton onPress={() => onPressContinue()} />
          <View style={styles.signContainer}>
            <ScribbledText style={styles.txt}>--or--</ScribbledText>
            <View style={[styles.rowContainer, appleAuthAvailable && {flexDirection: 'row',gap: 30}]}>
            {
                appleAuthAvailable
                ? <TouchableHighlight
                    style={styles.iconContainer}
                    onPress={() => appleSignin()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.accountIcon}
                      source={require('../../../assets/balance-icons/apple-black.png')}
                    />
                  </TouchableHighlight>
                : null
                }
              <TouchableHighlight
                style={styles.iconContainer}
                onPress={async () => googleSignin()}
                underlayColor="rgba(73,182,77,1,0.9)">
                <Image
                  style={styles.accountIcon}
                  source={require('../../../assets/balance-icons/google.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const appleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 64
  }
});




// //--------------------- NOTION AUTH
// const redirectUri = AuthSession.makeRedirectUri({
//   scheme: 'balance-tracker',
//   path: 'redirect'
// });

// useEffect(() => {
//   console.log("\n\n\n\nNOTION  HAS RESPONDED\n\n\n\n\n\=");
//   console.log(notionResponse);
// }, [notionResponse]);

// const [notionRequest, notionResponse, promptAsyncNotion] = AuthSession.useAuthRequest({
//   clientId:"48daaa94-6352-4aef-ac2b-8ba6cdfcfc0b",
//   clientSecret:"secret_wPW0WE1YOEIAVaUv6PFxscbzZs1A0cY9xUOc22LZiXj",
//   redirectUri:  "https://127.0.0.1:19000",
//   responseType: "code",
//   owner: "user"

// },{
//   authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize"
// })
