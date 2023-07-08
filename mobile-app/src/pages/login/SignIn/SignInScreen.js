import {
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
  StyleSheet,
  Platform,
} from 'react-native'
import LogoHeader from '../../../components/LogoHeader/LogoHeader'
import ContinueButton from '../../../components/ContinueButton/ContinueButton'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import { StatusBar } from 'expo-status-bar';

import * as Google from 'expo-auth-session/providers/google';
import {useEffect, useState} from 'react';
import * as SecureStore from 'expo-secure-store';

import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';

export default function SignInScreen(props) {
  const [email, setEmail] = useState('')
  const { theme, appearance } = useTheme()
  const [token, setToken] = useState('')
  const styles = dynamicStyles(theme, appearance)


//--------------------- APPLE LOGIN
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState();

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);

      if (isAvailable) {
        const credentialJson = await SecureStore.getItemAsync('apple-credentials');
        setUserToken(JSON.parse(credentialJson));
      }
    }
    checkAvailable();
  }, []);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      });
      console.log(credential);
      setUserToken(credential);
      SecureStore.setItemAsync('apple-credentials', JSON.stringify(credential));
    } catch (e) {
      console.log(e);
    }
  }

//--------------------- NOTION AUTH
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'balance-tracker',
  path: 'redirect'
});

useEffect(() => {
  console.log("\n\n\n\nNOTION  HAS RESPONDED\n\n\n\n\n\=");
  console.log(notionResponse);
}, [notionResponse]);

const [notionRequest, notionResponse, promptAsyncNotion] = AuthSession.useAuthRequest({
  clientId:"48daaa94-6352-4aef-ac2b-8ba6cdfcfc0b",
  clientSecret:"secret_wPW0WE1YOEIAVaUv6PFxscbzZs1A0cY9xUOc22LZiXj",
  redirectUri:  "https://127.0.0.1:19000",
  responseType: "code",
  owner: "user"

},{
  authorizationEndpoint: "https://api.notion.com/v1/oauth/authorize"
})

//--------------------- GOOGLE LOGIN
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:"315014991553-b534c0cndl001dm0b9kr9m0876rv20df.apps.googleusercontent.com",
    iosClientId:"315014991553-rs5sa19o9599kk3mnv3p9is0m5d13kgj.apps.googleusercontent.com",
    expoClientId: "315014991553-n73e15nhisbkdecaetgbqo017pm9dqel.apps.googleusercontent.com"
  })

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication);
      console.log(response.authentication);
    }
  }, [response]);

  const googleSignin = () => {
    promptAsyncNotion({ useProxy: true, shownInRecents: true});
    //setLoading to true
  }

//--------------------- OTP LOGIN
  const onPressContinue = () => {
    props.navigation.navigate('Main', { screen: 'Home' })
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
          <Text style={styles.title}>What is your email address?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#9c9eb9"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          <ContinueButton onPress={() => onPressContinue()} />
          <View style={styles.signContainer}>
            <Text style={styles.txt}>Sign in with</Text>
            <View style={styles.rowContainer}>
            {
                appleAuthAvailable
                ? <TouchableHighlight
                    style={styles.iconContainer}
                    onPress={() => login()}
                    underlayColor="rgba(73,182,77,1,0.9)">
                    <Image
                      style={styles.accountIcon}
                      source={require('../../../assets/icons/apple-32.png')}
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
                  source={require('../../../assets/icons/google.png')}
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
