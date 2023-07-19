import {Animated, Image, SafeAreaView, Text, View} from 'react-native';
import React, {useState} from 'react';
import { useTheme } from 'dopenative'
import { StyleSheet } from 'react-native'
import dynamicStyles, {CELL_SIZE, CELL_BORDER_RADIUS, DEFAULT_CELL_BG_COLOR, NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR} from './styles'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';

const {Value, Text: AnimatedText} = Animated;
const CELL_COUNT = 4;

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

export default function OTPInput({setValue}) {
    const { theme, appearance } = useTheme()
    const styles = dynamicStyles(theme, appearance)
    const colorSet = theme.colors[appearance]
    
    let baseStyle = styles.medium;


    const [otpValue, setOTPValue] = useState('')
    const ref = useBlurOnFulfill({otpValue, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      otpValue,
      changeOTPValue,
    });

    const changeOTPValue = (newOTPValue) => {
      setOTPValue(newOTPValue)
      setValue(newOTPValue)
    }

    const renderCell = ({index, symbol, isFocused}) => {
      const hasValue = Boolean(symbol);
      const animatedCellStyle = {
        backgroundColor: hasValue
          ? animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
            })
          : animationsColor[index].interpolate({
              inputRange: [0, 1],
              outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
            }),
        borderRadius: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
        }),
        transform: [
          {
            scale: animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 1],
            }),
          },
        ],
      };
            

      setTimeout(() => {
        animateCell({hasValue, index, isFocused});
      }, 0);

      return (
        <AnimatedText
          key={index}
          style={[styles.cell, animatedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      );
    };

    const basicRenderCell = ({index, symbol, isFocused}) => 
    (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </Text>
    )

    return (
        <CodeField
        ref={ref}
        {...props}
        value={otpValue}
        onChangeText={changeOTPValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={basicRenderCell}
      />
    );
  }