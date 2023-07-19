import React, {useState} from 'react';
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
  } from 'react-native-confirmation-code-field';
import ScribbledText from '../ScribbledText';

const CELL_COUNT = 4;

export default function OTPInput({setValue}) {
    const { theme, appearance } = useTheme()
    const styles = dynamicStyles(theme, appearance)


    const [otpValue, setOTPValue] = useState('')
    const ref = useBlurOnFulfill({otpValue, cellCount: CELL_COUNT});
    

    const changeOTPValue = (newOTPValue) => {
      setOTPValue(newOTPValue)
      setValue(newOTPValue)
    }

    const basicRenderCell = ({index, symbol, isFocused}) => 
    (
      <ScribbledText
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        >
        {symbol || (isFocused ? <Cursor /> : null)}
      </ScribbledText>
    )

    return (
        <CodeField
        ref={ref}
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