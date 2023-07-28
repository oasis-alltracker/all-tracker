import React, {useEffect, useState} from 'react'
import { TouchableHighlight, Text, View, ActivityIndicator } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import ScribbledText from '../ScribbledText'

export default function ContinueButton({ onPress, title }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = async () => {
    setIsLoading(true)
    await triggerProp();
  }

  triggerProp = async () => {
    await timeout(0) // Having a timeout of 0 forces the component to rerender
    await onPress()
    setIsLoading(false)
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  return (
    <View>
      <TouchableHighlight
        onPress={setLoading}
        disabled={isLoading}
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[styles.btnContainer, isLoading && {opacity: 0.5} ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <ActivityIndicator animating={isLoading}/>
          <ScribbledText style={styles.btnText}>{title || 'Continue'}</ScribbledText>
          </View>
        
      </TouchableHighlight>
    </View>
  )
}
