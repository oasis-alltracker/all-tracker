import React, { useState} from 'react'
import { TouchableHighlight, Image, View } from 'react-native'
import { trackerLogos } from '../../data/dataArrays'
import ScribbledText from '../ScribbledText'

export default function TrackerIcon({ onPress , title, buttonStyle, imageStyle, textStyle}) {

  const selectedTracker = trackerLogos.find(tracker => tracker.title == title)

  const [isTrackerSelected, selectTracker] = useState(false)

  const onSelect = () => {
    if (onPress){
      selectTracker(!isTrackerSelected);
      onPress(isTrackerSelected);
    }
  }

  const imageSource = selectedTracker.photoUrl

  return (
    onPress ?
    <TouchableHighlight
        onPress={onSelect}
        underlayColor="rgba(73,182,77,1,0.9)"
        style={[buttonStyle, isTrackerSelected && {opacity: 0.5}, {backgroundColor: selectedTracker.backgroundColor}]}>
        <View style={{ justifyContent: 'space-around'}}>
            <Image
                style={imageStyle}
                source={imageSource}
            />
            <ScribbledText style={textStyle}>{selectedTracker.title}</ScribbledText>
        </View>
    </TouchableHighlight> :
    <View style={[buttonStyle, {backgroundColor: selectedTracker.backgroundColor}]}>
      <View style={{ justifyContent: 'space-around'}}>
            <Image
                style={imageStyle}
                source={imageSource}
            />
            <ScribbledText style={textStyle}>{selectedTracker.title}</ScribbledText>
        </View>
    </View>
  )
}
