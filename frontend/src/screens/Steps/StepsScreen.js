import React, { useState, useEffect } from 'react'
import { Text, View, TouchableHighlight, Image, ScrollView } from 'react-native'
import dynamicStyles from './styles'
//mport { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const SCREEN_WIDTH = width < height ? width : height
import ProgressCircle from 'react-native-progress-circle'
import Modal from 'react-native-modal'
import GoalAchievedScreen from '../GoalAchieved/GoalAchievedScreen'
import LineChart from 'react-native-responsive-linechart'
import { lineChartConfig, lineChartData } from '../../data/dataArrays'
import { useTheme } from 'dopenative'

export default function StepsScreen(props) {
  const { route } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const colorSet = theme.colors[appearance]

  var stepsDone = route.params.stepsDone
  var stepsGoal = route.params.stepsGoal

  useEffect(() => {
    props.navigation.setParams({
      toggleModal: toggleModal,
    })
  }, [])

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          You walked <Text style={styles.stepsText}>{stepsDone}</Text> steps
          today
        </Text>
        <View style={styles.circleContainer}>
          <ProgressCircle
            percent={(stepsDone / stepsGoal) * 100}
            radius={80}
            borderWidth={8}
            color={colorSet.primaryForeground}
            shadowColor={colorSet.secondaryBackground}
            bgColor={colorSet.primaryBackground}>
            <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
              <Image
                style={styles.circleImg}
                source={require('../../assets/icons/walk.png')}
              />
              <Text style={styles.circleText}>
                {(stepsDone / stepsGoal) * 100} %{' '}
              </Text>
              <Text style={styles.circleGoalText}>of daily goal</Text>
            </View>
          </ProgressCircle>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.mainText}>1300</Text>
          <Text style={styles.secText}>Cal Burned</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.columnContainer}>
          <Text style={styles.mainText}>10000</Text>
          <Text style={styles.secText}>Daily goal</Text>
        </View>
      </View>
      <View style={styles.statisticContainer}>
        <Text style={styles.statisticTxt}>Statistic</Text>
        <LineChart
          style={{
            width: SCREEN_WIDTH - 20,
            height: 220,
            alignSelf: 'center',
            justifyContent: 'center',
            marginRight: 20,
          }}
          config={lineChartConfig}
          data={lineChartData}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.performanceContainer}>
          <View style={styles.performanceRowContainer}>
            <Image
              style={styles.performanceIcon}
              source={require('../../assets/icons/goodFace.png')}
            />
            <View style={styles.perfromanceText}>
              <Text style={styles.mainText}>Best Performance</Text>
              <Text style={styles.secText}>Monday</Text>
            </View>
          </View>
          <Text style={styles.mainText}>10</Text>
        </View>
        <View style={styles.performanceContainerBorderless}>
          <View style={styles.performanceRowContainer}>
            <Image
              style={styles.performanceIcon}
              source={require('../../assets/icons/badFace.png')}
            />
            <View style={styles.perfromanceTextContainer}>
              <Text style={styles.mainText}>Worst Performance</Text>
              <Text style={styles.secText}>Sunday</Text>
            </View>
          </View>
          <Text style={styles.mainText}>6</Text>
        </View>
      </View>
      <Modal isVisible={modal}>
        <GoalAchievedScreen toggleModal={toggleModal} />
      </Modal>
    </ScrollView>
  )
}
