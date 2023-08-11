import { StyleSheet } from "react-native"

export const setup = (theme, appearance) => {
    const colorSet = theme.colors[appearance]
  
    return StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colorSet.primaryBackground,
        },
        trackerIcon: {
          flex: 1,
          borderRadius: 100,
          borderWidth: 1,
          backgroundColor: colorSet.primaryBackground,
          height: 130,
          paddingHorizontal: 15,
          marginVertical: 20,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center'
        },
        iconText: {
          fontSize: 30,
          alignSelf: 'center',
        },
        iconImage: {
          height:  70,
          width: 130,
          resizeMode:'contain',
          alignSelf: 'center',
        },
        header: {
          flex: 3,
        },
        headerTextView: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        headerText: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        content: {
          flex: 6,
          justifyContent: 'center',
          alignItems: 'center',
        },
        navigation: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20,
        },
        navigationNext: {
          alignItems: 'center',
          width: '40%',
          borderWidth: 2,
          backgroundColor: colorSet.primaryForeground,
          borderColor: colorSet.primaryBorder,
          borderRadius: 60,
          alignSelf: 'center',
          justifyContent: 'center',
        },
        navigationBack: {
            alignItems: 'center',
            width: '40%',
            borderWidth: 2,
            backgroundColor: 'white',
            borderColor: colorSet.primaryBorder,
            borderRadius: 60,
            alignSelf: 'center',
            justifyContent: 'center',
          },
        navigationText: {
          textAlign:'center',
          color: colorSet.primaryText,
          fontSize: 25,
          justifyContent: 'center',
          paddingLeft: 10,
          marginRight: 20,
          fontWeight: 'bold'
        },
    })
  }