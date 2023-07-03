import React, { useRef, useState } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native'
import dynamicStyles from './styles'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { premiumArray } from '../../data/dataArrays'
import { useTheme } from 'dopenative'
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height

export default function PremiumScreen() {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [activeSlide, setActiveSlide] = useState(0)
  const [type, setType] = useState('')
  const slider1Ref = useRef()

  const renderImage = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,1,0.9)">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.photoUrl }} />
      </View>
    </TouchableHighlight>
  )

  const onPressPurchase = () => {}

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={premiumArray}
            renderItem={renderImage}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={setActiveSlide}
          />
          <Pagination
            dotsLength={premiumArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref}
            tappableDots={!!slider1Ref}
          />
        </View>
      </ScrollView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{premiumArray[activeSlide].title}</Text>
        <Text style={styles.description}>
          {premiumArray[activeSlide].description}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => (type != 'month' ? setType('month') : setType(''))}>
          <View style={styles.btnContainer}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.circle}
                source={
                  type == 'month'
                    ? require('../../assets/icons/fullCircle.png')
                    : require('../../assets/icons/emptyWhiteCircle.png')
                }
              />
              <Text style={styles.price}>
                $4.99<Text style={styles.month}>/month</Text>
              </Text>
            </View>
            <TouchableHighlight style={styles.secBtnContainer}>
              <Text style={styles.secBtnTxt}>Free Trial</Text>
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => (type != 'year' ? setType('year') : setType(''))}>
          <View style={styles.btnContainer}>
            <View style={styles.rowContainer}>
              <Image
                style={styles.circle}
                source={
                  type == 'year'
                    ? require('../../assets/icons/fullCircle.png')
                    : require('../../assets/icons/emptyWhiteCircle.png')
                }
              />
              <Text style={styles.price}>
                $89.99<Text style={styles.month}>/year</Text>
              </Text>
            </View>
            <TouchableHighlight style={styles.secBtnContainer}>
              <Text style={styles.secBtnTxt}>Free Trial</Text>
            </TouchableHighlight>
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.mainInfoTxt}>
          Recurring billing, cancel anytime
        </Text>
        <Text style={styles.secInfoTxt}>
          Contrary to what many people think, eating healthy is not easier said
          than done. Just a few good habits can make a great difference.
        </Text>
      </View>
      <TouchableHighlight
        style={styles.purchaseBtnContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        onPress={() => onPressPurchase()}>
        <Text style={styles.purchaseBtnTxt}>Purchase</Text>
      </TouchableHighlight>
    </ScrollView>
  )
}
