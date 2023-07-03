/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native'
import { useTheme } from 'dopenative'

import HomeScreen from '../screens/Home/HomeScreen'
import LandingScreen from '../screens/Landing/LandingScreen'
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer'
import EmailAdressScreen from '../screens/EmailAdress/EmailAdressScreen'
import FingerPrintScreen from '../screens/FingerPrint/FingerPrintScreen'
import PasswordScreen from '../screens/Password/PasswordScreen'
import HelpScreen from '../screens/Help/HelpScreen'
import GenderScreen from '../screens/Gender/GenderScreen'
import InterestsScreen from '../screens/Interests/InterestsScreen'
import ProfilePictureScreen from '../screens/ProfilePicture/ProfilePictureScreen'
import WaterScreen from '../screens/Water/WaterScreen'
import CommunityScreen from '../screens/Community/CommunityScreen'
import CommentScreen from '../screens/Comment/CommentScreen'
import CreatePostScreen from '../screens/CreatePost/CreatePostScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import CreateCommentScreen from '../screens/CreateComment/CreateCommentScreen'
import NotificationsScreen from '../screens/Notifications/NotificationsScreeen'
import GoalAchievedScreen from '../screens/GoalAchieved/GoalAchievedScreen'
import NutritionScreen from '../screens/Nutrition/NutritionScreen'
import StepsScreen from '../screens/Steps/StepsScreen'
import PremiumScreen from '../screens/Premium/PremiumScreen'
import SuccessScreen from '../screens/Success/SuccessScreen'
import SignInScreen from '../screens/SignIn/SignInScreen'
import MenuImage from '../components/MenuImage/MenuImage'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const styles = StyleSheet.create({
  addIcon: {
    width: 35,
    height: 35,
    margin: 20,
    alignSelf: 'center',
  },
  goalAchievedIcon: {
    width: 30,
    height: 30,
    margin: 20,
    alignSelf: 'center',
  },
})
const MainNavigator = () => {
  const { theme, appearance } = useTheme()
  const colorSet = theme.colors[appearance]
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
        },
        headerRight: () => <View />,
      }}>
      <Stack.Screen
        options={({ navigation, route }) => {
          return {
            headerStyle: {
              backgroundColor: colorSet.primaryBackground,
              elevation: 0,
              height: 80,
              shadowColor: 'transparent',
              borderBottomWidth: 0,
            },
            title: '',
            headerLeft: () => (
              <MenuImage
                onPress={() => {
                  navigation.openDrawer()
                }}
              />
            ),
          }
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colorSet.primaryBackground,
            elevation: 0,
            height: 70,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          title: '',
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
        })}
        name="Community"
        component={CommunityScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colorSet.primaryBackground,
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: colorSet.primaryText,
          },
        }}
        name="Water"
        component={WaterScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colorSet.primaryBackground,
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerTitleStyle: {
            color: colorSet.primaryText,
          },
        }}
        name="Comment"
        component={CommentScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          headerStyle: {
            height: 60,
          },
        }}
        name="CreatePost"
        component={CreatePostScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colorSet.primaryBackground,
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
          headerTitleStyle: {
            color: colorSet.primaryText,
          },
        })}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          headerStyle: {
            height: 60,
          },
        }}
        name="CreateComment"
        component={CreateCommentScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: colorSet.primaryBackground,
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
          },
          headerLeft: () => (
            <MenuImage
              onPress={() => {
                navigation.openDrawer()
              }}
            />
          ),
          headerTitleStyle: {
            color: colorSet.primaryText,
          },
        })}
        name="Notifications"
        component={NotificationsScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          headerStyle: {
            height: 40,
          },
        }}
        name="GoalAchieved"
        component={GoalAchievedScreen}
      />
      <Stack.Screen
        options={({ route }) => {
          return {
            headerStyle: {
              backgroundColor: colorSet.primaryBackground,
              elevation: 0,
              shadowColor: 'transparent',
              borderBottomWidth: 0,
            },
            headerRight: () => (
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => route.params.onPressModal()}>
                <Image
                  style={styles.addIcon}
                  source={require('../assets/icons/addIcon.png')}
                />
              </TouchableHighlight>
            ),
            headerTitleStyle: {
              color: colorSet.primaryText,
            },
          }
        }}
        name="Nutrition"
        component={NutritionScreen}
      />
      <Stack.Screen
        options={({ route }) => {
          return {
            headerStyle: {
              backgroundColor: colorSet.primaryBackground,
              elevation: 0,
              shadowColor: 'transparent',
              borderBottomWidth: 0,
            },
            headerRight: () => (
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => route.params.toggleModal()}>
                <Image
                  style={styles.goalAchievedIcon}
                  source={require('../assets/icons/goalAchieved.png')}
                />
              </TouchableHighlight>
            ),
            headerTitleStyle: {
              color: colorSet.primaryText,
            },
          }
        }}
        name="Steps"
        component={StepsScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          headerStyle: {
            height: 60,
            backgroundColor: colorSet.primaryBackground,
          },
          title: '',
        }}
        name="Premium"
        component={PremiumScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: 'true',
          headerStyle: {
            height: 60,
          },
          title: '',
          headerLeft: () => <View />,
        }}
        name="Success"
        component={SuccessScreen}
      />
    </Stack.Navigator>
  )
}

const LandingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      headerMode="none"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Email" component={EmailAdressScreen} />
      <Stack.Screen name="FingerPrint" component={FingerPrintScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Gender" component={GenderScreen} />
      <Stack.Screen name="Interests" component={InterestsScreen} />
      <Stack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  )
}

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Landing"
      drawerWidth={250}
      drawerContent={({ navigation }) => {
        return <DrawerContainer navigation={navigation} />
      }}>
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainNavigator}
      />
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Landing"
        component={LandingNavigator}
      />
    </Drawer.Navigator>
  )
}

const AppContainer = () => {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  )
}

export default AppContainer
