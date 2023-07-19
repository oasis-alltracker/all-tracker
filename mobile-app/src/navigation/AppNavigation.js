/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native'
import { useTheme } from 'dopenative'
import HomeScreen from '../pages/dashboard/Home/HomeScreen'
import LandingScreen from '../pages/login/Landing/LandingScreen'
import DrawerContainer from '../pages/dashboard/DrawerContainer/DrawerContainer'
import SignInScreen from '../pages/login/SignIn/SignInScreen'
import MenuImage from '../components/MenuButton/MenuButton'
import OTPScreen from '../pages/login/OTP/OTPScreen'


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
    </Stack.Navigator>
  )
}

const LandingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      headerShown="false"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
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
